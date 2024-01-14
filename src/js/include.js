function includeHTML(element) {
    const targetElement = element;
    const { includePath } = targetElement.dataset;
    if (includePath) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function handleStateChange() {
        if (this.readyState === 4 && this.status === 200) {
          targetElement.outerHTML = this.responseText;
        }
      };
      xhttp.open('GET', includePath, true);
      xhttp.send();
    }
  }
  
  function loadIncludedHTML() {
    const allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, includeHTML);
    console.log('include');
  }
  
  window.addEventListener('load', loadIncludedHTML);