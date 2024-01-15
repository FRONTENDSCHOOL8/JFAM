import {getNode} from '/src/js/common.js';
// import { getStorage } from '/src/js/storage';

const buttonProfile = getNode('.button-profile');

// auth 확인 코드 추가, eslint ! 중복사용 오류 있음
if(!!localStorage.getItem('auth')){
  buttonProfile.style.display = 'block';
}

function signoutPopup() {
  window.location.href = '/src/pages/profile/';
}

buttonProfile.addEventListener('click',signoutPopup);