/// <reference path="jquery-3.3.1.min.js" />

function getAccessToken() {
    if (location.hash) {
        if (location.hash.split('access_token=')) {
            var accessToken = location.hash.split('access_token=')[1].split('&')[0];
            if (accessToken) {
                isUserRegistered(accessToken);
            }
        }
    }
}

function isUserRegistered(accessToken) {
    console.log(accessToken);
    $.ajax({
        url: '/api/Account/UserInfo',
        method: 'GET',
        headers: {
            'content-type': 'application/JSON',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            if (response.HasRegistered) {
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('userName', response.Email);
                window.location.href = "Data.html";
            }
            else {
                signUpExternalUser(accessToken)
            }
        }
    });
}

function signUpExternalUser(accessToken) {
    $.ajax({
        url: '/api/Account/RegisterExternal',
        method: 'POST',
        headers: {
            'content-type': 'application/JSON',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            window.location.href = '/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A49857%2FLogin.html&state=M7-pQuD0AfTpjBmgXfav1uUMquAluLMnITTSVXD_J8Q1';
        }
    });
}