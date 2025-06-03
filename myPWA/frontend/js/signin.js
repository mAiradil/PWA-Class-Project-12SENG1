// togglePassword.js

function togglePassword() {
    const passwordField = document.getElementById('signinpassword');
    const icon = document.querySelector('.toggle-password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.textContent = '🙉'; // Change to monkey covering ears
    } else {
        passwordField.type = 'password';
        icon.textContent = '👁'; // Change back to eye
    }
}
 