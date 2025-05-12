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

function validateEmail() {
    const emailInput = document.getElementById('signinemail');
    const email = emailInput.value;
    
    if (!email.includes('@')) {
        alert("Please enter a valid email address with an '@' symbol.");
        return false;
    }
    return true;
}

// Handle form submission
document.querySelector('.sign-up-form').addEventListener('submit', function(event) {
    if (!validateEmail()) {
       event.preventDefault(); // Stop form from submitting if validation fails
   } else {
        event.preventDefault(); // Prevent form’s default submission
       // window.location.href = '/'; // Redirect to the target page
   }
});
