const buttonProfile = document.querySelector('.button-profile');

function signoutPopup(){
    console.log('이거 되나?');
    location.href = '/src/assets/pages/signout'
}

buttonProfile.addEventListener('click',signoutPopup);