import { setStorage, pb } from '/src/js/index.js';

const idInput = document.querySelector('.input-id'); // 이메일 입력하는 부분 태그
const idCondition = document.querySelector('.id-input-condition');
const pwInput = document.querySelector('.input-password'); // 비번 입력하는 부분 태그
const pwCondition = document.querySelector('.password-input-condition');
const btnTag = document.querySelector('.login-button'); // 버튼 태그
const checkButton = document.querySelector('.auto-login-img');
const idModal = document.querySelector('.find-id');
const pwModal = document.querySelector('.find-password');
const modalContainer = document.querySelector('.modal-container');
const closeButton = document.querySelector('.closeButton');

let idCheck = false;
let pwCheck = false;

// 정규식
function idReg(text) {
  const re = /^[a-zA-Z0-9]{6,12}$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  return re.test(String(text).toLowerCase());
}

// 아이디, 비번 체크 함수

const isAuthentication = async (userName, userPassword) => {
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

function handleId() {
  idCheck = idReg(idInput.value);

  if (idCheck) {
    idCondition.textContent = '';
  } else {
    idCondition.textContent =
      '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요.';
  }
}

function handlePw(e) {
  const tag = e.target;
  pwCheck = pwReg(tag.value);

  if (pwCheck) {
    pwCondition.textContent = '';
  } else {
    pwCondition.textContent =
      '특수문자(~!@#$%^&*) 포함 6~16자리로 입력해주세요.';
  }
}

async function handleBtn(e) {
  // setStorage 를 사용하여 저장
  if (idCheck && pwCheck) {
    e.preventDefault();
    const userData = await isAuthentication(idInput.value, pwInput.value);
    if (userData) {
      setStorage('auth', {
        isAuth: true,
        userData,
      });
      window.location.href = '/src/pages/main/index.html';
    }
  } else {
    alert('아이디나 비밀번호 형식을 맞춰주세요.');
  }
}

function handleChecked() {
  if (checkButton.id === 'auto-unchecked') {
    checkButton.src = '/images/check_filled_blue.svg';
    checkButton.id = 'auto-checked';
    checkButton.alt = '체크박스 활성화';
  } else {
    checkButton.src = '/images/check_filled_white.svg';
    checkButton.id = 'auto-unchecked';
    checkButton.alt = '체크박스 비활성화';
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
btnTag.addEventListener('click', handleBtn);
checkButton.addEventListener('click', handleChecked);
idModal.addEventListener('click', handleModal);
pwModal.addEventListener('click', handleModal);
closeButton.addEventListener('click', handleCloseModal);
