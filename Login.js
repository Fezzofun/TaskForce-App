// Function to validate if both email and password are provided
function validateLogin(email, password) {
    // Check if either email or password is missing
    if (!email || !password) {
        alert("Please enter both email and password."); // Alert user to fill in the fields
        return false; // Return false if validation fails
    }
    return true; // Return true if both fields are filled
}

// Function to handle the login process when the form is submitted
function handleLogin(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the email value entered by the user
    const email = document.getElementById('email').value;

    // Get the password value entered by the user
    const password = document.getElementById('password').value;

    // Validate the email and password
    if (validateLogin(email, password)) {
        alert("Login successful!"); // Show success message
        window.location.href = "Task_list.html"; // Redirect to the task list page
    } else {
        alert("Invalid email or password."); // Show error message if validation fails
    }
}

// Add an event listener to the login form
document.getElementById('login-form').addEventListener('submit', handleLogin);