import { getStorage, setStorage } from '/src/js/storage.js';
import { getNodes, changeTextContent, getNode } from '/src/js/common.js';
import pb from '/src/js/pocketbase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const buttons = getNodes('button');
  const userProfile = getNode('.user-profile-wrapper');
  const logoutModal = getNode('.logout-modal-wrapper');
  const signoutModal = getNode('.signout-modal-wrapper');
  const userId = getNode('.user-id');
  const localUser = await getStorage('auth');

  const [
    logoutButton,
    signoutButton,
    logoutConfirmButton,
    logoutCancelButton,
    signoutConfirmButton,
    signoutCancelButton,
  ] = buttons;

  const controlDisplay = (node, modify) => {
    const element = node;
    element.style.display = modify;
  };

  const deleteAccount = async (recordId) => {
    try {
      await pb.collection('users').delete(recordId);
      alert('회원탈퇴가 완료되었습니다.');
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    controlDisplay(userProfile, 'none');
    controlDisplay(logoutModal, 'block');
  };

  const handleSignout = () => {
    controlDisplay(userProfile, 'none');
    controlDisplay(signoutModal, 'block');
  };

  const handleLogoutConfirm = () => {
    setStorage('auth', {
      isAuth: false,
      data: {},
    });
    window.location.href = '/src/pages/landing/index.html';
  };

  const handleLogoutCancel = () => {
    controlDisplay(userProfile, 'block');
    controlDisplay(logoutModal, 'none');
  };

  const handleSignoutConfirm = async () => {
    const currentId = localUser.userData.record.id;
    deleteAccount(currentId)
      .then(() => {
        setStorage('auth', {
          isAuth: false,
          data: {},
        });
      })
      .then(() => {
        window.location.href = '/src/pages/landing/index.html';
      });
  };

  const handleSignoutCancel = () => {
    controlDisplay(userProfile, 'block');
    controlDisplay(signoutModal, 'none');
  };

  if (!localUser.isAuth) {
    window.location.href = '/src/pages/landing/';
  } else {
    changeTextContent(userId, localUser.userData.record.username);
  }

  logoutButton.addEventListener('click', handleLogout);
  signoutButton.addEventListener('click', handleSignout);
  logoutConfirmButton.addEventListener('click', handleLogoutConfirm);
  logoutCancelButton.addEventListener('click', handleLogoutCancel);
  signoutConfirmButton.addEventListener('click', handleSignoutConfirm);
  signoutCancelButton.addEventListener('click', handleSignoutCancel);
});
