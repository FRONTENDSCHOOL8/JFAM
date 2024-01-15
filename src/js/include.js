// function includeHTML(element) {
//     const targetElement = element;
//     const { includePath } = targetElement.dataset;
//     if (includePath) {
//       const xhttp = new XMLHttpRequest();
//       xhttp.onreadystatechange = function handleStateChange() {
//         if (this.readyState === 4 && this.status === 200) {
//           targetElement.outerHTML = this.responseText;
//         }
//       };
//       xhttp.open('GET', includePath, true);
//       xhttp.send();
//     }
//   }
  
//   function loadIncludedHTML() {
//     const allElements = document.getElementsByTagName('*');
//     Array.prototype.forEach.call(allElements, includeHTML);
//     console.log('include');
//   }
  
//   window.addEventListener('load', loadIncludedHTML);

import { getStorage, setStorage } from '/src/js/storage';

function includeHTML(element,onSuccess) {
  const { includePath } = element.dataset;
  if (includePath) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        element.outerHTML = this.responseText;
        onSuccess()
      }
    };
    xhr.open('GET', includePath, true);
    xhr.send();
  }
}
// setStorage('auth', {isAuth: false});

// const header = async() =>{
    
//   const data = await getStorage('auth');
//   console.log(data.isAuth);
//   const buttonProfile = document.querySelector('.button-profile');
//   if(!data.isAuth){
//     buttonProfile.style.display = 'none';
//   }  else{
//     buttonProfile.style.display = 'block';
//   }
// }

function loadIncludedHTML() {
  const allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, (item)=>{
    includeHTML(item,()=>{
      if(item.tagName === 'HEADER') header()
    })
  });
}




window.addEventListener('load', loadIncludedHTML);