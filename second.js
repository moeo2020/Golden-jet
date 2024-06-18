
const switchToRegisterLink = document.getElementById('switch-to-register');
const switchToLoginLink = document.getElementById('switch-to-login');
const loginFormContainer = document.querySelector('.container:nth-of-type(1)');
const registerFormContainer = document.querySelector('.container:nth-of-type(2)');

switchToRegisterLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginFormContainer.style.display = 'none';
    registerFormContainer.style.display = 'block';
});

switchToLoginLink.addEventListener('click', function(event) {
    event.preventDefault();
    registerFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
});
