import pb from '/src/js/pocketbase.js';

const buttons = document.querySelectorAll('button');
const userProfile = document.querySelector('.user-profile-wrapper');
const logoutModal = document.querySelector('.logout-modal-wrapper');
const signoutModal = document.querySelector('.signout-modal-wrapper');

const [
  logoutButton,
  signoutButton,
  logoutConfirmButton,
  logoutCancelButton,
  signoutConfirmButton,
  signoutCancelButton,
] = buttons;

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
  window.location.href = '/src/pages/landing/index.html';
};
const handleLogoutCancel = () => {
  displayElement(userProfile, 'block');
  displayElement(logoutModal, 'none');
};
const handleSignoutConfirm = async () => {
  // 로그 아웃(로컬 스토리 저장된 아이디 불러오기)
  const currentId = 'leo9e7lqc8dsf12';
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
