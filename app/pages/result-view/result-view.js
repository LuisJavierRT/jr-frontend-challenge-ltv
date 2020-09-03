"use strict"

var getPersonData = function() {
    var BASE_URL = 'https://ltv-data-api.herokuapp.com/api/v1/';
    
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var email = urlParams.get('email')
    var requestUrl = `${BASE_URL}records.json?email=${email}`;
    var Http = new XMLHttpRequest();
    Http.open('GET', requestUrl);
    Http.send();
    Http.onreadystatechange = function(e) {
        if (!Http.responseText) {
            return;
        }
        
        if (Http.responseText === '[]') {
            console.log('Could not find email');
            return;
        }

        console.log('DATA', Http.responseText);
    }  
}

getPersonData();