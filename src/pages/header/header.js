const buttonProfile = document.querySelector('.button-profile');

function signoutPopup(){
    location.href = '/src/assets/pages/login/'
}

buttonProfile.addEventListener('click',signoutPopup);