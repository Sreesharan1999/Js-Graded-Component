const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username.trim() === '' || password.trim() === '') {
        loginError.textContent = 'Please enter both username and password.';
        return;
    }

    if (username === 'admin' && password === 'password') {

        localStorage.setItem('username', username);

        window.location.href = 'resume.html';
    } else {
        loginError.textContent = 'Invalid username/password.';
    }
}
function check() {
    if (localStorage.getItem('username') != null) {
        window.location.href = 'resume.html';
    }
}
check();