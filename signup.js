// Function to handle the sign-up process
function signUp() {
    // Get the email entered by the user
    const email = document.getElementById('email').value;

    // Get the password entered by the user
    const password = document.getElementById('password').value;

    // Send a POST request to the server to create a new user
    fetch('http://localhost:5000/signup', { // Replace with the actual server URL
        method: 'POST', // HTTP method to send data
        headers: {
            'Content-Type': 'application/json' // Specify the type of data being sent
        },
        body: JSON.stringify({ email, password }) // Convert the email and password to a JSON string
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // Check if the sign-up was successful
        if (data.success) {
            alert('Sign-up successful! You can now log in.'); // Notify the user of success
            window.location.href = 'Login.html'; // Redirect to the login page
        } else {
            // Show an error message if sign-up failed
            alert(data.message || 'Sign-up failed. Please try again.');
        }
    })
    .catch(error => console.error('Error during sign-up:', error)); // Log any errors to the console
}

// Add an event listener to the sign-up form to handle the submit event
document.getElementById('signup-form').addEventListener('submit', event => {
    event.preventDefault(); // Prevent the default form submission behavior
    signUp(); // Call the sign-up function
});