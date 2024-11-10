function loadSettings() {
    let theme = localStorage.getItem('theme') || 'light';
    let notifications = localStorage.getItem('notifications') === 'true';
    let email = localStorage.getItem('email') || '';
    
    document.getElementById('theme').value = theme;
    document.getElementById('notifications').checked = notifications;
    document.getElementById('email').value = email;
}

function saveSettings() {
    let theme = document.getElementById('theme').value;
    let notifications = document.getElementById('notifications').checked;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('email', email);

    console.log('New password set to: ' + password);
    alert('Settings saved!');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

window.onload = function() {
    loadSettings();

    document.getElementById('settings-form').onsubmit = function(event) {
        event.preventDefault();
        saveSettings();
    };
};