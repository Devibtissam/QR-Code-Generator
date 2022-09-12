const generateBtn = document.querySelector('[data-generate-qr-btn]');
const editBtn = document.querySelector('[data-go-back-btn]');
const flippedCards = document.querySelectorAll('section');
const url = document.querySelector('[data-url]');
const mainColor = document.querySelector('input#main-color');
const bgColor = document.querySelector('input#background-color');
const size = document.querySelector('input#size');
const margin = document.querySelector('input#margin');
const format = document.querySelectorAll('input[type=checkbox]');

const btns = [generateBtn, editBtn];


// GET value of  checked chechbox of image format
function getFromatValue(checkboxes){
    checkboxes.forEach(checkbox => {
        if(checkbox.checked){
            console.log(checkbox.value);
            return checkbox.value;
        }
    });
}


// check that url not emply
function validUrl(url) {
  if (url.value.length >= 1) {
    generateBtn.disabled = false;
    url.classList.remove('error');
    return true;
  } else {
    generateBtn.disabled = true;
    url.classList.add('error');
    return false;
  }
}

function displayQRCode(url, mainColor, bgColor, size, margin, format){
    const imageFormat = getFromatValue(format);
    const urlVal = url.value;
    const mainColorVal = mainColor.value;
    const bgColorVal = bgColor.value;
    const sizeVal = size.value;
    const marginVal = margin.value;

    console.log(imageFormat, urlVal, mainColorVal, bgColorVal, sizeVal, marginVal);

}


url.addEventListener('keyup', () => {
  const validURL = validUrl(url);
  if (validURL) {
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        flippedCards.forEach((card) => card.classList.toggle('flipped'));
        // displayQRCode(url, mainColor, bgColor, size, margin, format);
      });
    });
  }
});
