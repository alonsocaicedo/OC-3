console.log("Hello world");

//fetch("http://localhost:5678/api/works")
//	.then((response) => {
//		if (!response.ok) {
//			throw new Error("Could not fetch");
//		}
//
//		return response.json();
//	})
//
//	.then((data) => console.log(data))
//	.catch((error) => console.error(error));//

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
const categoriesDiv = document.getElementById("categoriesDiv");

//Display works
// Loop thru our data
// Create html elements
// Put corresponding data into elements
// Put html elements into gallery

async function renderWorks() {
	const works = await fetchWorks();
	works.forEach((work) => {
		const figure = document.createElement("figure");
		const figCaption = document.createElement("figcaption");
		const img = document.createElement("img");

		figCaption.textContent = work.title;
		img.src = work.imageUrl;
		img.alt = work.title;
		figure.appendChild(img);
		figure.appendChild(figCaption);
		gallery.appendChild(figure);
	});
}
renderWorks();

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

async function renderCategories() {
	const categories = await fetchCategories();
	const categoriesDiv = document.getElementById("categoriesDiv");
	categories.forEach((category) => {
		debugger;
		const categoryButton = document.createElement("button");
		categoryButton.textContent = category.name;
		categoriesDiv.appendChild(categoryButton);
	});
}
renderCategories();
