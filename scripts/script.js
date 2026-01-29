// Get the display
const display = document.getElementById("display");

// Get buttons
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const backspaceButton = document.getElementById("backspace");

// Get history list element
const historyList = document.getElementById("historyList");

// History calculations
let history = [];

// Function to update history display
function updateHistoryDisplay() {
  if (history.length === 0) {
    historyList.innerHTML = '<li class="no-history">No calculations yet</li>';
  } else {
    historyList.innerHTML = "";
    // Display in reverse order (most recent first)
    for (let i = history.length - 1; i >= 0; i--) {
      const li = document.createElement("li");
      li.textContent = history[i];
      historyList.appendChild(li);
    }
  }
}

// Add click event listeners to digit buttons
digitButtons.forEach((button) => {
  button.addEventListener("click", function () {
    display.value += this.textContent.trim();
  });
});

// Add click event listeners to operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const operation = this.getAttribute("data-operator");

    if (operation === "equals") {
      evaluateExpression();
    } else if (operation === "clear") {
      clearDisplay();
    } else {
      display.value += operation;
    }
  });
});

// Backspace functionality
backspaceButton.addEventListener("click", function () {
  display.value = display.value.slice(0, -1);
});

// Function to evaluate expression
function evaluateExpression() {
  try {
    const expression = display.value;
    if (expression === "") return;

    // Evaluate the expression
    const result = eval(expression);

    // Add to history
    history.push(`${expression} = ${result}`);
    console.log("Calculation:", `${expression} = ${result}`);
    console.log("History length:", history.length);

    // Update history display
    updateHistoryDisplay();

    // Display result
    display.value = result;
  } catch (error) {
    display.value = "Error";
    setTimeout(() => {
      display.value = "";
    }, 1500);
  }
}

// Function to clear display
function clearDisplay() {
  display.value = "";
}

// Keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Numbers and decimal point
  if (/[0-9.]/.test(key)) {
    display.value += key;
  }
  // Operators
  else if (key === "+" || key === "-" || key === "%") {
    display.value += key;
  } else if (key === "*") {
    display.value += "*";
  } else if (key === "/") {
    display.value += "/";
  } else if (key === "^") {
    display.value += "**";
  }
  // Enter or equals to evaluate
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    evaluateExpression();
  }
  // Escape or 'c' to clear
  else if (key === "Escape" || key.toLowerCase() === "c") {
    clearDisplay();
  }
  // Backspace
  else if (key === "Backspace") {
    event.preventDefault();
    display.value = display.value.slice(0, -1);
  }
});

// Function to display history (call this in console to see history)
function showHistory() {
  console.log("=== Calculator History ===");
  if (history.length === 0) {
    console.log("No calculations yet");
  } else {
    history.forEach((calc, index) => {
      console.log(`${index + 1}. ${calc}`);
    });
  }
}

// Make showHistory available globally
window.showHistory = showHistory;
