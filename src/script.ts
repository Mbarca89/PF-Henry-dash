const registerButton: HTMLButtonElement = document.getElementById("register") as HTMLButtonElement;
const loginButton: HTMLButtonElement = document.getElementById("login") as HTMLButtonElement;
const container: HTMLDivElement = document.getElementById("container") as HTMLDivElement;

// Login button event listener
registerButton.addEventListener("click", () => {
    
    container.classList.add("right-panel-active");
})