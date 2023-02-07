const catEndpoint = 'http://localhost:9901/store/categories';
var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

const navList = $('.navigation #navigation-list');
const dropdown = $('.dropdown');

// function onCatClick(id) {
//   window.location = `/category?id=${id}`;
// }

fetch(catEndpoint, requestOptions).then(res =>
  res.text().then(response => {
    response = JSON.parse(response);
    const categories = response.categories;

    let catHtml = categories
      .sort((a, b) => a.order - b.order)
      .map(
        category =>
          `${`<li>
                <a href='/category/?id=${category.name}'>
                  ${category.nameReadable}
                </a>
              </li>`}`
      )
      .join('\n');

    navList.append(catHtml);
    // $(`.subcategories`).hide();
  })
);

// function onDropdownClick(id) {
//   const dropdownContent = $(`#subcategories-${id}`);
//   const dropdownItems = $(`#subcategory-${id}`);
//   const chevron = $(`#${id} .chevron`);
//   const dropdownParent = $(`#${id} a`);

//   if (dropdownContent.is(':visible')) {
//     dropdownContent.hide();

//     // dropdownItems.hide();
//     chevron.text('expand_more');
//     dropdownParent.css('opacity', 'var(--text-fade-opacity)');

//     return;
//   }

//   chevron.text('expand_less');
//   dropdownParent.css('opacity', '1');
//   dropdownContent.show();
//   // dropdownItems.show();
//   // console.log(dropdownContent);
// }
