const FPEndpoint = 'http://localhost:9901/store/products/featured';
const priceEndpoint = 'http://localhost:9901/store/prices/';

const pathBack = $('.featured-package #path #path-back');
const pathCurrent = $('.featured-package #path #path-current');

const packageLogo = $('.featured-package #package-logo');
const packagePrice = $('.featured-package .package-info-bar #package-price');

const packageButton = $('#view-button');

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

function formatPrice(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

async function getPrice(p) {
  let { price } = await (await fetch(priceEndpoint + p.price)).json();

  return price;
}

fetch(FPEndpoint, requestOptions).then(async res =>
  res.text().then(async response => {
    response = JSON.parse(response);

    if (!response.successful && !response.id) {
      $('.featured-package').html(`<div id="path"><span id="path-back">No Featured Package</span></div>`);

      return;
    }

    const price = await getPrice(response);

    pathBack.text(response.parentReadable + ' / ');
    pathCurrent.text(response.name);
    packageLogo.attr('src', response.imageUrl ? response.imageUrl : '');
    packagePrice.text(`${formatPrice(price)}`);
    packageButton.attr('onclick', `viewButton('${response.id}')`);
  })
);
