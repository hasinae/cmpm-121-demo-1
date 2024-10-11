import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cherry Clicker!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1: A button you can click
const button = document.createElement("button");
button.innerHTML = "Click 🍒! ";
app.append(button);

// Step 2: Clicking increases a counter
let counter: number = 0;

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} cherry points 🍒`;
app.append(counterDisplay);

button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${counter} cherry points 🍒`;
});

// // Step 3: Automatic Clicking
// setInterval(() => {
//   counter++;
//   counterDisplay.innerHTML = `${counter} cherry points 🍒`;
// }, 1000);

// Step 4: Continuous Growth
let start: number | undefined;

function step(timestamp: number) {
  if (start === undefined) {
      start = timestamp;
  }
  
  const elapsed = timestamp - start;

  counter += elapsed / 1000;
  counterDisplay.innerHTML = `${counter.toFixed(2)} cherry points 🍒`;

  start = timestamp;
  
  requestAnimationFrame(step);
}

requestAnimationFrame(step);
