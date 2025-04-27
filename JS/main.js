// * H T M L  E L E ME N T S
var nameInput = document.querySelector(".name-input");
var emailInput = document.querySelector(".email-input");
var passwordInput = document.querySelector(".password-input");

var requiredMessage = document.querySelector(".required");
var sucessfulMessage = document.querySelector(".sucessful");
var existsMessage = document.querySelector(".exists");

var signUpBtn = document.querySelector(".sign-up");
var signInBtn = document.querySelector(".registration div button ");

var logInLink = document.querySelector(".log-in");
var inCorrectMessage = document.querySelector(".incorrect");

// ^___________________________________________________________
// * V A R I A B L E S
var signSwitch = true;

var nameRegex = /^[a-z0-9_-]{3,15}$/;
var emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+$/;
var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-_]).{5,}$/;

// ^___________________________________________________________
// * F U N C T I O N
function createAccount() {
  if (
    validateInputs(nameRegex, nameInput) &&
    validateInputs(emailRegex, emailInput) &&
    validateInputs(passwordRegex, passwordInput)
  ) {
    var userAccount = {
      userName: nameInput.value,
      userEmail: emailInput.value,
      userPassword: passwordInput.value,
    };

    localStorage.setItem("userAccount", JSON.stringify(userAccount));
    sucessfulMessage.classList.remove("d-none");
    requiredMessage.classList.add("d-none");
    existsMessage.classList.add("d-none");

    clearInputs();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      width: "300px",
      confirmButtonColor: "#e8883a",
      footer: `<div>
              <span class="d-block mt-2 pop-up">| Username: 3–15 chars, lowercase, numbers, _ or - .</span>
              <span class="d-block mt-2 pop-up">| Enter a valid email address (e.g.,
              user@example.com).</span>
              <span class="d-block mt-2 pop-up">| Password: 5+ chars, upper, lower, number, special.</span>
              </div>`,
    });
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function validateInputs(regexName, elementName) {
  if (regexName.test(elementName.value)) {
    elementName.classList.add("is-valid");
    elementName.classList.remove("is-invalid");

    return true;
  }

  elementName.classList.remove("is-valid");
  elementName.classList.add("is-invalid");

  return false;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  emailInput.classList.remove("is-valid");
  emailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-valid");
  passwordInput.classList.remove("is-invalid");
}

// ^___________________________________________________________
// * E V E N T S
nameInput.addEventListener("input", function () {
  validateInputs(nameRegex, nameInput);
});

emailInput.addEventListener("input", function () {
  validateInputs(emailRegex, emailInput);
});

passwordInput.addEventListener("input", function () {
  validateInputs(passwordRegex, passwordInput);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
signUpBtn.addEventListener("click", function () {
  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    passwordInput.value === ""
  ) {
    requiredMessage.classList.remove("d-none");
    sucessfulMessage.classList.add("d-none");
    existsMessage.classList.add("d-none");
    inCorrectMessage.classList.add("d-none");

    return;
  }

  var storedAccount = JSON.parse(localStorage.getItem("userAccount")) || {};
  if (
    storedAccount.userName === nameInput.value ||
    storedAccount.userEmail === emailInput.value ||
    storedAccount.userPassword === passwordInput.value
  ) {
    existsMessage.classList.remove("d-none");
    sucessfulMessage.classList.add("d-none");
    requiredMessage.classList.add("d-none");

    return;
  }

  createAccount();
  nameInput.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  passwordInput.classList.remove("is-valid");
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
signInBtn.addEventListener("click", function () {
  if (signSwitch) {
    nameInput.classList.add("d-none");
    logInLink.classList.remove("d-none");
    signUpBtn.classList.add("d-none");
    sucessfulMessage.classList.add("d-none");
    existsMessage.classList.add("d-none");

    signInBtn.textContent = "sign up";
    clearInputs();
  } else {
    nameInput.classList.remove("d-none");
    logInLink.classList.add("d-none");
    signUpBtn.classList.remove("d-none");
    inCorrectMessage.classList.add("d-none");

    nameInput.classList.remove("is-valid");
    nameInput.classList.remove("is-invalid");

    signInBtn.textContent = "sign in";
    clearInputs();
  }

  signSwitch = !signSwitch;
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
logInLink.addEventListener("click", function () {
  var storedAccount = JSON.parse(localStorage.getItem("userAccount"));
  if (
    storedAccount.userEmail === emailInput.value &&
    storedAccount.userPassword === passwordInput.value
  ) {
    logInLink.setAttribute("href", "welcome.html");
    inCorrectMessage.classList.add("d-none");

    return;
  }

  if (emailInput.value === "" || passwordInput.value === "") {
    inCorrectMessage.classList.add("d-none");
    requiredMessage.classList.remove("d-none");

    return;
  }

  inCorrectMessage.classList.remove("d-none");
  requiredMessage.classList.add("d-none");
});
