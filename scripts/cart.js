let cart = window.localStorage.getItem('cartPackages') ? window.localStorage.getItem('cartPackages').split(/\,/gim) : [];
const cartSize = cart.length !== null ? cart.length : 0;
const username = window.localStorage.getItem('username');
const cartCard = $('.cart-card');

window.localStorage.setItem('cartPackages', cart);
window.localStorage.setItem('cartSize', cartSize);

cartCard.on('click', e => [(window.location = '/summary')]);

export function getCartSize() {
  return cartSize;
}

export function addToCart(productId, allowsMultiple, category) {
  console.log(allowsMultiple);
  if (!username)
    return showModal('Failed to add product', 'Log in to add products to your cart', () => {
      window.location = '#';
    });
  if (!allowsMultiple && cart.join('').includes(category))
    return showModal('Failed to add product', 'You may only add one product at a time from the category: ' + category, () => {
      window.location = '#';
    });
  cart.push(productId + '|' + category);
  window.localStorage.setItem('cartPackages', cart);

  console.log(cart);

  showModal('Successfully added product to your cart', '', () => (location.href = '/summary'));
}

export function getCartItems() {
  let cartList = cart.map(x => x.split(/\|/gim)[0]);
  let cartCategories = cart.map(x => x.split(/\|/gim)[1]);

  let map = cartList.map(i => ({ category: cartCategories[cartList.indexOf(i)], id: i, quantity: cartList.filter(x => x == i).length }));
  let final = [...new Map(map.map(m => [m.id, m])).values()];

  return final;
}

function goToCheckout() {
  console.log('went to checkout :)');
}
