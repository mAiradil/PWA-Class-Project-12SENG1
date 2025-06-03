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
 * VALIDATION FOR SIGNUP
 **************/
function validateEmail() {
    const emailInput = document.getElementById('signupemail');
    return emailInput && emailInput.value.includes('@');
}

function validatePassword(input = null) {
    const pwd = input !== null ? input : document.getElementById('signuppassword')?.value;
    if (!pwd) return false;

    const hasLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumberOrSpecial = /[0-9\W_]/.test(pwd);
    const noTripleRepeat = !/(.)\1\1/.test(pwd);

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
    document.getElementById('signuppassword').addEventListener('input', () => {
        const passwordValid = validatePassword();
        const emailValid = validateEmail();
        document.querySelector('button[type="submit"]').disabled = !(passwordValid && emailValid);
    });

    document.getElementById('signupemail').addEventListener('input', () => {
        const passwordValid = validatePassword();
        const emailValid = validateEmail();
        document.querySelector('button[type="submit"]').disabled = !(passwordValid && emailValid);
    });

    // Signup form submission
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

        const email = document.getElementById('signinemail').value;
        const password = document.getElementById('signinpassword').value;

        if (mockCheckLogin(email, password)) {
            signinMessage.style.color = "green";
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
