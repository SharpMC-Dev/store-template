const priceEndpoint = 'http://localhost:9901/store/prices/';

const packageList = $('.package-list');
const contentTitle = $('.category-title');

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

const id = new URLSearchParams(window.location.search).get('id');

if (!id) showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));

fetch(catEndpoint + `?id=${id}`, requestOptions).then(res =>
  res.text().then(response => {
    response = JSON.parse(response);
    const category = response.category;

    if (!category) showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));

    contentTitle.text(category.nameReadable);
    document.title = document.title.split(/\|/gim).join(' ') + ` | ${category.nameReadable}`;

    const packages = category.products.sort((a, b) => a.order - b.order);

    packages
      .sort((a, b) => a.order - b.order)
      .forEach(async package => {
        const price = await getPrice(package);
        packageList.append(`<div class="package-item">
                    <div class="package-item-top">

                    ${package.imageUrl ? `<span id="package-item-logo"><img src="${package.imageUrl}" /></span>` : ''}

                    <span id="package-item-title"><span style="opacity: var(--text-fade-opacity); font-weight: 100; font-size: 13pt;">${package.parent} /</span> ${package.name}</span>
                    </div>
                    <div class="package-item-info-bar">
                      <span id="package-item-price">${formatPrice(price)}</span>
                      <button id="view-button" onclick="viewButton('${package.id}')">View</button>
                    </div>
                  </div>`);
      });
  })
);
