function togglePassword() {
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        passwordIcon.textContent = '👁';
    }
}
