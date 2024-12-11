// Function to load saved settings from local storage
function loadSettings() {
    let theme = localStorage.getItem('theme') || 'light'; // Default theme is light
    let notifications = localStorage.getItem('notifications') === 'true'; // Notifications setting
    let email = localStorage.getItem('email') || ''; // Default email is empty

    // Update the UI with saved settings
    document.getElementById('theme').value = theme;
    document.getElementById('notifications').checked = notifications;
    document.getElementById('email').value = email;
}

// Function to save settings to local storage
function saveSettings() {
    let theme = document.getElementById('theme').value; // Get selected theme
    let notifications = document.getElementById('notifications').checked; // Get notifications preference
    let email = document.getElementById('email').value; // Get email input
    let password = document.getElementById('password').value; // Get password input

    // Validate email format
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.'); // Show error if email is invalid
        return;
    }
    // Validate password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.'); // Show error if password is too short
        return;
    }

    // Save settings to local storage
    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('email', email);

    console.log('New password set to: ' + password); // Log the new password (for demonstration)
    alert('Settings saved!'); // Notify the user
}

// Function to validate email format using a regex
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    return re.test(email); // Return true if email matches the pattern
}

// Load settings when the page finishes loading
window.onload = function() {
    loadSettings(); // Load saved settings

    // Attach event listener for back button
    document.getElementById('backButton').addEventListener('click', function () {
        window.location.href = 'Task_list.html'; // Navigate to the task list page
    });

    // Attach an event listener to save settings on form submission
    document.getElementById('settings-form').onsubmit = function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        saveSettings(); // Save the settings
    };
};
