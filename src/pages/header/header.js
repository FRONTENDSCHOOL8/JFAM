const buttonProfile = document.querySelector('.button-profile');

function signoutPopup(){
    window.location.href = '/src/pages/profile/'
}

buttonProfile.addEventListener('click',signoutPopup);