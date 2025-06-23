document.addEventListener('DOMContentLoaded', () => {
    const formsWrapper = document.getElementById('formsWrapper');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const mainContainer = document.getElementById('mainContainer'); // Reference to .login-container


    // Function to show the registration form (slide left)
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.matchMedia("(max-width: 768px)").matches) {
            // Mobile: Hide current, show target
            loginForm.classList.remove('active-mobile');
            registerForm.classList.add('active-mobile');
            // Mobile specific class for overall container (if needed for further mobile adjustments)
            mainContainer.classList.add('show-register-mobile');
            mainContainer.classList.remove('show-login-mobile');
        } else {
            // Desktop: Slide the wrapper and expand the container
            formsWrapper.classList.add('show-register');
            formsWrapper.classList.remove('show-login');
            mainContainer.classList.add('show-register-desktop'); // NEW: Add class to expand container
        }
    });

    // Function to show the login form (slide right)
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.matchMedia("(max-width: 768px)").matches) {
            // Mobile: Hide current, show target
            registerForm.classList.remove('active-mobile');
            loginForm.classList.add('active-mobile');
            // Mobile specific class for overall container (if needed for further mobile adjustments)
            mainContainer.classList.add('show-login-mobile');
            mainContainer.classList.remove('show-register-mobile');
        } else {
            // Desktop: Slide the wrapper and contract the container
            formsWrapper.classList.remove('show-register');
            formsWrapper.classList.add('show-login');
            mainContainer.classList.remove('show-register-desktop'); // NEW: Remove class to contract container
        }
    });

    // Initial state on load
    if (window.matchMedia("(max-width: 768px)").matches) {
        // For mobile, ensure only login form is visible on load
        loginForm.classList.add('active-mobile');
        registerForm.classList.remove('active-mobile');
        mainContainer.classList.add('show-login-mobile');
    } else {
        // For desktop, ensure login form is correctly positioned initially
        formsWrapper.classList.add('show-login');
        mainContainer.classList.remove('show-register-desktop'); // Ensure it starts at login height
    }
});