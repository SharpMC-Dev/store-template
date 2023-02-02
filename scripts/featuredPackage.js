const FPEndpoint = 'http://localhost:9901/store/packages/featured';

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

function getPrice(p) {
  let sale = p.sale;
  if (sale != null && sale.active) {
    return {
      sale: true,
      originalPrice: p.price,
      salePrice: p.price - sale.discount,
    };
  }

  return {
    sale: false,
    originalPrice: p.price,
  };
}

fetch(FPEndpoint, requestOptions).then(res =>
  res.text().then(response => {
    response = JSON.parse(response);

    if (response.successful === false) {
      $('.featured-package').html(`<div id="path"><span id="path-back">No Featured Package</span></div>`);

      return;
    }

    const price = getPrice(response);

    pathBack.text(response.parent.name + ' / ');
    pathCurrent.text(response.name);
    packageLogo.attr('src', response.imageUrl ? response.imageUrl : '');
    packagePrice.text(price.sale ? `<span id="sale-price">${formatPrice(price.originalPrice)}</span> ${formatPrice(price.salePrice)}` : formatPrice(response.price));
    packageButton.attr('onclick', `viewButton(${response.id})`);
  })
);
