import {
  getStorage,
  setStorage,
  getNodes,
  changeTextContent,
  getNode,
  pb,
} from '/src/js/index.js';

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

  /**
   * @param node{HTMLElement}
   */
  const show = (node) => {
    const element = node;
    element.hidden = false;
  }

  /**
   * @param node{HTMLElement}
   */
  const hide = (node) => {
    const element = node;
    element.hidden = true;
  }

  const deleteAccount = async (recordId) => {
    try {
      await pb.collection('users').delete(recordId);
      alert('회원탈퇴가 완료되었습니다.');
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    hide(userProfile);
    show(logoutModal);
  };

  const handleSignout = () => {
    hide(userProfile);
    show(signoutModal);
  };

  const handleLogoutConfirm = () => {
    setStorage('auth', {
      isAuth: false,
      data: {},
    });
    window.location.href = '/src/pages/landing/index.html';
  };

  const handleLogoutCancel = () => {
    show(userProfile);
    hide(logoutModal);
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
    show(userProfile);
    hide(signoutModal);
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
