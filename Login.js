function validateLogin(email, password) {
    if (!email || !password) {
        alert("Please enter both email and password.");
        return false;
    }
    return true;
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validateLogin(email, password)) {
        alert("Login successful!");
        window.location.href = "Task_list.html";
    } else {
        alert("Invalid email or password.");
    }
}

document.getElementById('login-form').addEventListener('submit', handleLogin);