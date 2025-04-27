
// Tab switching functionality

document.addEventListener("DOMContentLoaded", function () {
    // Form switching functionality
    const signupForm = document.getElementById("signupForm");
    const signupButton = signupForm.querySelector("button[type='submit']");
    const signupFullName = document.getElementById("fullName");
    const signupEmail = document.getElementById("signupEmail");
    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");
  
    // Function to check if all inputs are filled
    function checkInputs() {
      if (
        signupFullName.value.trim() === "" ||
        signupEmail.value.trim() === "" ||
        signupPassword.value.trim() === "" ||
        confirmPassword.value.trim() === ""
      ) {
        signupButton.disabled = true; 
      } else {
        signupButton.disabled = false; 
      }
    }
    
    // Add event listeners to all inputs
    [signupFullName, signupEmail, signupPassword, confirmPassword].forEach(
      (input) => {
        input.addEventListener("input", checkInputs);
      }
    );
    
    // Password validation
    signupPassword.addEventListener("input", function (e) {
      const passwordInput = e.target;
      if (!validatePassword(passwordInput.value)) {
        showError(
          passwordInput,
          "Password must be 8 characters with 1 uppercase, 1 lowercase, and 1 number"
        );
      } else {
        clearError(passwordInput);
      }
    });
    
    // Confirm password validation
    confirmPassword.addEventListener("input", function (e) {
      const confirmPasswordInput = e.target;
      if (signupPassword.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match");
      } else {
        clearError(confirmPasswordInput);
      }
    });
  
    // Full name validation
    signupFullName.addEventListener("input", function (e) {
      const fullNameInput = e.target;
      const validateFullName = validateName(fullNameInput.value);
      
      if (!validateFullName.isValid) {
        showError(fullNameInput, validateFullName.messages.join(" "));
      } else {
        clearError(fullNameInput);
      }
    });
    
    // Email validation
    signupEmail.addEventListener("input", function (e) {
      const signupInput = e.target;
      if (!validateEmail(signupInput.value)) {
        showError(signupEmail, "Please enter a valid email address");
      } else {
        clearError(signupEmail);
      }
    });
    
    const loginSection = document.getElementById("login-section");
    const signupSection = document.getElementById("signup-section");
    const showSignUpLink = document.getElementById("showSignup");
    const showLoginLink = document.getElementById("showLogin");
    // Form switching functionality
    showSignUpLink.addEventListener("click", function (e) {
      e.preventDefault();
      loginSection.style.display = "none";
      signupSection.style.display = "block";
    });
  
    showLoginLink.addEventListener("click", function (e) {
      e.preventDefault();
      loginSection.style.display = "block";
      signupSection.style.display = "none";
    });
  
    // Initial check to disable the button on page load
    checkInputs();
  
    

  // Load users from local storage
  let clients = JSON.parse(localStorage.getItem("clients")) || [];

  
    // Function to save users to local storage
    function saveToLocalStorage() {
      localStorage.setItem("clients", JSON.stringify(clients)); 
    };
    

    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
    
      // Check if all inputs are valid
      if (
        signupFullName.value.trim() !== "" &&
        signupEmail.value.trim() !== "" &&
        signupPassword.value.trim() !== "" &&
        confirmPassword.value.trim() !== "" &&
        signupPassword.value === confirmPassword.value
      ) {
        // Add the new user to the clients array
        clients.push({
          fullName: signupFullName.value.trim(),
          email: signupEmail.value.trim(),
          password: signupPassword.value.trim(),
        });
    
        // Save the updated clients array to local storage
        saveToLocalStorage();
    
        // Show success message or perform further actions
        alert("Signup successful . Thank You!");
    
        // Reset the form and recheck inputs
        signupForm.reset();
        checkInputs();
      } else {
        alert("Please fill in all fields correctly.");
      }
    });

    
  
    // Show user details (placeholder function)
    function clientDetails() {
      clients.forEach((client, index) => {
        console.log(`Client ${index + 1}:`, client);
      });
    }
  
    // Validation functions
    function validatePassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return passwordRegex.test(password);
    }
  
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    function validateName(name) {
      const errors = [];
  
      // Check for minimum length
      if (name.length < 2) {
        errors.push("Name must be at least 2 characters long.");
      }
  
      // Check for only letters and spaces
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(name)) {
        errors.push("Name should only contain letters and spaces.");
      }
  
      // Check for leading/trailing spaces
      if (name !== name.trim()) {
        errors.push("Name should not start or end with spaces.");
      }
  
      // Return validation result
      if (errors.length > 0) {
        return { isValid: false, messages: errors };
      }
      return { isValid: true, messages: [] };
    }
  
    // Error handling functions
    function showError(input, message) {
      input.classList.add("error");
      const errorElement = input.nextElementSibling;
      errorElement.textContent = message;
    }
  
    function clearError(input) {
      input.classList.remove("error");
      const errorElement = input.nextElementSibling;
      errorElement.textContent = "";
    }
    
      // // Check if the email and password are correct
      // showLoginLink.addEventListener("click", function (e) {
      //   e.preventDefault();
  
      //   const loginEmail = document.getElementById("loginEmail");
      //   const loginPassword = document.getElementById("loginPassword");
  
      //   if (loginEmail.value.trim() !== "" && loginPassword.value.trim() !== "") {
      //     const clients = JSON.parse(localStorage.getItem("clients")) || [];
      //     const user = clients.find(
      //       (client) =>
      //         client.email === loginEmail.value.trim() &&
      //         client.password === loginPassword.value.trim()
      //     );
  
      //     console.log("Clients array:", clients);
      //     if (user) {
      //       alert("Login successful");
      //       loginEmail.value = "";
      //       loginPassword.value = "";
      //     } else {
      //       alert("Invalid email or password");
      //     }
      //   } else {
      //     alert("Please fill in all fields");
      //   }
      // });
      // Login form submission
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");

  if (loginEmail.value.trim() !== "" && loginPassword.value.trim() !== "") {
    let clients = [];
    try {
      const storedClients = localStorage.getItem("clients");
      clients = storedClients ? JSON.parse(storedClients) : [];
    } catch (error) {
      console.error("Error loading users from local storage:", error);
      alert("An error occurred. Please try again.");
      return;
    }

    console.log("Clients array during login:", clients); // Debugging

    const user = clients.find(
      (client) =>
        client.email === loginEmail.value.trim() &&
        client.password === loginPassword.value.trim()
    );

    if (user) {
      alert("Login successful");
      loginEmail.value = "";
      loginPassword.value = "";
    } else {
      alert("Invalid email or password");
    }
  } else {
    alert("Please fill in all fields");
  }
});
  });
