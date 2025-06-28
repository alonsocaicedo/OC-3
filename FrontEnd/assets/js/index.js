console.log("Helloo world");

const homeButton = document.getElementById("home");
const editButton = document.getElementById("edit");
const modal = document.getElementById("modal");
// const modalGallery = document.getElementById("modalGallery");
const loginAnchor = document.getElementById("loginAnchor");
const editHeader = document.getElementById("editHeader");

editHeader.setAttribute("hidden", "");

homeButton.addEventListener("click", redirectToHome);
loginAnchor.addEventListener("click", logout);

function logout(event) {
	event.preventDefault();
	// if we have the token from being logged in, then this will remove it to log us out AND it will redirect to home after
	if (sessionStorage.getItem("token")) {
		sessionStorage.removeItem("token");
		redirectToHome();
	}
	// however, if there is no token, then it will redirect us to the login.html page, which it originally does, but since we did preventDefault(), we are putting this
	else {
		window.location.replace("login.html");
	}
}

function redirectToHome() {
	window.location.replace("index.html");
}

editButton.addEventListener("click", renderEditElements);

function renderEditElements() {
	if (editHeader.hasAttribute("hidden") || modal.style.display === "none") {
		editHeader.removeAttribute("hidden");
		modal.style.display = "block";
	} else {
		editHeader.setAttribute("hidden", "");
		modal.style.display = "none";
	}
}

async function openModal() {
	const works = await fetchWorks(); // or reuse cached list if you have one
	const modalGallery = document.querySelector(".modalGallery");

	renderWorks(works, modalGallery); // ✅ Render to the modal instead of the main page
	document.getElementById("modalGallery").style.display = "block";
}

//function to render elements that only show IF logged in, need function to check for token, then to display or hide based on token avail
function renderLoginElements() {
	const token = sessionStorage.getItem("token");
	if (token) {
		editButton.style.display = "block";
		loginAnchor.innerText = "Logout";
	} else {
		editButton.style.display = "none";
		loginAnchor.innerText = "Login";
	}
}

// need to make login change to logout, check for token after

async function fetchWorks() {
	try {
		const response = await fetch("http://localhost:5678/api/works");

		if (!response.ok) {
			throw new Error("Could not fetch resource");
		}

		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
	}
}

const gallery = document.getElementById("gallery");
const categoriesButtons = document.getElementById("categoriesButtons");
let worksCategoryId;

//Display works
// Loop thru our data
// Create html elements
// Put corresponding data into elements
// Put html elements into gallery

async function renderWorks(works) {
	// const works = await fetchWorks();
	gallery.innerHTML = "";
	// modalGallery.innerHTML = "";
	works.forEach((work) => {
		const figure = document.createElement("figure");
		const figCaption = document.createElement("figcaption");
		const img = document.createElement("img");

		figure.setAttribute;
		figCaption.textContent = work.title;
		// let worksCategoryId = categoryId;
		img.src = work.imageUrl;
		img.alt = work.title;
		figure.appendChild(img);
		figure.appendChild(figCaption);
		gallery.appendChild(figure);
		// modalGallery.appendChild(figure);
	});
}

// function setCategoryId(categoryId) {
// 	fetchWorks();
// 	worksCategoryId = work.categoryId;

// 	categoriesButtons.addEventListener("click", () => {
// 		const category = this.dataset.category;

// 		if (category === worksCategoryId.toString()) {
// 			works.style.display = "block";
// 		} else {
// 			works.style.display = "none";
// 		}
// 	});
// }

// same as fetchworks but gets the categories

async function fetchCategories() {
	try {
		const response = await fetch("http://localhost:5678/api/categories");
		if (!response.ok) {
			throw new Error("Could not fetch resource");
		}

		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
	}
}

// puts the categories on the page from the api endpoint
async function renderCategories() {
	const categories = await fetchCategories();

	const allButton = document.createElement("button");
	allButton.textContent = "All";
	categoriesButtons.appendChild(allButton);

	allButton.addEventListener("click", () => filterWorks("all"));

	categories.forEach((category) => {
		const categoryButton = document.createElement("button");
		categoryButton.innerText = category.name;
		categoryButton.classList.add("category-button");
		categoryButton.dataset.id = category.id;
		categoriesButtons.appendChild(categoryButton);
		categoryButton.addEventListener("click", () => {
			console.log(category.name + " category button clicked");
			filterWorks(categoryButton.dataset.id);
		});
	});
}

async function filterWorks(id = "all") {
	const works = await fetchWorks();
	let list;
	if (id === "all") {
		list = works;
	} else {
		list = works.filter(function (work) {
			return work.categoryId == id;
		});
	}
	renderWorks(list);
}

async function init() {
	renderCategories();
	const works = await fetchWorks();
	renderWorks(works);
	renderLoginElements();
}
init();
