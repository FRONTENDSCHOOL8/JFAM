import pb from '/src/js/pocketbase.js';

const input = document.querySelectorAll('.form-input');
const check = document.querySelectorAll('.form-check');
const span = document.querySelectorAll('.span-condition');
const buttonShowPassword = document.querySelectorAll('.button-show');
const buttonEraseInput = document.querySelectorAll('.button-erase');
const buttonSubmit = document.querySelector('.button-signup-submit');

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

const setValid = (userInput, boolean) => {
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

const changeConditionMessage = (node, message) => {
  const nodeElement = node;
  nodeElement.textContent = message;
};

const setClassList = (node, modify, className) => {
  const nodeElement = node;
  if (modify === 'add') {
    nodeElement.classList.add(className);
  } else if (modify === 'remove') {
    nodeElement.classList.remove(className);
  } else {
    throw new Error('setClassList 함수의 modify는 add 또는 remove 입니다');
  }
};

const handleInputId = async (event) => {
  event.preventDefault();
  const idValue = inputId.value;
  setClassList(eraseInputId, 'add', 'has-input');
  if (idValue === '') {
    changeConditionMessage(conditionId, '입력한 내용이 없어요.');
    setClassList(conditionId, 'add', 'warning');
    setClassList(eraseInputId, 'remove', 'has-input');
    setValid('id', false);
  } else if (!regex.regexId.test(idValue)) {
    changeConditionMessage(
      conditionId,
      '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요.'
    );
    setClassList(conditionId, 'add', 'warning');
    setValid('id', false);
  } else if (await isDuplicationId(idValue)) {
    changeConditionMessage(conditionId, '이미 사용 중인 아이디입니다.');
    setClassList(conditionId, 'add', 'warning');
    setValid('id', false);
  } else {
    changeConditionMessage(conditionId, '');
    setValid('id', true);
  }
};

const handleInputPassword = () => {
  const passwordValue = inputPassword.value;
  eraseInputPassword.classList.add('has-input');
  if (passwordValue === '') {
    changeConditionMessage(conditionPassword, '입력한 내용이 없어요.');
    setClassList(conditionPassword, 'add', 'warning');
    setClassList(eraseInputPassword, 'remove', 'has-input');
    setValid('password', false);
  } else if (!regex.regexPassword.test(passwordValue)) {
    changeConditionMessage(
      conditionPassword,
      '특수문자(~!@#$%^&*) 포함 6~16자리로 입력해주세요.'
    );
    setClassList(conditionPassword, 'add', 'warning');
    setValid('password', false);
  } else {
    changeConditionMessage(conditionPassword, '');
    setValid('password', true);
  }
};

const handleInputPasswordCheck = () => {
  const passwordCheckValue = inputPasswordCheck.value;
  eraseInputPasswordCheck.classList.add('has-input');
  if (passwordCheckValue === '') {
    changeConditionMessage(conditionPasswordCheck, '입력한 내용이 없어요.');
    setClassList(conditionPasswordCheck, 'add', 'warning');
    setClassList(eraseInputPasswordCheck, 'remove', 'has-input');
    setValid('passwordCheck', false);
  } else if (passwordCheckValue !== inputPassword.value) {
    changeConditionMessage(
      conditionPasswordCheck,
      '일치하지 않습니다. 다시 입력해주세요.'
    );
    setClassList(conditionPasswordCheck, 'add', 'warning');
    setValid('passwordCheck', false);
  } else {
    changeConditionMessage(conditionPasswordCheck, '');
    setValid('passwordCheck', true);
  }
};

const handleInputEmail = () => {
  const emailValue = inputEmail.value;
  eraseInputEmail.classList.add('has-input');
  if (emailValue === '') {
    changeConditionMessage(conditionEmail, '입력한 내용이 없어요.');
    setClassList(conditionEmail, 'add', 'warning');
    setClassList(eraseInputEmail, 'remove', 'has-input');
    setValid('email', false);
  } else if (!regex.regexEmail.test(emailValue)) {
    changeConditionMessage(
      conditionEmail,
      '이메일 형식이 맞지 않습니다. 다시 입력해 주세요.'
    );
    setClassList(conditionEmail, 'add', 'warning');
    setValid('email', false);
  } else {
    changeConditionMessage(conditionEmail, '');
    setValid('email', true);
  }
};

const handlePasswordShow = (e) => {
  const selectedInputNode = e.target.parentNode.children[1];
  const selectedButton = e.target;
  if (selectedInputNode.type === 'text') {
    selectedInputNode.type = 'password';
    setClassList(selectedButton, 'remove', 'is-checked');
  } else {
    selectedInputNode.type = 'text';
    setClassList(selectedButton, 'add', 'is-checked');
  }
};

const handleEraseInput = (e) => {
  const selectedSiblingNodes = e.target.parentNode.children;
  const selectedInputNode = selectedSiblingNodes[1];
  const selectedButtonNode = selectedSiblingNodes[2];
  const selectedSpanNode =
    selectedSiblingNodes[selectedSiblingNodes.length - 1];
  selectedInputNode.value = '';
  setClassList(selectedButtonNode, 'remove', 'has-input');
  changeConditionMessage(selectedSpanNode, '입력한 내용이 없어요.');
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
