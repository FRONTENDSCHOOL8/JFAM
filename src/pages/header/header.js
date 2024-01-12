const buttonProfile = document.querySelector('.button-profile');

function signoutPopup(){
    location.href = '/src/pages/login/index.html'
}

buttonProfile.addEventListener('click',signoutPopup);