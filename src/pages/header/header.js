import {getNode} from '/src/js/common.js';
import { getStorage } from '/src/js/storage';

const buttonProfile = getNode('.button-profile');

function signoutPopup() {
  window.location.href = '/src/pages/profile/';
}

    if(!getStorage('auth')){
        getNode('.button-profile').style.display = 'block';
    }

buttonProfile.addEventListener('click',signoutPopup);
