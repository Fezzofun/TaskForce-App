function validateLogin(email, password) {
    return email === "hello@example.com" && password === "world123";
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