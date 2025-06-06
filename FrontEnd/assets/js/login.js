const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginForm = document.getElementById("login-form");
const submitButton = document.getElementById("submit-button");
const passwordErrorMessage = document.getElementById("password-error-message");
const usernameErrorMessage = document.getElementById("username-error-message");

loginForm.addEventListener("submit", (event) => {
	event.preventDefault();
	console.log("Username:" + usernameInput.value);
	console.log("Password:" + passwordInput.value);
	console.log(event);
	event.preventDefault();
});

usernameInput.addEventListener("blur", ($event) => {
	if ($event.target.value.length <= 0) {
		submitButton.setAttribute("disabled", true);
		usernameErrorMessage.style.display = "inline";
		usernameErrorMessage.style.color = "red";
	} else {
		submitButton.removeAttribute("disabled");
		usernameErrorMessage.style.display = "none";
	}
});

passwordInput.addEventListener("blur", ($event) => {
	if ($event.target.value.length <= 0) {
		submitButton.setAttribute("disabled", true);
		passwordErrorMessage.style.display = "inline";
		passwordErrorMessage.style.color = "red";
	} else {
		submitButton.removeAttribute("disabled");
		passwordErrorMessage.style.display = "none";
	}
});

//have to tweak it to enable submit button when BOTH fields are filled in, not just one or the other
