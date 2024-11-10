function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sign-up successful! You can now log in.');
            window.location.href = 'Login.html';  // Redirect to login page
        } else {
            alert(data.message || 'Sign-up failed. Please try again.');
        }
    })
    .catch(error => console.error('Error during sign-up:', error));
}


document.getElementById('signup-form').addEventListener('submit', event => {
    event.preventDefault();
    signUp();
});