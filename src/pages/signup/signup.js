import pb from '/src/js/pocketbase.js';

const input = document.querySelectorAll('.form-input');
const check = document.querySelectorAll('.form-check');
const span = document.querySelectorAll('.span-condition');
const buttonShowPassword = document.querySelectorAll('.button-show');
const buttonEraseInput = document.querySelectorAll('.button-erase');

const [inputId, inputPassword, inputPasswordCheck, inputEmail] = input;

const [
  checkboxAll,
  checkboxAge,
  checkboxTerms,
  checkboxCollection,
  checkboxProvisionHomepage,
  checkboxProvision,
  checkboxMarketing,
  checkboxSNS,
  checkboxEmail,
] = check;

const [conditionId, conditionPassword, conditionPasswordCheck, conditionEmail] =
  span;

// const [showPassword, showPasswordCheck] = buttonShowPassword;

const [
  eraseInputId,
  eraseInputPassword,
  eraseInputPasswordCheck,
  eraseInputEmail,
] = buttonEraseInput;

const regex = {
  regexId: /^[a-zA-Z0-9]{6,12}$/,
  regexPassword: /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
  regexEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
};

const userStatus = {
  id: false,
  password: false,
  passwordCheck: false,
  email: false,
};

const isValid = (userInput, boolean) => {
  if (userInput && boolean) {
    userStatus[userInput] = boolean;
  }
};

const isDuplicationId = async (userId) => {
  try {
    await pb.collection('users').getFirstListItem(`username="${userId}"`);
    return true;
  } catch (error) {
    return false;
  }
};

const handleInputId = async (event) => {
  event.preventDefault();
  const idValue = inputId.value;
  eraseInputId.classList.add('has-input');
  if (idValue === '') {
    conditionId.textContent = '입력한 내용이 없어요.';
    conditionId.classList.add('warning');
    eraseInputId.classList.remove('is-checked');
    isValid('id', false);
  } else if (!regex.regexId.test(idValue)) {
    conditionId.textContent =
      '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요.';
    conditionId.classList.add('warning');
    isValid('id', false);
  } else if (isDuplicationId(idValue)) {
    conditionId.textContent = '이미 사용 중인 아이디입니다.';
    conditionId.classList.add('warning');
    isValid('id', false);
    console.log(isDuplicationId(idValue));
  } else {
    conditionId.textContent = '';
    isValid('id', true);
  }
};

const handleInputPassword = () => {
  const passwordValue = inputPassword.value;
  eraseInputPassword.classList.add('has-input');
  if (passwordValue === '') {
    conditionPassword.textContent = '입력한 내용이 없어요.';
    conditionPassword.classList.add('warning');
    eraseInputPassword.classList.remove('is-checked');
    isValid('password', false);
  } else if (!regex.regexPassword.test(passwordValue)) {
    conditionPassword.textContent =
      '특수문자(~!@#$%^&*) 포함 6~16자리로 입력해주세요.';
    console.log(passwordValue);
    conditionPassword.classList.add('warning');
    isValid('password', false);
  } else {
    conditionPassword.textContent = '';
    isValid('password', true);
  }
  console.log(userStatus.password);
};

const handleInputPasswordCheck = () => {
  const passwordCheckValue = inputPasswordCheck.value;
  eraseInputPasswordCheck.classList.add('has-input');
  if (passwordCheckValue === '') {
    conditionPasswordCheck.textContent = '입력한 내용이 없어요.';
    conditionPasswordCheck.classList.add('warning');
    isValid('passwordCheck', false);
  } else if (passwordCheckValue !== inputPassword.value) {
    conditionPasswordCheck.textContent =
      '일치하지 않습니다. 다시 입력해주세요.';
    conditionPasswordCheck.classList.add('warning');
    isValid('passwordCheck', false);
  } else {
    conditionPasswordCheck.textContent = '';
    isValid('passwordCheck', true);
  }
};

const handleInputEmail = () => {
  const emailValue = inputEmail.value;
  eraseInputEmail.classList.add('has-input');
  if (emailValue === '') {
    conditionEmail.textContent = '입력한 내용이 없어요.';
    conditionEmail.classList.add('warning');
  } else if (!regex.regexEmail.test(emailValue)) {
    conditionEmail.textContent =
      '이메일 형식이 맞지 않습니다. 다시 입력해 주세요.';
    conditionEmail.classList.add('warning');
  } else {
    conditionEmail.textContent = '';
  }
};

const handlePasswordShow = (e) => {
  const selectedInputNode = e.target.parentNode.children[1];
  const selectedButton = e.target;
  if (selectedInputNode.type === 'text') {
    selectedInputNode.type = 'password';
    selectedButton.classList.remove('is-checked');
  } else {
    selectedInputNode.type = 'text';
    selectedButton.classList.add('is-checked');
  }
};

const handleEraseInput = (e) => {
  const selectedSiblingNodes = e.target.parentNode.children;
  const selectedInputNode = selectedSiblingNodes[1];
  const selectedButtonNode = selectedSiblingNodes[2];
  const selectedSpanNode =
    selectedSiblingNodes[selectedSiblingNodes.length - 1];
  selectedInputNode.value = '';
  selectedButtonNode.classList.remove('has-input');
  selectedSpanNode.textContent = '입력한 내용이 없어요.';
};

const handleAgreeAll = (e) => {
  if (e.target.checked === true) {
    check.forEach((node) => {
      const checkNode = node;
      checkNode.checked = true;
    });
  } else {
    check.forEach((node) => {
      const checkNode = node;
      checkNode.checked = false;
    });
  }
};

const handleAgreeMarketing = (e) => {
  if (e.target.checked === true) {
    checkboxSNS.checked = true;
    checkboxEmail.checked = true;
  } else {
    checkboxSNS.checked = false;
    checkboxEmail.checked = false;
  }
};

inputId.addEventListener('keyup', handleInputId);
inputPassword.addEventListener('keyup', handleInputPassword);
inputPasswordCheck.addEventListener('keyup', handleInputPasswordCheck);
inputEmail.addEventListener('keyup', handleInputEmail);
buttonShowPassword.forEach((node) => {
  node.addEventListener('click', handlePasswordShow);
});
buttonEraseInput.forEach((node) => {
  node.addEventListener('click', handleEraseInput);
});
checkboxAll.addEventListener('click', handleAgreeAll);
checkboxMarketing.addEventListener('click', handleAgreeMarketing);
