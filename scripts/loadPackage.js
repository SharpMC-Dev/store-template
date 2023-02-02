const packageEndpoint = `http://localhost:9901/store/packages?id=`;
const contentTitle = $('.category-title');
const contentSubtitle = $('#content-subtitle');
const disclaimer = $('.content-title-disclaimer');
const packageFeatureList = $('.package-feature-list');

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

let html = `<div class="package-feature-list">
                  <div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Chat Perks </span>
                    </div>
                    <div class="package-feature-items">
                      <div class="package-feature-item">King Prefix <span class="material-icons md-18">help_outline</span></div>
                      <div class="package-feature-item">Fancy Chat <span class="material-icons md-18">help_outline</span></div>
                    </div>
                  </div>
                  <div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> King Kit </span>
                      <div class="kit-disclaimer">1 Week Cooldown</div>
                    </div>
                    <div class="package-feature-kit">
                      <div class="package-feature-kit-item">
                        <span id="kit-item-title">Diamond Sword</span>
                        <ul id="kit-item-details">
                          <li>Sharpness 3</li>
                          <li>Unbreaking 3</li>
                        </ul>
                      </div>
                      <div class="package-feature-kit-item">
                        <span id="kit-item-title">Diamond Sword</span>
                        <ul id="kit-item-details">
                          <li>Sharpness 3</li>
                          <li>Unbreaking 3</li>
                        </ul>
                      </div>
                      <div class="package-feature-kit-item">
                        <span id="kit-item-title">Diamond Sword</span>
                        <ul id="kit-item-details">
                          <li>Sharpness 3</li>
                          <li>Unbreaking 3</li>
                        </ul>
                      </div>
                      <div class="package-feature-kit-item">
                        <span id="kit-item-title">Diamond Sword</span>
                        <ul id="kit-item-details">
                          <li>Sharpness 3</li>
                          <li>Unbreaking 3</li>
                        </ul>
                      </div>
                      <div class="package-feature-kit-item">
                        <span id="kit-item-title">Diamond Sword</span>
                        <ul id="kit-item-details">
                          <li>Sharpness 3</li>
                          <li>Unbreaking 3</li>
                        </ul>
                      </div>
                      <div class="package-feature-kit-item">
                        <span id="kit-item-title">Diamond Sword</span>
                        <ul id="kit-item-details">
                          <li>Sharpness 3</li>
                          <li>Unbreaking 3</li>
                        </ul>
                      </div>
                      <div class="package-feature-kit-item">
                        <span id="kit-item-title">Diamond Sword</span>
                        <ul id="kit-item-details">
                          <li>Sharpness 3</li>
                          <li>Unbreaking 3</li>
                        </ul>
                      </div>
                      <div class="package-feature-kit-item package-feature-kit-extra">
                        <span id="kit-item-title">Golden Apples x16</span>
                        <span id="kit-item-title">Cooked Beef x64</span>
                      </div>
                    </div>
                  </div>
                  <div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Commands </span>
                    </div>
                    <div class="package-feature-items">
                      <div class="package-feature-item">/invsee <span class="material-icons md-18">help_outline</span></div>
                      <div class="package-feature-item">/is fly <span class="material-icons md-18">help_outline</span></div>
                      <div class="package-feature-item">/back <span class="material-icons md-18">help_outline</span></div>
                      <div class="package-feature-item">/repair all <span class="material-icons md-18">help_outline</span></div>
                      <div class="package-feature-item">/trash <span class="material-icons md-18">help_outline</span></div>
                    </div>
                  </div>
                  <div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Features </span>
                    </div>
                    <div class="package-feature-items">
                      <div class="package-feature-item">4 Player Vaults<span class="material-icons md-18">help_outline</span></div>
                      <div class="package-feature-item">25 Player Minions<span class="material-icons md-18">help_outline</span></div>
                    </div>
                  </div>
                </div>`;

function formatPrice(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
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
    res.text().then(response => {
      response = JSON.parse(response);
      const package = response;

      if (!package) showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));

      document.title = document.title.split(/\|/gim).join(' ') + ` | ${package.parent.name} » ${package.name}`;

      let packageData = package.description?.json;
      if (!packageData) showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));

      let chatPerks = packageData.perks.chat;
      let kit = packageData.kit;
      let commandPerks = packageData.perks.commands;
      let featurePerks = packageData.perks.features;
      let extraPerks = packageData.perks.extras;

      let featureListFull = '';

      contentTitle.text(package.name);
      contentSubtitle.html(formatPrice(package.price));
      disclaimer.text(packageData.permanent ? 'This package is permanent, you will not lose it to server resets.' : 'One time purchase. Items will not be restored on server reset.');

      featureListFull += `<div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Chat Perks </span>
                    </div>
                    <div class="package-feature-items">
                      ${chatPerks.map(perk => `<div class="package-feature-item">${perk.text} <span class="material-icons md-18">help_outline</span></div>`).join('')}
                    </div>
                  </div>`;
      featureListFull += `<div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> ${package.name} Kit </span>
                      <div class="kit-disclaimer">${kit.cooldown} Cooldown</div>
                    </div>
                    <div class="package-feature-kit">
                      ${formatKitPerks(kit)}
                    </div>
                    <div class="package-feature-kit-item package-feature-kit-extra">
                        ${formatKitExtras(kit)}
                      </div>
                  </div>`;
      featureListFull += `<div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Commands </span>
                    </div>
                    <div class="package-feature-items">
                      ${commandPerks.map(perk => `<div class="package-feature-item">${perk.text} <span class="material-icons md-18">help_outline</span></div>`).join('')}
                    </div>
                  </div>`;
      featureListFull += `<div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Features </span>
                    </div>
                    <div class="package-feature-items">
                      ${featurePerks.map(perk => `<div class="package-feature-item">${perk.text} <span class="material-icons md-18">help_outline</span></div>`).join('')}
                    </div>
                  </div>`;
      featureListFull += `<div class="package-feature">
                    <div class="package-feature-header">
                      <span id="package-feature-title"> Extras </span>
                    </div>
                    <div class="package-feature-items">
                      ${extraPerks.map(perk => `<div class="package-feature-item">${perk.text} <span class="material-icons md-18">help_outline</span></div>`).join('')}
                    </div>
                  </div>`;

      packageFeatureList.html(featureListFull);
    })
  )
  .catch(err => {
    showModal('Something happened!', 'Please try again. If the issue persists, please contact support.', () => (window.location = '/'));
    console.log(err);
  });
