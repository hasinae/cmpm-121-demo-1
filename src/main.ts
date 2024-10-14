import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cherry Clicker!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let growthRate: number = 0; // Initialize growth rate to zero
let counter: number = 0; // Initialize counter

// Upgrade tracking
let upgradeACount = 0;
let upgradeBCount = 0;
let upgradeCCount = 0;

// Price increase factor
const priceIncreaseFactor = 1.15;

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

// Step 6: Purchasing upgrades with increasing cost
const upgradeAButton = createUpgradeButton("A", 10, 0.1);
const upgradeBButton = createUpgradeButton("B", 100, 2.0);
const upgradeCButton = createUpgradeButton("C", 1000, 50.0);

// Function to create an upgrade button
function createUpgradeButton(type: string, initialCost: number, growth: number) {
  let cost = initialCost;

  const button = document.createElement("button");
  button.innerHTML = `Purchase Upgrade ${type} (${cost.toFixed(2)} points)`;
  button.disabled = true;
  app.append(button);

  button.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost; // Deduct cost from counter
      growthRate += growth; // Increment growth rate

      updateUpgradeCount(type); // Update the count of purchased upgrades

      // Step 7: Increase cost by 15% after each purchase
      cost *= priceIncreaseFactor; // Increase the cost for the next purchase
      button.innerHTML = `Purchase Upgrade ${type} (${cost.toFixed(2)} points)`; // Update button text

      updateCounterDisplay(); // Update counter display
      checkUpgradeAvailability(); // Check if upgrades can be purchased
    }
  });

  return button;
}

// Function to update the counts of purchased upgrades
function updateUpgradeCount(type: string) {
  if (type === "A") upgradeACount++;
  else if (type === "B") upgradeBCount++;
  else if (type === "C") upgradeCCount++;

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
