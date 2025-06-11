const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginForm = document.getElementById("login-form");
const submitButton = document.getElementById("submit-button");
const passwordErrorMessage = document.getElementById("password-error-message");
const usernameErrorMessage = document.getElementById("username-error-message");

loginForm.addEventListener("submit", logUserIn);
async function logUserIn() {
	event.preventDefault();
	const loginData = {
		email: usernameInput.value,
		password: passwordInput.value,
	};

	try {
		const response = await fetch("http://localhost:5678/api/users/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginData),
		});

		if (!response.ok) {
			alert("Incorrect email or password");
			throw new Error("Incorrect email or password");
		}

		const data = await response.json();
		console.log(data);
		// return data;
		window.location.replace("index.html");
	} catch (error) {
		console.error(error);
	}
}

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
