// import pb from '/src/js/pocketbase.js';
import {
  pb,
  getNode,
  getNodes,
  setClassList,
  changeTextContent,
} from '/src/js/index';

document.addEventListener('DOMContentLoaded', async () => {
  const input = getNodes('.form-input');
  const check = getNodes('.form-check');
  const span = getNodes('.span-condition');
  const buttonShowPassword = getNodes('.button-show');
  const buttonEraseInput = getNodes('.button-erase');
  const signupForm = getNode('.signup-form');
  const buttonSubmit = getNode('.button-signup-submit');

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

  const [
    conditionId,
    conditionPassword,
    conditionPasswordCheck,
    conditionEmail,
  ] = span;

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

  const manageConditionId = (idCondition) => {
    setClassList(eraseInputId, 'add', 'has-input');
    switch (idCondition) {
      case 'emptyId':
        changeTextContent(conditionId, '입력한 내용이 없어요.');
        setClassList(conditionId, 'add', 'warning');
        setClassList(eraseInputId, 'remove', 'has-input');
        break;
      case 'invalidId':
        changeTextContent(
          conditionId,
          '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요.'
        );
        setClassList(conditionId, 'add', 'warning');
        break;
      case 'duplicationId':
        changeTextContent(conditionId, '이미 사용 중인 아이디입니다.');
        setClassList(conditionId, 'add', 'warning');
        break;
      default:
        changeTextContent(conditionId, '');
        break;
    }
  };

  const manageConditionPassword = (passwordCondition) => {
    setClassList(eraseInputPassword, 'add', 'has-input');
    switch (passwordCondition) {
      case 'emptyPassword':
        changeTextContent(conditionPassword, '입력한 내용이 없어요.');
        setClassList(conditionPassword, 'add', 'warning');
        setClassList(eraseInputPassword, 'remove', 'has-input');
        break;
      case 'invalidPassword':
        changeTextContent(
          conditionPassword,
          '특수문자(~!@#$%^&*) 포함 6~16자리로 입력해주세요.'
        );
        setClassList(conditionPassword, 'add', 'warning');
        break;
      default:
        changeTextContent(conditionPassword, '');
        break;
    }
  };

  const manageConditionPasswordCheck = (passwordCheckCondition) => {
    setClassList(eraseInputPasswordCheck, 'add', 'has-input');
    switch (passwordCheckCondition) {
      case 'emptyPasswordCheck':
        changeTextContent(conditionPasswordCheck, '입력한 내용이 없어요.');
        setClassList(conditionPasswordCheck, 'add', 'warning');
        setClassList(eraseInputPasswordCheck, 'remove', 'has-input');
        break;
      case 'notMatchedPassword':
        changeTextContent(
          conditionPasswordCheck,
          '일치하지 않습니다. 다시 입력해주세요.'
        );
        setClassList(conditionPasswordCheck, 'add', 'warning');
        break;
      default:
        changeTextContent(conditionPasswordCheck, '');
        break;
    }
  };

  const manageConditionEmail = (emailCondition) => {
    setClassList(eraseInputEmail, 'add', 'has-input');
    switch (emailCondition) {
      case 'emptyEmail':
        changeTextContent(conditionEmail, '입력한 내용이 없어요.');
        setClassList(conditionEmail, 'add', 'warning');
        setClassList(eraseInputEmail, 'remove', 'has-input');
        break;
      case 'invalidEmail':
        changeTextContent(
          conditionEmail,
          '이메일 형식이 맞지 않습니다. 다시 입력해 주세요.'
        );
        setClassList(conditionEmail, 'add', 'warning');
        break;
      default:
        changeTextContent(conditionEmail, '');
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
    changeTextContent(selectedSpanNode, '입력한 내용이 없어요.');
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
      return 'emptyId';
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
      return 'emptyPassword';
    }
    if (!regex.regexPassword.test(password)) {
      return 'invalidPassword';
    }
    return 'validPassword';
  };

  const isValidPasswordCheck = () => {
    const passwordCheck = inputPasswordCheck.value;
    if (passwordCheck.trim() === '') {
      return 'emptyPasswordCheck';
    }
    if (passwordCheck !== inputPassword.value) {
      return 'notMatchedPassword';
    }
    return 'validPasswordCheck';
  };

  const isValidEmail = (userInput) => {
    const email = userInput;
    if (email.trim() === '') {
      return 'emptyEmail';
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

  const handleSubmit = () => {
    const data = {
      username: inputId.value,
      email: inputEmail.value,
      emailVisibility: true,
      password: inputPassword.value,
      passwordConfirm: inputPasswordCheck.value,
      required_agree: true,
      provision_of_personal_information: checkboxProvision.checked,
      receive_marketing_SNS: checkboxSNS.checked,
      receive_marketing_email: checkboxEmail.checked,
    };
    try {
      pb.collection('users')
        .create(data)
        .then(() => {
          alert('축하합니다! 회원가입 완료되었습니다.');
          window.location.href = '/src/pages/login/';
        })
        .catch(() => {
          alert('입력 상태을 확인해주세요.');
        });
    } catch (error) {
      alert(error);
    }
  };

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
  buttonSubmit.addEventListener('click', handleSubmit);
});
