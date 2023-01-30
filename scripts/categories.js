const catEndpoint = 'http://localhost:9901/store/categories';
var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

const navList = $('.navigation #navigation-list');

fetch(catEndpoint, requestOptions).then(res =>
  res.text().then(response => {
    response = JSON.parse(response);
    const categories = response.categories;

    let catHtml = categories.map(category => `<li><a href="#" onclick="onCatClick(${category.id})">${category.name}</a></li>`).join('');

    navList.append(catHtml);
  })
);
