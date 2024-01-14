import { getNode } from '/src/js/common.js';

const buttonProfile = getNode('.button-profile');

function signoutPopup() {
  window.location.href = '/src/pages/profile/';
}

buttonProfile.addEventListener('click', signoutPopup);
