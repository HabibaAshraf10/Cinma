// Validate Email Function
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Mark Field as Invalid (red border)
function markInvalid(element) {
    element.style.border = "2px solid red";
    // const errorMessage = element.nextElementSibling;
    // if (errorMessage) {
    //     errorMessage.textContent = message;  // Display the error message
    // }
}

// Reset Field Style (remove red border)
function resetField(element) {
    element.style.border = "";
    // const errorMessage = element.nextElementSibling;
    // if (errorMessage) {
    //     errorMessage.textContent = "";  // Clear the error message
    // }
}

document.addEventListener("DOMContentLoaded", function () {
    // Login Form Validation
    const loginForm = (document.getElementById("loginForm"));
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission initially to handle validation

            const emailElement = document.getElementById("loginEmail");
            const passwordElement = document.getElementById("loginPassword");
            const remember_me = document.getElementById("rememberCheckbox").checked;
            const email = emailElement.value.trim();
            const password = passwordElement.value.trim();

            let isValid = true; // Flag to track validation

            // Validate email
            if (!email || !validateEmail(email)) {
                markInvalid(emailElement, "Please enter a valid email.");
                isValid = false;
            } else {
                resetField(emailElement); // Reset the field if valid
            }

            // Validate password
            if (!password || password.length < 6) {
                markInvalid(passwordElement);
                alert("Password must be at least 6 characters long !!")
                isValid = false;
            } else {
                resetField(passwordElement); // Reset the field if valid
            }

            // If there are any validation errors, stop here
            if (!isValid) return;

            // Create FormData object manually
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('rememberMe', remember_me ? '1' : '0'); // Send as '1' for true, '0' for false

            fetch('/login', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // If login is successful, show success message
                        alert("Login successful!");
                        window.location.href = "/movies";  // Redirect to the home page
                    } else {
                        // If login fails, show the error message
                        alert("Incorrect email or password!!")
                        markInvalid(emailElement);
                        markInvalid(passwordElement);
                    }
                })
                .catch(error => {
                    // Handle any error that occurs during the fetch request
                    console.error("Login request failed:", error);
                });
        });
    }

    // Sign Up Form Validation
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission initially to handle validation

            const fullNameElement = document.getElementById("signupFullName");
            const userNameElement = document.getElementById("signupUserName")
            const emailElement = document.getElementById("signupEmail");
            const passwordElement = document.getElementById("signupPassword");
            const confirmPasswordElement = document.getElementById("signupConfirmPassword");

            const fullName = fullNameElement.value.trim();
            const userName = userNameElement.value.trim();
            const email = emailElement.value.trim();
            const password = passwordElement.value.trim();
            const confirmPassword = confirmPasswordElement.value.trim();

            let isValid = true; // Flag to track validation

            // Validate full name
            if (!fullName || fullName.length < 3) {
                alert("Full Name must be at least 3 characters long")
                markInvalid(fullNameElement);
                isValid = false;
            } else {
                resetField(fullNameElement); // Reset the field if valid
            }

            // Validate user name
            if (!userName || userName.length < 3) {
                alert("User Name must be at least 3 characters long!!")
                markInvalid(userNameElement);
                isValid = false;
            } else {
                resetField(userNameElement); // Reset the field if valid
            }

            // Validate email
            if (!email || !validateEmail(email)) {
                alert("Please enter a valid email!!")
                markInvalid(emailElement);
                isValid = false;
            } else {
                resetField(emailElement); // Reset the field if valid
            }

            // Validate password
            if (!password || password.length < 6) {
                alert("Password must be at least 6 charachters long!!")
                markInvalid(passwordElement);
                isValid = false;
            } else {
                resetField(passwordElement); // Reset the field if valid
            }

            // Validate confirm password
            if (password !== confirmPassword) {
                alert("password do not match!!")
                markInvalid(confirmPasswordElement);
                isValid = false;
            } else {
                resetField(confirmPasswordElement); // Reset the field if valid
            }

            // If there are any validation errors, stop here
            if (!isValid) return;

            // Send data to the backend to check if the email already exists
            const formData = new FormData();
            formData.append('full_name', fullName);
            formData.append('user_name', userName)
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirm_password', confirmPassword);

            fetch('/signup', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Sign-up successful!");
                        window.location.href = "/login"; // Redirect after success
                    } else {
                        if (data.error.includes("Email")) {
                            alert(data.error)
                            markInvalid(emailElement);
                        } else if (data.error.includes("Username")) {
                            alert(data.error)
                            markInvalid(userNameElement);
                        } else if (data.error.includes("Passwords")) {
                            alert(data.error)
                            markInvalid(confirmPasswordElement);
                        }
                    }
                })
                .catch(error => {
                    console.error("Error during signup:", error);
                });
        });
    }
});
