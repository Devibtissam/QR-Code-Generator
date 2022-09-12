const generateBtn = document.querySelector('[data-generate-qr-btn]');
const editBtn = document.querySelector('[data-go-back-btn]');
const flippedCards = document.querySelectorAll('section');
const url = document.querySelector('[data-url]');
const btns = [generateBtn, editBtn];



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


url.addEventListener('keyup', () => {
  const validURL = validUrl(url);
  if (validURL) {
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        flippedCards.forEach((card) => card.classList.toggle('flipped'));
      });
    });
  }
});
