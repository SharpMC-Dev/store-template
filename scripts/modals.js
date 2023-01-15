let modal_comps = [$('.modal-container'), $('.modal-overlay'), $('.modal')];
let button = $('#modal-dismiss-button');

modal_comps.forEach(comp => comp.hide());

function showModal(title, subtitle) {
  $('#modal-title').text(title);
  $('#modal-subtitle').text(subtitle);
  modal_comps.forEach(comp => comp.show());
}

button.on('click', e => {
  e.preventDefault();

  modal_comps.forEach(comp => comp.hide());
});
