import { getCartSize } from './cart.js';

const localStorage = window.localStorage;

const loginElements = $('.login-element');
const welcomeElements = $('.welcome-element');
const loginButton = $('#login-text');
const logoutButton = $('#logout-text');
const usernameButton = $('#username-submit');
const inputError = $("label[for='username']");
const accountLogo = $('.login-card #icon');
const accountName = $('#login-text');
const welcomeText = $('#content-title.welcome-element');
const cartText = $('.cart-text');

inputError.hide();
loginElements.hide();
logoutButton.hide();

if (localStorage.getItem('username')) {
  accountLogo.attr('src', `https://minotar.net/helm/${localStorage.getItem('username')}/600.png`);
  accountName.text(localStorage.getItem('username'));
  accountName.css({ color: 'white', textDecoration: 'none', fontSize: '16pt', cursor: 'default' });
  logoutButton.show();

  let cartSize = getCartSize();

  cartText.text(`${cartSize}`);
  welcomeText.text(`Welcome, ${localStorage.getItem('username')}`);
}

loginButton.on('click', e => {
  if (localStorage.getItem('username')) return;
  e.target.innerHTML = 'Logging In';
  loginElements.show();
  welcomeElements.hide();
});

usernameButton.on('click', e => {
  let username = $('#username-input').val();
  if (!username || username.length > 20 || username.length < 3) return inputError.show();

  let cart = { size: 0, packages: [] };

  localStorage.setItem('username', username);
  localStorage.setItem('cartSize', cart.size);
  localStorage.setItem('cartPackages', cart.packages);
  accountLogo.attr('src', `https://minotar.net/helm/${localStorage.getItem('username')}/600.png`);
  accountName.text(localStorage.getItem('username'));
  accountName.css({ color: 'white', textDecoration: 'none', fontSize: '16pt', cursor: 'default' });
  logoutButton.show();

  location.reload();
});

logoutButton.on('click', e => {
  showModal(
    'Logout?',
    'If you log out, your cart will be lost.\nTo cancel, just reload the page.',
    () => {
      localStorage.removeItem('username');
      localStorage.removeItem('cartPackages');
      localStorage.removeItem('cartSize');
      location.reload();
    },
    'Log Out'
  );
});
