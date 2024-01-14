function includeHTML(element) {
    const { includePath } = element.dataset;
    if (includePath) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          element.outerHTML = this.responseText;
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