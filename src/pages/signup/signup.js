import pb from '/src/js/pocketbase.js';

const input = document.querySelectorAll('.form-input');
const check = document.querySelectorAll('.form-check');
const span = document.querySelectorAll('.span-condition');
const buttonShowPassword = document.querySelectorAll('.button-show');
const buttonEraseInput = document.querySelectorAll('.button-erase');
const signupForm = document.querySelector('.signup-form');
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

const checkValid = {
  id: false,
  password: false,
  passwordCheck: false,
  email: false,
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

// const handleInputId = async () => {
//   const idValue = inputId.value;
//   setClassList(eraseInputId, 'add', 'has-input');
//   if (idValue.trim() === '') {
//     changeConditionMessage(conditionId, '입력한 내용이 없어요.');
//     setClassList(conditionId, 'add', 'warning');
//     setClassList(eraseInputId, 'remove', 'has-input');
//   } else if (!regex.regexId.test(idValue)) {
//     changeConditionMessage(
//       conditionId,
//       '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요.'
//     );
//     setClassList(conditionId, 'add', 'warning');
//   } else if (await isDuplicationId(idValue)) {
//     changeConditionMessage(conditionId, '이미 사용 중인 아이디입니다.');
//     setClassList(conditionId, 'add', 'warning');
//   } else {
//     changeConditionMessage(conditionId, '');
//   }
// };

// const handleInputPassword = () => {
//   const passwordValue = inputPassword.value;
//   eraseInputPassword.classList.add('has-input');
//   if (passwordValue === '') {
//     changeConditionMessage(conditionPassword, '입력한 내용이 없어요.');
//     setClassList(conditionPassword, 'add', 'warning');
//     setClassList(eraseInputPassword, 'remove', 'has-input');
//   } else if (!regex.regexPassword.test(passwordValue)) {
//     changeConditionMessage(
//       conditionPassword,
//       '특수문자(~!@#$%^&*) 포함 6~16자리로 입력해주세요.'
//     );
//     setClassList(conditionPassword, 'add', 'warning');
//   } else {
//     changeConditionMessage(conditionPassword, '');
//   }
// };
// const handleInputPasswordCheck = () => {
//   const passwordCheckValue = inputPasswordCheck.value;
//   eraseInputPasswordCheck.classList.add('has-input');
//   if (passwordCheckValue === '') {
//     changeConditionMessage(conditionPasswordCheck, '입력한 내용이 없어요.');
//     setClassList(conditionPasswordCheck, 'add', 'warning');
//     setClassList(eraseInputPasswordCheck, 'remove', 'has-input');
//   } else if (passwordCheckValue !== inputPassword.value) {
//     changeConditionMessage(
//       conditionPasswordCheck,
//       '일치하지 않습니다. 다시 입력해주세요.'
//     );
//     setClassList(conditionPasswordCheck, 'add', 'warning');
//   } else {
//     changeConditionMessage(conditionPasswordCheck, '');
//   }
// };

// const handleInputEmail = () => {
//   const emailValue = inputEmail.value;
//   eraseInputEmail.classList.add('has-input');
//   if (emailValue === '') {
//     changeConditionMessage(conditionEmail, '입력한 내용이 없어요.');
//     setClassList(conditionEmail, 'add', 'warning');
//     setClassList(eraseInputEmail, 'remove', 'has-input');
//   } else if (!regex.regexEmail.test(emailValue)) {
//     changeConditionMessage(
//       conditionEmail,
//       '이메일 형식이 맞지 않습니다. 다시 입력해 주세요.'
//     );
//     setClassList(conditionEmail, 'add', 'warning');
//   } else {
//     changeConditionMessage(conditionEmail, '');
//   }
// };

// const manageCondition = (Condition) => {
//   setClassList(eraseInputId, 'add', 'has-input');
//   switch (Condition) {
//     case 'empty':
//       changeConditionMessage(conditionId, '입력한 내용이 없어요.');
//       setClassList(conditionId, 'add', 'warning');
//       setClassList(eraseInputId, 'remove', 'has-input');
//       break;

//     case 'invalidId':
//       changeConditionMessage(
//         conditionId,
//         '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요.'
//       );
//       setClassList(conditionId, 'add', 'warning');
//       break;

//     case 'invalidPassword':
//       changeConditionMessage(
//         conditionPassword,
//         '특수문자(~!@#$%^&*) 포함 6~16자리로 입력해주세요.'
//       );
//       setClassList(conditionPassword, 'add', 'warning');
//       break;
//     case 'invalidEmail':
//       changeConditionMessage(
//         conditionEmail,
//         '이메일 형식이 맞지 않습니다. 다시 입력해 주세요.'
//       );
//       setClassList(conditionEmail, 'add', 'warning');
//       break;

//     case 'duplicationId':
//       changeConditionMessage(conditionId, '이미 사용 중인 아이디입니다.');
//       setClassList(conditionId, 'add', 'warning');
//       break;

//     case 'notMatchedPassword':
//       changeConditionMessage(
//         conditionPasswordCheck,
//         '일치하지 않습니다. 다시 입력해주세요.'
//       );
//       setClassList(conditionPasswordCheck, 'add', 'warning');
//       break;
//     case 'validId':
//       changeConditionMessage(conditionId, '');
//       break;
//     case 'validPassword':
//       changeConditionMessage(conditionPassword, '');
//       break;
//     case 'validPasswordCheck':
//       changeConditionMessage(conditionPasswordCheck, '');
//       break;
//     case 'validEmail':
//       changeConditionMessage(conditionEmail, '');
//       break;
//     default:
//       break;
//   }
// };

const manageConditionId = (idCondition) => {
  setClassList(eraseInputId, 'add', 'has-input');
  switch (idCondition) {
    case 'empty':
      changeConditionMessage(conditionId, '입력한 내용이 없어요.');
      setClassList(conditionId, 'add', 'warning');
      setClassList(eraseInputId, 'remove', 'has-input');
      break;
    case 'invalidId':
      changeConditionMessage(
        conditionId,
        '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요.'
      );
      setClassList(conditionId, 'add', 'warning');
      break;
    case 'duplicationId':
      changeConditionMessage(conditionId, '이미 사용 중인 아이디입니다.');
      setClassList(conditionId, 'add', 'warning');
      break;
    default:
      changeConditionMessage(conditionId, '');
      break;
  }
};

const manageConditionPassword = (passwordCondition) => {
  setClassList(eraseInputPassword, 'add', 'has-input');
  switch (passwordCondition) {
    case 'empty':
      changeConditionMessage(conditionPassword, '입력한 내용이 없어요.');
      setClassList(conditionPassword, 'add', 'warning');
      setClassList(eraseInputPassword, 'remove', 'has-input');
      break;
    case 'invalidPassword':
      changeConditionMessage(
        conditionPassword,
        '특수문자(~!@#$%^&*) 포함 6~16자리로 입력해주세요.'
      );
      setClassList(conditionPassword, 'add', 'warning');
      break;
    default:
      changeConditionMessage(conditionPassword, '');
      break;
  }
};

const manageConditionPasswordCheck = (passwordCheckCondition) => {
  setClassList(eraseInputPasswordCheck, 'add', 'has-input');
  switch (passwordCheckCondition) {
    case 'empty':
      changeConditionMessage(conditionPasswordCheck, '입력한 내용이 없어요.');
      setClassList(conditionPasswordCheck, 'add', 'warning');
      setClassList(eraseInputPasswordCheck, 'remove', 'has-input');
      break;
    case 'notMatchedPassword':
      changeConditionMessage(
        conditionPasswordCheck,
        '일치하지 않습니다. 다시 입력해주세요.'
      );
      setClassList(conditionPasswordCheck, 'add', 'warning');
      break;
    default:
      changeConditionMessage(conditionPasswordCheck, '');
      break;
  }
};

const manageConditionEmail = (emailCondition) => {
  setClassList(eraseInputEmail, 'add', 'has-input');
  switch (emailCondition) {
    case 'empty':
      changeConditionMessage(conditionEmail, '입력한 내용이 없어요.');
      setClassList(conditionEmail, 'add', 'warning');
      setClassList(eraseInputEmail, 'remove', 'has-input');
      break;
    case 'invalidEmail':
      changeConditionMessage(
        conditionEmail,
        '이메일 형식이 맞지 않습니다. 다시 입력해 주세요.'
      );
      setClassList(conditionEmail, 'add', 'warning');
      break;
    default:
      changeConditionMessage(conditionEmail, '');
      break;
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

const isValidId = async (userInput) => {
  const id = userInput;
  if (id.trim() === '') {
    return 'empty';
  }
  if (!regex.regexId.test(id)) {
    return 'invalidId';
  }
  if (await isDuplicationId(id)) {
    return 'duplicationId';
  }
  return 'validId';
};

const isValidPassword = (userInput) => {
  const password = userInput;
  if (password.trim() === '') {
    return 'empty';
  }
  if (!regex.regexPassword.test(password)) {
    return 'invalidPassword';
  }
  return 'validPassword';
};

const isValidPasswordCheck = () => {
  const passwordCheck = inputPasswordCheck.value;
  if (passwordCheck.trim() === '') {
    return 'empty';
  }
  if (passwordCheck !== inputPassword.value) {
    return 'notMatchedPassword';
  }
  return 'validPasswordCheck';
};

const isValidEmail = (userInput) => {
  const email = userInput;
  if (email.trim() === '') {
    return 'empty';
  }
  if (!regex.regexEmail.test(email)) {
    return 'invalidEmail';
  }
  return 'validEmail';
};

const handleForm = async (e) => {
  const tag = e.target;
  switch (tag.id) {
    case 'input-id':
      await isValidId(tag.value).then((validStatus) => {
        manageConditionId(validStatus);
        checkValid.id = validStatus === 'validId';
      });
      break;
    case 'input-password':
      manageConditionPassword(isValidPassword(tag.value));
      manageConditionPasswordCheck(
        isValidPasswordCheck(inputPasswordCheck.value)
      );
      checkValid.password = isValidPassword(tag.value) === 'validPassword';
      break;
    case 'input-password-check':
      manageConditionPasswordCheck(isValidPasswordCheck(tag.value));
      checkValid.passwordCheck =
        isValidPasswordCheck(tag.value) === 'validPasswordCheck';
      break;
    case 'input-email':
      manageConditionEmail(isValidEmail(tag.value));
      checkValid.email = isValidEmail(tag.value) === 'validEmail';
      break;
    default:
      break;
  }

  if (
    checkValid.id === true &&
    checkValid.password === true &&
    inputPassword.value === inputPasswordCheck.value &&
    checkValid.email === true &&
    checkboxAge.checked === true &&
    checkboxTerms.checked === true &&
    checkboxCollection.checked === true &&
    checkboxProvisionHomepage.checked === true
  ) {
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.disabled = true;
  }
};

// inputId.addEventListener('keyup', handleInputId);
// inputPassword.addEventListener('keyup', handleInputPassword);
// inputPasswordCheck.addEventListener('keyup', handleInputPasswordCheck);
// inputEmail.addEventListener('keyup', handleInputEmail);
buttonShowPassword.forEach((node) => {
  node.addEventListener('click', handlePasswordShow);
});
buttonEraseInput.forEach((node) => {
  node.addEventListener('click', handleEraseInput);
});
checkboxAll.addEventListener('click', handleAgreeAll);
checkboxMarketing.addEventListener('click', handleAgreeMarketing);
signupForm.addEventListener('input', handleForm);
buttonEraseInput.forEach((node) => {
  node.addEventListener('click', handleForm);
});
