// import "./style.css";

// const app: HTMLDivElement = document.querySelector("#app")!;

// const gameName = "Cherry Clicker!";
// document.title = gameName;

// const header = document.createElement("h1");
// header.innerHTML = gameName;
// app.append(header);

// // Initialize growth rate to zero
// let growthRate: number = 0; 

// // Upgrade tracking
// let upgradeACount = 0;
// let upgradeBCount = 0;
// let upgradeCCount = 0;

// // Status Displays
// const statusDisplay = document.createElement("div");
// statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} cherry points/sec<br>A: ${upgradeACount}, B: ${upgradeBCount}, C: ${upgradeCCount}`;
// app.append(statusDisplay);

// // Step 1: A button you can click
// const button = document.createElement("button");
// button.innerHTML = "Click 🍒! ";
// app.append(button);

// // Step 2: Clicking increases a counter
// let counter: number = 0;

// const counterDisplay = document.createElement("div");
// counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;
// app.append(counterDisplay);

// button.addEventListener("click", () => {
//   counter++;
//   counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;
//   checkUpgradeAvailability(); 
// });

// // Step 5: Purchasing an upgrade
// const upgradeButton = document.createElement("button");
// upgradeButton.innerHTML = "Purchase Upgrade (10 points)";
// upgradeButton.disabled = true; 
// app.append(upgradeButton);

// upgradeButton.addEventListener("click", () => {
//   if (counter >= 10) {
//       counter -= 10; 
//       growthRate += 1;
      
//       counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;
//       checkUpgradeAvailability(); 
//   }
// });

// function checkUpgradeAvailability() {
//   upgradeButton.disabled = counter < 10;
// }

// // Step 6: Multiple upgrades and status


// // Step 4: Continuous Growth based on Growth Rate
// let start: number | undefined;

// function step(timestamp: number) {
//   if (start === undefined) {
//     start = timestamp;
//   }

//   const elapsed = timestamp - start;

//   // Increment counter based on growth rate and elapsed time
//   counter += (elapsed / 1000) * growthRate;
//   counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;

//   start = timestamp;

//   requestAnimationFrame(step);
// }

// // Start the animation loop
// requestAnimationFrame(step);


import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cherry Clicker!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Initialize growth rate to zero
let growthRate: number = 0; 
let counter: number = 0; // Initialize counter

// Upgrade tracking
let upgradeACount = 0;
let upgradeBCount = 0;
let upgradeCCount = 0;

// Status Displays
const statusDisplay = document.createElement("div");
statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} cherry points/sec<br>A: ${upgradeACount}, B: ${upgradeBCount}, C: ${upgradeCCount}`;
app.append(statusDisplay);

// Counter Display
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;
app.append(counterDisplay);

// Step 1: A button you can click
const button = document.createElement("button");
button.innerHTML = "Click 🍒! ";
app.append(button);

// Main click event to increase the counter
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  checkUpgradeAvailability(); // Check upgrade availability after click
});

// Step 6: Purchasing upgrades
const upgradeAButton = createUpgradeButton("Purchase Upgrade A (10 points)", 10, 0.1);
const upgradeBButton = createUpgradeButton("Purchase Upgrade B (100 points)", 100, 2.0);
const upgradeCButton = createUpgradeButton("Purchase Upgrade C (1000 points)", 1000, 50.0);

// Function to create an upgrade button
function createUpgradeButton(label: string, cost: number, growth: number) {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.disabled = true; 
  app.append(button);

  button.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost; // Deduct cost from counter
      growthRate += growth; // Increment growth rate
      updateUpgradeCount(label); // Update the count of purchased upgrades
      updateCounterDisplay(); // Update counter display
      checkUpgradeAvailability(); // Check if upgrades can be purchased
    }
  });

  return button;
}

// Function to update the counts of purchased upgrades
function updateUpgradeCount(label: string) {
  if (label.includes("A")) upgradeACount++;
  else if (label.includes("B")) upgradeBCount++;
  else if (label.includes("C")) upgradeCCount++;

  updateStatusDisplay(); // Update status display
}

// Function to update the counter display
function updateCounterDisplay() {
  counterDisplay.innerHTML = `${Math.floor(counter)} cherry points 🍒`;
}

// Function to update the status display
function updateStatusDisplay() {
  statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} cherry points/sec<br>A: ${upgradeACount}, B: ${upgradeBCount}, C: ${upgradeCCount}`;
}

// Function to check upgrade availability
function checkUpgradeAvailability() {
  upgradeAButton.disabled = counter < 10;
  upgradeBButton.disabled = counter < 100;
  upgradeCButton.disabled = counter < 1000;
}

// Step 4: Continuous Growth based on Growth Rate
let lastTimestamp: number | undefined;

function step(timestamp: number) {
  if (lastTimestamp === undefined) {
    lastTimestamp = timestamp;
  }

  const elapsed = timestamp - lastTimestamp;

  // Increment counter based on growth rate and elapsed time
  counter += (elapsed / 1000) * growthRate; // Growth per second based on growthRate
  updateCounterDisplay();

  lastTimestamp = timestamp;

  requestAnimationFrame(step);
}

// Start the animation loop
requestAnimationFrame(step);
