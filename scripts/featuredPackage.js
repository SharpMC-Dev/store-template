const FPEndpoint = 'http://localhost:9901/store/packages/featured';

const pathBack = $('.featured-package #path #path-back');
const pathCurrent = $('.featured-package #path #path-current');

const packageLogo = $('.featured-package #package-logo');
const packagePrice = $('.featured-package .package-info-bar #package-price');

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

function formatPrice(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

fetch(FPEndpoint, requestOptions).then(res =>
  res.text().then(response => {
    response = JSON.parse(response);

    // if (!response.successful) {
    //   $('.featured-package').html(`<span id="title">${response}</span>`);

    //   return;
    // }

    pathBack.text(response.parent.name + ' / ');
    pathCurrent.text(response.name);
    packageLogo.attr('src', response.imageUrl);
    packagePrice.text(formatPrice(response.price));
  })
);
