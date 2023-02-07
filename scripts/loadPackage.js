import tinycolor from 'https://esm.sh/tinycolor2';

const packageEndpoint = `http://localhost:9901/store/products?id=`;
const priceEndpoint = 'http://localhost:9901/store/prices/';

const contentTitle = $('.category-title');
const contentSubtitle = $('#content-subtitle');
const disclaimer = $('.content-title-disclaimer');
const packageFeatureList = $('.package-feature-list');
const addToCart = $('.add-to-cart');
const content = $('.content');
const loggedIn = window.localStorage.getItem('username') ? true : false;

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

function romanize(num) {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(''),
    key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
    roman = '',
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
  return Array(+digits.join('') + 1).join('M') + roman;
}

function formatKitPerks(kit) {
  let s = '';

  kit['kit-items'].forEach(item => {
    let itemName = item['item-id'].split(/\_/gim).join(' ');
    s += `<div class="package-feature-kit-item">
                        <span id="kit-item-title">${itemName}</span>
                        <ul id="kit-item-details">
                          ${item.enchantments.map(e => `<li>${e.name} ${romanize(e.level)}</li>`).join('')}
                        </ul>
                      </div>`;
  });

  return s;
}

function formatKitExtras(kit) {
  let s = '';
  kit['kit-extras'].forEach(item => {
    let itemName = item['item-id'].split(/\_/gim).join(' ');
    s += `<span id="kit-item-title">${itemName} x${item.amount}</span>\n`;
  });

  return s;
}

const id = new URLSearchParams(window.location.search).get('id');

if (!id) showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));

fetch(packageEndpoint + id, requestOptions)
  .then(res =>
    res.text().then(async response => {
      response = JSON.parse(response);
      const packageRes = response;

      if (!packageRes) showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));

      console.log(packageRes);

      document.title = document.title.split(/\|/gim).join(' ') + ` | ${packageRes.parent.name} » ${packageRes.name}`;

      let packageData = await (await fetch(packageRes.dataUrl)).json();
      if (!packageData) showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));
      let price = await getPrice(packageRes);

      let chatPerks = packageData.perks.chat;
      let kit = packageData.kit;
      let commandPerks = packageData.perks.commands;
      let featurePerks = packageData.perks.features;
      let extraPerks = packageData.perks.extras;
      let oneTimePerks = packageData.perks.oneTime;

      let featureListFull = '';

      contentTitle.text(packageRes.name);
      contentSubtitle.html(`<span style="opacity: var(--text-fade-opacity); font-weight: 100;">${formatPrice(price)}</span>`);
      disclaimer.text(packageData.permanent ? 'This package is permanent, you will not lose it to server resets.' : 'One time purchase. Items will not be restored on server reset.');

      if (chatPerks) {
        featureListFull += `<div class="package-feature">
        
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Chat Perks </span>
                    </div>
                    <div class="package-feature-items">
                      ${chatPerks
                        .map(
                          perk =>
                            `<div class="package-feature-item">
                    ${perk.text}
                    <p style="font-size: 11pt; font-weight: 100; text-transform: none; opacity: var(--text-fade-opacity); font-style: italic;">(${perk['tooltip-text']})</p>
                  </div>
                </div>`
                        )
                        .join('')}
                    </div>
                  </div>`;
      }
      if (kit) {
        featureListFull += `<div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> /kit ${packageRes.name} </span>
                      <div class="kit-disclaimer">${kit.cooldown} Cooldown</div>
                    </div>
                    <div class="package-feature-kit">
                      ${formatKitPerks(kit)}
                    </div>
                    <div class="package-feature-kit-item package-feature-kit-extra">
                        ${formatKitExtras(kit)}
                      </div>
                  </div>`;
      }
      if (commandPerks) {
        featureListFull += `<div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Commands </span>
                    </div>
                    <div class="package-feature-items">
                      ${commandPerks
                        .map(
                          perk => `<div class="package-feature-item">
                    ${perk.text}
                    <p style="font-size: 11pt; font-weight: 100; text-transform: none; opacity: var(--text-fade-opacity); font-style: italic;">(${perk['tooltip-text']})</p>
                </div>`
                        )
                        .join('')}
                    </div>
                  </div>`;
      }
      if (featurePerks) {
        featureListFull += `<div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Features </span>
                    </div>
                    <div class="package-feature-items">
                      ${featurePerks
                        .map(
                          perk => `<div class="package-feature-item">
                    ${perk.text}
                    <p style="font-size: 11pt; font-weight: 100; text-transform: none; opacity: var(--text-fade-opacity); font-style: italic;">(${perk['tooltip-text']})</p>
                  </div>
                </div>`
                        )
                        .join('')}
                    </div>
                  </div>`;
      }
      if (extraPerks) {
        featureListFull += `<div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Extras </span>
                    </div>
                    <div class="package-feature-items">
                      ${extraPerks
                        .map(
                          perk => `<div class="package-feature-item">
                    ${perk.text}
                    <p style="font-size: 11pt; font-weight: 100; text-transform: none; opacity: var(--text-fade-opacity); font-style: italic;">(${perk['tooltip-text']})</p>
                  </div>
                </div>`
                        )
                        .join('')}
                    </div>
                  </div>`;
      }
      if (oneTimePerks) {
        featureListFull += `<div class="package-feature">
        
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Recieved Upon Purchase </span>
                    </div>
                    <div class="package-feature-items">
                      ${oneTimePerks
                        .map(
                          perk =>
                            `<div class="package-feature-item">
                    ${perk.text}
                    <p style="font-size: 11pt; font-weight: 100; text-transform: none; opacity: var(--text-fade-opacity); font-style: italic;">(${perk['tooltip-text']})</p>
                  </div>
                </div>`
                        )
                        .join('')}
                    </div>
                  </div>`;
      }

      packageFeatureList.html(featureListFull);
      addToCart.text(`Add ${packageRes.name} to cart`);
      addToCart.css('background', packageData['accent-color']);
      addToCart.attr('packageid', packageRes.id);
      document.querySelector(':root').style.setProperty('--disclaimer', tinycolor(packageData['accent-color']).setAlpha(0.192));
    })
  )
  .catch(err => {
    showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));
    console.log(err);
  });
