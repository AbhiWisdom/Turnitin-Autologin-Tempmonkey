// ==UserScript==
// @name         Auto Login for Turnitin with User-Provided Access Key
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Automatically log in to Turnitin by fetching credentials with a user-provided access key
// @author       
// @match        https://www.turnitin.com/login_page.asp*
// @grant        GM_xmlhttpRequest
// @connect      tur.abhiraj.shop
// ==/UserScript==

(function() {
    'use strict';

    // Default prefix for the key
    const keyPrefix = 'sk-';

    // Prompt the user for the access key
    let userKey = prompt('Enter your access key:');

    // Check if user provided a key
    if (!userKey) {
        console.error('No access key provided by user.');
        alert('Access key is required to login automatically.');
        return;
    }

    // Append the key prefix
    let fullKey = keyPrefix + userKey;
    console.log('Full access key:', fullKey);

    // Construct URL to fetch encrypted credentials
    const credentialsURL = `https://tur.abhiraj.shop/index.php?key=${fullKey}`;

    // Function to perform the login action
    function autoLogin(credentials) {
        const usernameField = document.querySelector('#email');
        const passwordField = document.querySelector('#password');
        const loginButton = document.querySelector('input[type="submit"]');

        if (usernameField && passwordField && loginButton) {
            usernameField.value = credentials.email;
            passwordField.value = credentials.password;

            // Click the login button to submit the form
            loginButton.click();
        } else {
            console.error('One or more login form elements not found.');
        }
    }

    // Function to fetch and decrypt credentials
    function fetchCredentials() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: credentialsURL,
            onload: function(response) {
                if (response.status === 200) {
                    try {
                        const responseData = JSON.parse(response.responseText);
                        if (responseData.email && responseData.password) {
                            autoLogin(responseData);
                        } else {
                            console.error('Invalid credentials format received.');
                        }
                    } catch (e) {
                        console.error('Failed to parse credentials JSON:', e);
                    }
                } else {
                    console.error('Failed to fetch credentials:', response.statusText);
                }
            },
            onerror: function(error) {
                console.error('Error fetching credentials:', error);
            }
        });
    }

    // Check if the current URL matches the login page of the site
    if (window.location.href.includes('www.turnitin.com/login_page.asp')) {
        // Delay the auto-login to allow page elements to fully load
        setTimeout(fetchCredentials, 2000); // Added a small delay of 2 seconds
    }
})();
