import { getCartSize, getCartItems } from './cart.js';

const isEmpty = getCartSize() <= 0;
const emptyNotif = $('.cart-empty');
const mainCart = $('.main-cart');
const lineItems = $('.cart-items');
const cartPrice = $('.cart-total-text');

const cartSubtitle = $('.content-subtitle');

const productEndpoint = `http://localhost:9901/store/products?id=`;
const priceEndpoint = 'http://localhost:9901/store/prices/';

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

if (isEmpty) {
  emptyNotif.show();
  mainCart.hide();
} else {
  emptyNotif.css('visibility', 'hidden');

  $('.cart-quantity-total').text(`${getCartSize()}` + ` ${getCartSize() == 1 ? 'Item' : 'Items'}`);

  let cartLineItems = getCartItems();

  let np = 0;
  cartLineItems.forEach(async lineItem => {
    let product = await (await fetch(productEndpoint + lineItem.id, requestOptions)).json();
    let price = await getPrice(product);
    np = np + price * lineItem.quantity;

    lineItems.append(`<div class="cart-item">
                      <div class="cart-item-quantity">
                        <span class="quantity-text">x${lineItem.quantity}</span>
                      </div>
                      <div class="cart-item-title"><span class="title-text">${product.name}</span></div>
                      <div class="cart-item-price">
                        <span class="price-text">${formatPrice(price * lineItem.quantity)}</span>
                      </div>
                      <div class="cart-item-remove">
                        <span class="material-icons remove-text" onclick="removeFromCart('${product.id}')">close</span>
                      </div>
                    </div>`);
    cartPrice.text(formatPrice(np));
  });
}
