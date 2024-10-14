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
let cherrySeedCount = 0;
let cherryTreeCount = 0;
let cherryOrchardCount = 0;

// Price increase factor
const priceIncreaseFactor = 1.15;

// Status Displays
const statusDisplay = document.createElement("div");
statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} cherries/sec<br>Seeds: ${cherrySeedCount}, Trees: ${cherryTreeCount}, Orchards: ${cherryOrchardCount}`;
app.append(statusDisplay);

// Counter Display
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${Math.floor(counter)} cherries 🍒`;
app.append(counterDisplay);

// Step 1: A button you can click
const button = document.createElement("button");
button.innerHTML = "Pick Cherries 🍒";
button.style.fontSize = "20px";
button.style.padding = "15px";
app.append(button);

// Main click event to increase the counter
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  checkUpgradeAvailability(); // Check upgrade availability after click
});

// Step 8: Redesign upgrade buttons to match the cherry theme
const cherrySeedButton = createUpgradeButton("Cherry Seed (10 cherries)", 10, 0.1, 'Seeds');
const cherryTreeButton = createUpgradeButton("Cherry Tree (100 cherries)", 100, 2.0, 'Trees');
const cherryOrchardButton = createUpgradeButton("Cherry Orchard (1000 cherries)", 1000, 50.0, 'Orchards');

// Function to create an upgrade button
function createUpgradeButton(label: string, initialCost: number, growth: number, type: string) {
  let cost = initialCost;

  const button = document.createElement("button");
  button.innerHTML = label;
  button.style.margin = "10px";
  button.style.padding = "10px";
  button.disabled = true;
  app.append(button);

  button.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost; // Deduct cost from counter
      growthRate += growth; // Increment growth rate

      updateUpgradeCount(type); // Update the count of purchased upgrades

      // Step 7: Increase cost by 15% after each purchase
      cost *= priceIncreaseFactor; // Increase the cost for the next purchase
      button.innerHTML = `${type === 'Seeds' ? 'Cherry Seed' : type === 'Trees' ? 'Cherry Tree' : 'Cherry Orchard'} (${cost.toFixed(2)} cherries)`; // Update button text

      updateCounterDisplay(); // Update counter display
      checkUpgradeAvailability(); // Check if upgrades can be purchased
    }
  });

  return button;
}

// Function to update the counts of purchased upgrades
function updateUpgradeCount(type: string) {
  if (type === "Seeds") cherrySeedCount++;
  else if (type === "Trees") cherryTreeCount++;
  else if (type === "Orchards") cherryOrchardCount++;

  updateStatusDisplay(); // Update status display
}

// Function to update the counter display
function updateCounterDisplay() {
  counterDisplay.innerHTML = `${Math.floor(counter)} cherries 🍒`;
}

// Function to update the status display
function updateStatusDisplay() {
  statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} cherries/sec<br>Seeds: ${cherrySeedCount}, Trees: ${cherryTreeCount}, Orchards: ${cherryOrchardCount}`;
}

// Function to check upgrade availability
function checkUpgradeAvailability() {
  cherrySeedButton.disabled = counter < 10;
  cherryTreeButton.disabled = counter < 100;
  cherryOrchardButton.disabled = counter < 1000;
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
