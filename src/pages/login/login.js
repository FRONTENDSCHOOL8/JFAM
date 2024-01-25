import { setStorage, pb } from '/src/js/index.js';

const idInput = document.querySelector('.input-id'); // 이메일 입력하는 부분 태그
const idCondition = document.querySelector('.id-input-condition');
const pwInput = document.querySelector('.input-password'); // 비번 입력하는 부분 태그
const pwCondition = document.querySelector('.password-input-condition');
const loginForm = document.querySelector('#loginForm'); // 버튼 태그
const idModal = document.querySelector('.find-id');
const pwModal = document.querySelector('.find-password');
const modalContainer = document.querySelector('.modal-container');
const closeButton = document.querySelector('.closeButton');

// 정규식
function isValidID(text) {
  const idRegex = /^[a-zA-Z0-9]{6,12}$/;

  return idRegex.test(String(text).toLowerCase());
}

function isValidPassword(text) {
  const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  return passwordRegex.test(String(text).toLowerCase());
}

// 아이디, 비번 체크 함수
const getUser = async (userName, userPassword) => {
  // pocketbase 에서 일치한 유저 정보 가져오기
  try {
    const authData = await pb
      .collection('users')
      .authWithPassword(userName, userPassword);
    return authData;
  } catch (error) {
    window.alert(
      '일치하는 회원정보가 없습니다. 아이디, 비밀번호를 다시 확인해주세요.'
    );
    return false;
  }
};

function handleId(e) {
  if (isValidID(e.target.value)) {
    idCondition.textContent = '';
    return
  }

  idCondition.textContent = '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요.';

}

function handlePw(e) {
  if (isValidPassword(e.target.value)) {
    pwCondition.textContent = '';
    return;
  }

  pwCondition.textContent =
      '특수문자(~!@#$%^&*) 포함 6~16자리로 입력해주세요.';
}

async function handleSubmit(e) {
  // 폼의 기본 동작을 취소
  e.preventDefault();
  // 폼에서 폼 데이터를 추출
  const formData = new FormData(e.currentTarget);
  // 폼 데이터를 객체로 변환
  const values = Object.fromEntries(formData.entries());

  // setStorage 를 사용하여 저장
  if (isValidID(values.id) && isValidPassword(values.password)) {
    const user = await getUser(values.id, values.password);
    if (user) {
      await setStorage('auth', { isAuth: true, userData: user });
      window.location.href = '/src/pages/main/index.html';
    }
  } else {
    alert('아이디나 비밀번호 형식을 맞춰주세요.');
  }
}

function handleModal(e) {
  e.preventDefault();
  modalContainer.style.display = 'block';
}

function handleCloseModal(e) {
  e.preventDefault();
  modalContainer.style.display = 'none';
}

// 이벤트 부여
idInput.addEventListener('input', handleId);
pwInput.addEventListener('input', handlePw);
loginForm.addEventListener('submit', handleSubmit);
idModal.addEventListener('click', handleModal);
pwModal.addEventListener('click', handleModal);
closeButton.addEventListener('click', handleCloseModal);
