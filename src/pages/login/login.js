import pb from '/src/js/pocketbase.js';
import { getStorage, setStorage } from '/src/js/storage.js';

const idInput = document.querySelector('.input-id'); // 이메일 입력하는 부분 태그
const idCondition = document.querySelector('.id-input-condition');
const pwInput = document.querySelector('.input-password'); // 비번 입력하는 부분 태그
const pwCondition = document.querySelector('.password-input-condition');
const btnTag = document.querySelector('.login-button'); // 버튼 태그
const checkButton = document.querySelector('.auto-login-img');

let idCheck = false;
let pwCheck = false;

// 정규식

function idReg(text) {
  const re = /^[a-zA-Z0-9]{6,12}$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

// 아이디, 비번 체크 함수

const isAuthentication = async (userName, userPassword) => {
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
  if (idCheck && pwCheck) {
    e.preventDefault();
    const userData = await isAuthentication(idInput.value, pwInput.value);
    if (userData) {
      // console.log('성공!');
      // setStorage('auth', {
      //   isAuth: true,
      //   data: userData,
      // });

      console.log(getStorage('auth'));
    } else {
      console.log(
        '일치하는 회원정보가 없습니다. 아이디, 비밀번호를 다시 확인해주세요.'
      );
    }
  } else {
    console.log('아이디나 비밀번호 형식을 맞춰주세요.');
  }
}

function handleChecked() {
  if (checkButton.id === 'auto-unchecked') {
    checkButton.src = '/src/assets/signup/check_filled_blue.svg';
    checkButton.id = 'auto-checked';
    checkButton.alt = '체크박스 활성화';
  } else {
    checkButton.src = '/src/assets/signup/check_filled_white.svg';
    checkButton.id = 'auto-unchecked';
    checkButton.alt = '체크박스 비활성화';
  }
}

// 이벤트 부여
idInput.addEventListener('input', handleId);
pwInput.addEventListener('input', handlePw);
btnTag.addEventListener('click', handleBtn);
checkButton.addEventListener('click', handleChecked);
