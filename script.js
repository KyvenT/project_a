// Onload functions 
window.onload = function() {
    prepareListeners();
}

// Sets up listeners
function prepareListeners() {
    // let element = document.getElementById("elementId");
    // element.addEventListener("click", someFunction);
}

// d navbar 
// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon 
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }