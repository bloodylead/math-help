let num1;
let num2;
let operator = "+"; // default to addition
let numBox = [1]



function setOperation(op) {
  operator = op;
  newQuestion();
}

function checkBox(boxNum) {
  return numBox.includes(boxNum);
}

function newQuestion() {
  // Generate numbers based on the operator
  if (operator === "/") {
    num2 = Math.floor(Math.random() * 12) + 1;
    const temp = Math.floor(Math.random() * 12) + 1;
    num1 = num2 * temp;
  } else if (operator === "*") {
    num1 = Math.floor(Math.random() * 12) + 1;
    num2 = Math.floor(Math.random() * 12) + 1;
  } else if (operator === "-") {
    num1 = Math.floor(Math.random() * 100) + 1;
    num2 = Math.floor(Math.random() * 100) + 1;
    if (num2 > num1) [num1, num2] = [num2, num1];
  } else {
    num1 = Math.floor(Math.random() * 100) + 1;
    num2 = Math.floor(Math.random() * 100) + 1;
  }

  if (checkBox(num1) || checkBox(num2)) {
    return newQuestion();
  }

  // Update the question
  document.getElementById("question").textContent = `${num1} ${operator} ${num2}`;
   const msg = new SpeechSynthesisUtterance();
  msg.text = `${num1} ${operator} ${num2}`; // This is what will be read aloud
  msg.lang = 'en-US'; // English voice
  window.speechSynthesis.speak(msg);

  // Clear the input for new answer
  document.getElementById("answer").value = "";
  document.getElementById("answer").focus();

  // Keep feedback visible until next answer
}

function checkAnswer() {
  const userAnswer = Number(document.getElementById("answer").value);
  let correctAnswer;

  switch (operator) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "/":
      correctAnswer = num1 / num2;
      break;
  }

  const resultDiv = document.getElementById("result");
  const alert = document.getElementById("answer")

  if (userAnswer === correctAnswer) {
    resultDiv.textContent = `✅ Correct! Answer: ${correctAnswer}`;
    resultDiv.style.color = "green";
    alert.style.boxShadow = "13px 13px 50px green, -13px -13px 50px green";
  } else {
    resultDiv.textContent = `❌ Wrong! Answer: ${correctAnswer}`;
    resultDiv.style.color = "red";
    alert.style.boxShadow = "13px 13px 50px red, -13px -13px 50px red";

  }

  // Do NOT call newQuestion() here 
  newQuestion()
}



document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // prevent default form submission
    checkAnswer();          // call the function as if the button was clicked
  }
});

// Start first question
newQuestion();
