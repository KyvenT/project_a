const cataasURL = "https://cataas.com";

document.addEventListener("DOMContentLoaded", prepareListeners);

let lastRowImagesClicked = 0;

// Sets up listeners
function prepareListeners() {
    const randomCatButtons = document.querySelectorAll(".randomCatButtons");
    randomCatButtons.forEach(button => {
      button.addEventListener("click", handleRandomCat);
      button.addEventListener("click", addNewRow);
    });
    const searchBarElement = document.getElementById("searchForm");
    searchBarElement.addEventListener("submit", handleSearch);
    const hamburgerIcon = document.getElementById("hamburgerNavIcon");
    hamburgerIcon.addEventListener("click", toggleNavResponsive);
}

// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon 
function toggleNavResponsive() {
    const navBar = document.getElementById("navBar");
    if (navBar.className === "topnav") {
      navBar.className += " responsive";
    } else {
      navBar.className = "topnav";
    }
}

function handleSearch (event) {
  event.preventDefault(); // prevents refresh
  // there would be search behavior here but we have nothing to search
}

async function handleRandomCat(event) {
    const imgContainer = event.currentTarget;
    if (imgContainer.imgCreated) {
      return;
    }
    imgContainer.imgCreated = true;
    lastRowImagesClicked++;
    const img = document.createElement("img");
    img.src = await getCatURL();
    img.classList.add("randomCatImage");
    imgContainer.appendChild(img);
}

async function getCatURL() {
    try {
        const res = await fetch(cataasURL + "/cat?type=square&json=true");

        if (!res.ok) {
            throw new Error(`HTTP error: status ${res.status}`);
        }

        const data = await res.json();
        return data.url;
    } catch (err) {
        console.error("Fetch failed:", err.message);
    }
}

function addNewRow() {
    console.log(lastRowImagesClicked);
    if (lastRowImagesClicked !== 5) return
    const randomCatContainer = document.querySelector(".randomCatContainer");
    const row = document.createElement("div");
    row.classList.add("randomCatButtonRow");
    for (let i = 0; i < 5; i++) {
      const button = document.createElement("button");
      button.classList.add("randomCatButtons");
      button.addEventListener("click", handleRandomCat);
      button.addEventListener("click", addNewRow);
      row.appendChild(button);
    }
    randomCatContainer.appendChild(row);
    row.scrollIntoView();
    lastRowImagesClicked = 0;
}