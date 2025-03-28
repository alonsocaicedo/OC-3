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


fetchWorks();

    async function fetchWorks(){
try {
const response = await fetch("ttp://localhost:5678/api/works");

if(!response.ok){
throw new Error ("Could not fetch resource");

}

const data = await response.json();
console.log(data;

}
catch(error){
    console.error(error);
}

    }

    const gallery = document.getElementById('gallery');