const cataasURL = "https://cataas.com";

document.addEventListener("DOMContentLoaded", prepareListeners);

// Sets up listeners
function prepareListeners() {
    const randomCatButton = document.getElementById("randomCatButton");
    randomCatButton.addEventListener("click", handleRandomCat);
    const searchBarElement = document.getElementById("searchForm");
    searchBarElement.addEventListener("submit", handleSearch);
    const hamburgerIcon = document.getElementById("hamburgerNavIcon");
    hamburgerIcon.addEventListener("click", toggleNavResponsive);
}

// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon 
function toggleNavResponsive() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

function handleSearch (event) {
  event.preventDefault(); // prevents refresh
  // there would be search behavior here but we have nothing to search
}

async function handleRandomCat() {
    const imgContainer = document.getElementById("randomCatImageContainer");
    imgContainer.innerHTML = "";

    const img = document.createElement("img");
    img.src = await getCatURL();
    img.classList.add("randomCatImage");
    imgContainer.appendChild(img);
}

async function getCatURL() {
    try {
        const res = await fetch(cataasURL + "/cat?json=true");

        if (!res.ok) {
            throw new Error(`HTTP error: status ${res.status}`);
        }

        const data = await res.json();
        return data.url;
    } catch (err) {
        console.error("Fetch failed:", err.message);
    }
}