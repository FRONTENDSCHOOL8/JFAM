import { getStorage, setStorage } from '/src/js/storage';
import pb from '/src/js/pocketbase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const buttons = document.querySelectorAll('button');
  const userProfile = document.querySelector('.user-profile-wrapper');
  const logoutModal = document.querySelector('.logout-modal-wrapper');
  const signoutModal = document.querySelector('.signout-modal-wrapper');
  const userId = document.querySelector('.user-id');
  const localUser = await getStorage('auth');

  const [
    logoutButton,
    signoutButton,
    logoutConfirmButton,
    logoutCancelButton,
    signoutConfirmButton,
    signoutCancelButton,
  ] = buttons;

  // auth가 없다면 랜딩페이지로..
  if (!localUser.isAuth) {
    window.location.href = '/src/pages/landing/';
  }
  userId.textContent = localUser.data.username;

  const displayElement = (node, modify) => {
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
    displayElement(userProfile, 'none');
    displayElement(logoutModal, 'block');
  };
  const handleSignout = () => {
    displayElement(userProfile, 'none');
    displayElement(signoutModal, 'block');
  };
  const handleLogoutConfirm = () => {
    // 로그 아웃(로컬 스토리 데이터 제거)
    setStorage('auth', {
      isAuth: false,
      data: {},
    });
    window.location.href = '/src/pages/landing/index.html';
  };
  const handleLogoutCancel = () => {
    displayElement(userProfile, 'block');
    displayElement(logoutModal, 'none');
  };
  const handleSignoutConfirm = async () => {
    // 로그 아웃(로컬 스토리 저장된 아이디 불러오기)
    const currentId = localUser.id;
    deleteAccount(currentId);
    window.location.href = '/src/pages/landing/index.html';
  };
  const handleSignoutCancel = () => {
    displayElement(userProfile, 'block');
    displayElement(signoutModal, 'none');
  };

  logoutButton.addEventListener('click', handleLogout);
  signoutButton.addEventListener('click', handleSignout);
  logoutConfirmButton.addEventListener('click', handleLogoutConfirm);
  logoutCancelButton.addEventListener('click', handleLogoutCancel);
  signoutConfirmButton.addEventListener('click', handleSignoutConfirm);
  signoutCancelButton.addEventListener('click', handleSignoutCancel);
});
