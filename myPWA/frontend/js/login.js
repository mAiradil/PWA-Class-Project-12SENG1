/**************
 * PASSWORD TOGGLE
 **************/
function togglePassword() {
    const passwordInput =
        document.getElementById('signuppassword') ||
        document.getElementById('signinpassword');
    const passwordIcon = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.textContent = '🙉';
    } else {
        passwordInput.type = 'password';
        passwordIcon.textContent = '👁';
    }
}

/**************
 * SANITISATION LOGIC
 **************/
function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input.trim(); // Escape HTML + trim whitespace
    return temp.innerHTML.replace(/<script.*?>.*?<\/script>/gi, '');
}

/**************
 * VALIDATION FOR SIGNUP
 **************/
function validateEmail() {
    const emailInput = document.getElementById('signupemail');
    const raw = emailInput?.value || '';
    const sanitized = sanitizeInput(raw);
    emailInput.value = sanitized;
    return sanitized.includes('@');
}

function validatePassword(input = null) {
    const pwdField = document.getElementById('signuppassword');
    const raw = input !== null ? input : pwdField?.value || '';
    const sanitized = sanitizeInput(raw);
    if (pwdField) pwdField.value = sanitized;

    const hasLength = sanitized.length >= 8;
    const hasUpper = /[A-Z]/.test(sanitized);
    const hasLower = /[a-z]/.test(sanitized);
    const hasNumberOrSpecial = /[0-9\W_]/.test(sanitized);
    const noTripleRepeat = !/(.)\1\1/.test(sanitized);

    updateRequirement("length", hasLength);
    updateRequirement("uppercase", hasUpper);
    updateRequirement("lowercase", hasLower);
    updateRequirement("numberSpecial", hasNumberOrSpecial);
    updateRequirement("repeat", noTripleRepeat);

    return hasLength && hasUpper && hasLower && hasNumberOrSpecial && noTripleRepeat;
}

function updateRequirement(id, conditionMet) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.toggle("valid", conditionMet);
    }
}

// Realtime validation for signup form
if (document.getElementById('signuppassword')) {
    const submitBtn = document.querySelector('button[type="submit"]');
    const emailInput = document.getElementById('signupemail');
    const passwordInput = document.getElementById('signuppassword');

    const handleInput = () => {
        const passwordValid = validatePassword();
        const emailValid = validateEmail();
        submitBtn.disabled = !(passwordValid && emailValid);
    };

    passwordInput.addEventListener('input', handleInput);
    emailInput.addEventListener('input', handleInput);

    document.querySelector('.sign-up-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const msg = document.getElementById('signupmessage');
        msg.style.color = "red";
        msg.style.fontWeight = "bold";

        if (!(isEmailValid && isPasswordValid)) {
            msg.textContent = "Please meet all password and email requirements!";
            return;
        }

        msg.style.color = "red";
        msg.textContent = "🎉 Successfully signed up!";
    });
}

/**************
 * SIGNIN LOCKOUT LOGIC
 **************/
const signinForm = document.getElementById('signinForm');
const signinMessage = document.getElementById('signinmessage');
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000;

function isLockedOut() {
    const lockoutTime = localStorage.getItem('lockoutTime');
    if (!lockoutTime) return false;
    const now = new Date().getTime();
    return now < parseInt(lockoutTime);
}

function getRemainingLockoutTime() {
    const lockoutTime = parseInt(localStorage.getItem('lockoutTime'));
    const now = new Date().getTime();
    return Math.ceil((lockoutTime - now) / 1000);
}

function updateLockoutMessage() {
    const seconds = getRemainingLockoutTime();
    signinMessage.textContent = `⏳ Too many failed attempts. Try again in ${seconds} seconds.`;
}

function startLockout() {
    const lockoutUntil = new Date().getTime() + LOCKOUT_DURATION;
    localStorage.setItem('lockoutTime', lockoutUntil);
    updateLockoutMessage();

    const interval = setInterval(() => {
        if (!isLockedOut()) {
            clearInterval(interval);
            signinMessage.textContent = "";
        } else {
            updateLockoutMessage();
        }
    }, 1000);
}

// Replace with real server validation
function mockCheckLogin(email, password) {
    const correctEmail = "user@example.com";
    const correctPassword = "Password123";
    return email === correctEmail && password === correctPassword;
}

if (signinForm) {
    signinForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (isLockedOut()) {
            updateLockoutMessage();
            return;
        }

        

        const rawEmail = document.getElementById('signinemail')?.value || '';
        const rawPassword = document.getElementById('signinpassword')?.value || '';
        const email = sanitizeInput(rawEmail);
        const password = sanitizeInput(rawPassword);

        if (mockCheckLogin(email, password)) {
            signinMessage.style.color = "red";
            signinMessage.textContent = "✅ Login successful!";
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('lockoutTime');
        } else {
            let attempts = parseInt(localStorage.getItem('loginAttempts')) || 0;
            attempts++;
            localStorage.setItem('loginAttempts', attempts);

            signinMessage.style.color = "red";
            if (attempts >= MAX_ATTEMPTS) {
                signinMessage.textContent = `🚫 Too many failed attempts. Locked out for 5 minutes.`;
                startLockout();
                localStorage.setItem('loginAttempts', 0);
            } else {
                signinMessage.textContent = `❌ Incorrect credentials. ${MAX_ATTEMPTS - attempts} attempt(s) left.`;
            }
        }
    });
}

window.addEventListener('load', () => {
    if (isLockedOut()) {
        startLockout();
    }
});