const generateBtn = document.querySelector('[data-generate-qr-btn]');
const editBtn = document.querySelector('[data-go-back-btn]');
const flippedCards = document.querySelectorAll('section');
const data = document.querySelector('[data-url]');
const mainColor = document.querySelector('input#main-color');
const bgColor = document.querySelector('input#background-color');
const size = document.querySelector('input#size');
const margin = document.querySelector('input#margin');
const format = document.querySelectorAll('input[type=radio]');
const QRCodeContainer = document.querySelector('.qr-image');
const QRImg = document.querySelector('.qr-code');
const marginValue = document.querySelector('.margin-value');
const sizeValue = document.querySelector('.size-value');

const btns = [generateBtn, editBtn];

// GET value of  checked chechbox of image format
function getFormatValue(checkboxes) {
  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      return checkbox.value;
    }
  }
}

// check that url not emply
function validData(data) {
  if (data.value.length >= 1) {
    generateBtn.disabled = false;
    data.classList.remove('error');
    return true;
  } else {
    generateBtn.disabled = true;
    data.classList.add('error');
    return false;
  }
}

const getParams = (params) => {
  return {
    format: params.imageFormat,
    data: params.dataVal,
    size: `${params.sizeVal}x${params.sizeVal}`,
    color: params.mainColorVal.replace('#', ''),
    bgcolor: params.bgColorVal.replace('#', ''),
    qzone: params.marginVal,
  };
};

getQRCode = async (parameters) => {
  const UrlParams = new URLSearchParams(parameters).toString();
  const response = await fetch(
    `http://api.qrserver.com/v1/create-qr-code/?${UrlParams}`
  );

  if (response.ok) {
    return response.url;
  }
};

displayQRCode = async () => {
  const imageFormat = getFormatValue(format);
  const dataVal = data.value;
  const mainColorVal = mainColor.value;
  const bgColorVal = bgColor.value;
  const sizeVal = size.value;
  const marginVal = margin.value;

  const parameters = getParams({
    imageFormat,
    dataVal,
    mainColorVal,
    bgColorVal,
    sizeVal,
    marginVal,
  });
  const srcImg = await getQRCode(parameters);
  QRImg.src = srcImg;
  QRImg.alt = 'QR Code';
  QRCodeContainer.appendChild(QRImg);
};

data.addEventListener('change', () => {
  validData(data);
});

// update size & margin
const updateSizeValue = (e) => {
  const val = e.target.value;
  sizeValue.innerHTML = `${val}x${val}`;
};

const updateMarginVal = (e) => {
  const val = e.target.value;
  marginValue.innerHTML = `${val}px`;
};

size.addEventListener('change', updateSizeValue);
margin.addEventListener('change', updateMarginVal);

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (btn.hasAttribute('data-generate-qr-btn')) {
      displayQRCode();
    }
    flippedCards.forEach((card) => card.classList.toggle('flipped'));
  });
});
