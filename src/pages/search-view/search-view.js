"use strict"

function search() {
    var floatingLabel = document.getElementById('floating-label');
    var emailElement = document.getElementById('email');
    var email = emailElement.value;
    if (email === '') {
        return;
    }

    if (!validateEmail(email)) {
        floatingLabel.style.color = 'red';
        floatingLabel.innerHTML = 'Please provide a valid email';
        emailElement.className = 'search-input-error';
        return;
    }

    floatingLabel.style.color = 'gray';
    emailElement.className = 'search-input';
    window.location.href = '../result-view/result-view.html?email=' + email;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}