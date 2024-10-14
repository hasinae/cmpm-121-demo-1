import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cherry Clicker!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let growthRate: number = 0; 
let counter: number = 0; 

// Upgrade tracking
let cherrySeedCount = 0;
let cherryTreeCount = 0;
let cherryOrchardCount = 0;

// Price increase factor
const priceIncreaseFactor = 1.15;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "Cherry Seed", cost: 10, rate: 0.1, description: "A tiny seed that grows into a cherry tree." },
  { name: "Cherry Tree", cost: 100, rate: 2, description: "A robust tree that produces cherries daily." },
  { name: "Cherry Orchard", cost: 1000, rate: 50, description: "A sprawling orchard with countless cherry trees." },
  { name: "Cherry Picker", cost: 5000, rate: 100, description: "A specialized tool to pick cherries efficiently." },
  { name: "Cherry Festival", cost: 10000, rate: 200, description: "An event that attracts cherry lovers from afar." },
];

// Create buttons for upgrades
const upgradeButtons = availableItems.map(item => createUpgradeButton(item.name, item.cost, item.rate, item.description));

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
  checkUpgradeAvailability(); 
});

// Create a display area for item descriptions
const descriptionDisplay = document.createElement("div");
descriptionDisplay.style.margin = "20px 0";
descriptionDisplay.style.fontSize = "16px";
app.append(descriptionDisplay);

// Function to create an upgrade button
function createUpgradeButton(label: string, initialCost: number, growth: number, description: string) {
  let cost = initialCost;

  const button = document.createElement("button");
  button.innerHTML = `${label} (${cost} cherries)`;
  button.style.margin = "10px";
  button.style.padding = "10px";
  button.disabled = true;
  app.append(button);

  // Update description display on hover
  button.addEventListener("mouseenter", () => {
    descriptionDisplay.innerHTML = description;
  });

  // Clear description when mouse leaves
  button.addEventListener("mouseleave", () => {
    descriptionDisplay.innerHTML = "";
  });

  button.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost; 
      growthRate += growth; 

      updateUpgradeCount(label); 

      cost *= priceIncreaseFactor;
      button.innerHTML = `${label} (${cost.toFixed(2)} cherries)`; 

      updateCounterDisplay();
      checkUpgradeAvailability(); 
    }
  });

  return button;
}

function updateUpgradeCount(label: string) {
  if (label === "Cherry Seed") cherrySeedCount++;
  else if (label === "Cherry Tree") cherryTreeCount++;
  else if (label === "Cherry Orchard") cherryOrchardCount++;

  updateStatusDisplay(); 
}

function updateCounterDisplay() {
  counterDisplay.innerHTML = `${Math.floor(counter)} cherries 🍒`;
}

function updateStatusDisplay() {
  statusDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} cherries/sec<br>Seeds: ${cherrySeedCount}, Trees: ${cherryTreeCount}, Orchards: ${cherryOrchardCount}`;
}

function checkUpgradeAvailability() {
  availableItems.forEach((item, index) => {
    upgradeButtons[index].disabled = counter < item.cost; 
  });
}

// Step 4: Continuous Growth based on Growth Rate
let lastTimestamp: number | undefined;

function step(timestamp: number) {
  if (lastTimestamp === undefined) {
    lastTimestamp = timestamp;
  }

  const elapsed = timestamp - lastTimestamp;

  counter += (elapsed / 1000) * growthRate; 
  updateCounterDisplay();

  lastTimestamp = timestamp;

  requestAnimationFrame(step);
}

// Start the animation loop
requestAnimationFrame(step);
