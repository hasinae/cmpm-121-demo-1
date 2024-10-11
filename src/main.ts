import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cherry Clicker!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


 // Creating a button that the player can click
const button = document.createElement("button");
button.innerHTML = "Click 🍒! ";
app.append(button);