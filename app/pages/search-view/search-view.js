"use strict"

function search() {
    var BASE_URL = 'https://ltv-data-api.herokuapp.com/api/v1/';
    var email = document.getElementById('email').value;
    if (email === '') {
        // Error no email
        return;
    }

    window.location.href = '../result-view/result-view.html?email=' + email;
}