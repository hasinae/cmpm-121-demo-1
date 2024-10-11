// import "./style.css";

// const app: HTMLDivElement = document.querySelector("#app")!;

// const gameName = "Cherry Clicker!";
// document.title = gameName;

// const header = document.createElement("h1");
// header.innerHTML = gameName;
// app.append(header);

// let growthRate: number = 0;

// // Step 1: A button you can click
// const button = document.createElement("button");
// button.innerHTML = "Click 🍒! ";
// app.append(button);

// // Step 2: Clicking increases a counter
// let counter: number = 0;

// const counterDisplay = document.createElement("div");
// counterDisplay.innerHTML = `${counter} cherry points 🍒`;
// app.append(counterDisplay);

// button.addEventListener("click", () => {
//   counter++;
//   counterDisplay.innerHTML = `${counter} cherry points 🍒`;
// });

// // // Step 3: Automatic Clicking
// // setInterval(() => {
// //   counter++;
// //   counterDisplay.innerHTML = `${counter} cherry points 🍒`;
// // }, 1000);

// // Step 5: Purchasing an upgrade

// const upgradeButton = document.createElement("button");
// upgradeButton.innerHTML = "Purchase Upgrade (10 points)";
// upgradeButton.disabled = true; 
// app.append(upgradeButton);

// upgradeButton.addEventListener("click", () => {
//   if (counter >= 10) {
//       counter -= 10; 
//       growthRate += 1; 
      
//       counterDisplay.innerHTML = `${counter.toFixed(2)} cherry points 🍒`;

//       checkUpgradeAvailability(); 
//   }
// });

// function checkUpgradeAvailability() {
//   upgradeButton.disabled = counter < 10;
// }

// // Step 4: Continuous Growth
// let start: number | undefined;

// function step(timestamp: number) {
//   if (start === undefined) {
//     start = timestamp;
//   }

//   const elapsed = timestamp - start;

//   counter += elapsed / 1000;
//   counterDisplay.innerHTML = `${counter.toFixed(2)} cherry points 🍒`;

//   start = timestamp;

//   requestAnimationFrame(step);
// }

// requestAnimationFrame(step);


import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cherry Clicker!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let growthRate: number = 0; // Initialize growth rate to zero

// Step 1: A button you can click
const button = document.createElement("button");
button.innerHTML = "Click 🍒! ";
app.append(button);

// Step 2: Clicking increases a counter
let counter: number = 0;

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;
app.append(counterDisplay);

// Main click event to increase the counter
button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;
  checkUpgradeAvailability(); // Check if upgrade button should be enabled
});

// Step 5: Purchasing an upgrade
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Purchase Upgrade (10 points)";
upgradeButton.disabled = true; 
app.append(upgradeButton);

// Event listener for the purchase button
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
      counter -= 10; // Deduct 10 units from the counter
      growthRate += 1; // Increment the growth rate by 1
      
      // Update the counter display without decimal points
      counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;
      checkUpgradeAvailability(); // Re-check upgrade availability
  }
});

// Function to check if the upgrade button should be enabled
function checkUpgradeAvailability() {
  upgradeButton.disabled = counter < 10;
}

// Step 4: Continuous Growth based on Growth Rate
let start: number | undefined;

function step(timestamp: number) {
  if (start === undefined) {
    start = timestamp;
  }

  const elapsed = timestamp - start;

  // Increment counter based on growth rate and elapsed time
  counter += (elapsed / 1000) * growthRate;
  counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;

  start = timestamp;

  requestAnimationFrame(step);
}

// Start the animation loop
requestAnimationFrame(step);
