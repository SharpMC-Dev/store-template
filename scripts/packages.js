const packageList = $('.package-list');
const contentTitle = $('.category-title');

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

const id = new URLSearchParams(window.location.search).get('id');

if (!id) showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));

fetch(catEndpoint, requestOptions).then(res =>
  res.text().then(response => {
    response = JSON.parse(response);
    const category = response.categories.find(c => c.id === parseInt(id));

    if (!category) showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));

    contentTitle.text(category.name);
    document.title = document.title.split(/\|/gim).join(' ') + ` | ${category.name}`;

    const packages = category.packages.sort((a, b) => a.order - b.order);

    packages.forEach(package => {
      const price = getPrice(package);
      packageList.append(`<div class="package-item">
                    <div class="package-item-top">

                    ${package.image ? `<span id="package-item-logo"><img src="${package.image}" /></span>` : ''}

                    <span id="package-item-title">${package.name}</span>
                    </div>
                    <div class="package-item-info-bar">
                      <span id="package-item-price">${price.sale ? `<span id="sale-price">${formatPrice(price.originalPrice)}</span> ${formatPrice(price.salePrice)}` : formatPrice(package.price)}</span>
                      <button id="view-button" onclick="viewButton(${package.id})">View</button>
                    </div>
                  </div>`);
    });
  })
);

console.log(id);
