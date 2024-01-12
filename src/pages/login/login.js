// import pb from '/src/js/pocketbase.js';

const idInput = document.querySelector('.input-id'); // 이메일 입력하는 부분 태그
const idCondition = document.querySelector('.id-input-condition');
const pwInput = document.querySelector('.input-password'); // 비번 입력하는 부분 태그
const pwCondition = document.querySelector('.password-input-condition');
const btnTag = document.querySelector('.login-button'); // 버튼 태그
const checkButton = document.querySelector('.auto-login-img');
// const unCheckButton = document.getElementById('.');

let idCheck = false;
let pwCheck = false;
// let isImage1Visible = true;

// // 객체

const user = {
  id: 'frontend',
  pw: 'spdlqj123!@',
};

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

function handleId() {
  // const tag = e.target;
  // const idCheck = idReg(tag.value);
  idCheck = idReg(idInput.value);
  console.log(idCheck);

  if (idCheck) {
    idCondition.textContent = '';
  } else {
    idCondition.textContent =
      '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요.';
  }
  // idValid(tag.value, IdInput);
  // visitor.id = tag.value;
}

function handlePw(e) {
  const tag = e.target;
  pwCheck = pwReg(tag.value);

  console.log(pwCheck);

  if (pwCheck) {
    pwCondition.textContent = '';
  } else {
    pwCondition.textContent =
      '특수문자(~!@#$%^&*) 포함 6~16자리로 입력해주세요.';
  }
}

function handleBtn(e) {
  e.preventDefault();
  if (idCheck && pwCheck) {
    if (user.id === idInput.value && user.pw === pwInput.value) {
      console.log('로그인 성공!');
    } else {
      console.log('아이디나 비밀번호가 틀렸습니다.');
    }
  } else {
    console.log('잘못 작성하셨습니다.');
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
// imageContainer.addEventListener('click', function () {
//   if (isImage1Visible) {
//     image1.style.display = 'none';
//     image2.style.display = 'block';
//   } else {
//     image1.style.display = 'block';
//     image2.style.display = 'none';
//   }
// });
checkButton.addEventListener('click', handleChecked);
