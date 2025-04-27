// * H T M L  E L E ME N T S
// ACCOUNT HTML ELEMENTS
var logOutLink = document.querySelector(".welcome a");
var welcomeEmail = document.querySelector(".welcome-email");

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// SILDER HTML ELEMENTS
var photosContainer = document.querySelector(".photos-container");
var allImgs = Array.from(document.querySelectorAll(".welcome-content img"));
var silder = document.querySelector(".silder");
var closeBtn = document.querySelector(".close-btn");
var leftBtn = document.querySelector(".left-btn");
var rigntBtn = document.querySelector(".right-btn");

// ^___________________________________________________________
// * V A R I A B L E S
// ACCOUNT VARIABLES
var storedAccount = JSON.parse(localStorage.getItem("userAccount"));
welcomeEmail.innerHTML = storedAccount.userEmail;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  SLIDER VARIABLES
var currentIndex;

// ^___________________________________________________________
// * F U N C T I O N
// SILDER FUNCTIONS
function showSlider() {
  silder.classList.remove("d-none");
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function hideSlider() {
  silder.classList.add("d-none");
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function getCurrentImage(e) {
  var currentImage = e.target.closest("img");
  var currentImageSrc = currentImage.getAttribute("src");
  currentIndex = allImgs.indexOf(currentImage);

  silder
    .querySelector(".img-container img")
    .setAttribute("src", currentImageSrc);
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function getNextImage() {
  currentIndex++;
  if (currentIndex >= allImgs.length) currentIndex = 0;

  var nextImageSrc = allImgs[currentIndex].getAttribute("src");
  silder.querySelector(".img-container img").setAttribute("src", nextImageSrc);
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function getPreviousImage() {
  currentIndex--;
  if (currentIndex < 0) currentIndex = allImgs.length - 1;

  var previousImageSrc = allImgs[currentIndex].getAttribute("src");
  silder
    .querySelector(".img-container img")
    .setAttribute("src", previousImageSrc);
}

// ^___________________________________________________________
// * E V E N T S
// ACCOUNT EVENTS
logOutLink.addEventListener("click", function () {
  logOutLink.setAttribute("href", "index.html");
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// SILDER EVENTS
photosContainer.addEventListener("click", function (e) {
  if (e.target.closest(".welcome-content")) {
    showSlider();
    getCurrentImage(e);
  }
});

closeBtn.addEventListener("click", hideSlider);
rigntBtn.addEventListener("click", getNextImage);
leftBtn.addEventListener("click", getPreviousImage);

document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "ArrowRight":
      getNextImage();
      break;

    case "ArrowLeft":
      getPreviousImage();
      break;

    case "Escape":
      hideSlider();
  }
});

silder.addEventListener("click", function (e) {
  if (e.target === silder) {
    hideSlider();
  }
});
