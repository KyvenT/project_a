const cataasURL = "https://cataas.com";

document.addEventListener("DOMContentLoaded", prepareListeners);

let lastRowImagesClicked = 0;
let lastRowURLs = [];
const ROW_SIZE = 5;

// Sets up listeners
function prepareListeners() {
    loadNextRow();

    const randomCatButtons = document.querySelectorAll(".randomCatButtons");
    randomCatButtons.forEach(button => {
      button.addEventListener("click", handleRandomCat);
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
    console.log(lastRowImagesClicked);
    if (imgContainer.imgCreated) {
      return;
    }

    imgContainer.imgCreated = true;
    lastRowImagesClicked++;
    const img = document.createElement("img");
    img.src = lastRowURLs.shift();
    img.classList.add("randomCatImage");
    imgContainer.appendChild(img);
    if (lastRowImagesClicked === 5) {
      addNewRow();
    }
    if (lastRowImagesClicked == 3) {
      await loadNextRow();
    }
}

async function loadNextRow() {
    const gifIndex = (Math.floor(Math.random() * ROW_SIZE)); // random number from 0-4
    console.log("gif index: " + gifIndex);
    for (let i = 0; i < ROW_SIZE; i++) {
        if (i === gifIndex) {
          lastRowURLs.push(await getCatGifURL());
        } else {
          lastRowURLs.push(await getCatPictureURL());
        }
    }
}

async function getCatPictureURL() {
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

async function getCatGifURL() {
    try {
        const res = await fetch(cataasURL + "/cat/gif?type=square&json=true");

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
    const randomCatContainer = document.querySelector(".randomCatContainer");
    const row = document.createElement("div");
    row.classList.add("randomCatButtonRow");
    for (let i = 0; i < ROW_SIZE; i++) {
      const button = document.createElement("button");
      button.classList.add("randomCatButtons");
      button.addEventListener("click", handleRandomCat);
      row.appendChild(button);
    }
    randomCatContainer.appendChild(row);
    row.scrollIntoView();
    lastRowImagesClicked = 0;
}