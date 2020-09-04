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

function getPersonData() {
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
            alert('Could not find data for that email. Please try again using another email');
            window.location.href = '/src/pages/search-view/search-view.html';
            return;
        }

        setPersonData(JSON.parse(Http.responseText));
    }  
}

function setPersonData(personData) {
    document.getElementById('name').innerHTML = `${personData.first_name} ${personData.last_name}`;
    document.getElementById('description').innerHTML = personData.description;
    document.getElementById('address').innerHTML = personData.address;
    document.getElementById('person-email').innerHTML = personData.email; 
    
    var ul = document.getElementById("phone-numbers");
    ul.innerHTML = '';
    for( var i = 0; i < personData.phone_numbers.length; i++ ) { 
        var obj = personData.phone_numbers[i];
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(obj));
        ul.appendChild(li);     
    }

    var ul = document.getElementById("relatives");
    ul.innerHTML = '';
    for( var i = 0; i < personData.relatives.length; i++ ) { 
        var obj = personData.relatives[i];
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(obj));
        ul.appendChild(li);     
    }
}

getPersonData();