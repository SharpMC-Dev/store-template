$('.navigation-container').hide();

let isShowingNav = $('.navigation-container').is(':visible');
let isShowingPackage = $('.featured-package').is(':visible');

$('#menu-icon').on('click', () => {
  console.log(isShowingNav);
  console.log(isShowingPackage);
  if (!isShowingNav) {
    $('.featured-package').hide();
    $('.package-overlay').hide();

    $('.navigation-container').show();
    isShowingNav = true;
    isShowingPackage = false;

    return;
  }
  if (!isShowingPackage && isShowingNav) {
    $('.navigation-container').hide();

    $('.featured-package').show();
    $('.package-overlay').show();

    isShowingNav = false;
    isShowingPackage = true;

    return;
  }
});

$('#menu-icon').on('hover', e => {
  if ($('#menu-icon-perm').attr('class').includes('centernot')) {
    e.preventDefault();
  }
});

$('#menu-icon').on('click', () => {
  $('#menu-icon-perm').toggleClass('centernot');
  $('#menu-icon-perm').toggleClass('center');
});
