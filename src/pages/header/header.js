const buttonProfile = document.querySelector('.button-profile');

function signoutPopup(){
    window.location.href = '/src/pages/login/index.html'
}

buttonProfile.addEventListener('click',signoutPopup);