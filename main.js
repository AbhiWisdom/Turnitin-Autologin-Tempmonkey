// ==UserScript==
// @name         Add Button Example with Corrected Selectors
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a button to a webpage as an example
// @author       You
// @match        https://www.turnitin.com/login_page.asp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Simulate login function
    function simulateLogin() {
        const usernameField = document.querySelector('#email');
        const passwordField = document.querySelector('#password');
        // Updated to select the submit button by its class
        const loginButton = document.querySelector('input.submit[type="submit"]');

        if (usernameField && passwordField && loginButton) {
            usernameField.value = 't'; // Placeholder email
            passwordField.value = ''; // Placeholder password

            loginButton.click(); // Trigger a click on the login button
        } else {
            console.error('Login fields not found');
        }
    }

    // Create and style the login button
    const button = document.createElement('button');
    button.textContent = 'Quick Login';
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.padding = '10px';
    button.style.zIndex = '10000';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Add the button to the page
    document.body.appendChild(button);

    // Add event listener for the button
    button.addEventListener('click', simulateLogin);
})();
