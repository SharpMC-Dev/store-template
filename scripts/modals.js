let modal_comps = [$('.modal-container'), $('.modal-overlay'), $('.modal')];
let button = $('#modal-dismiss-button');

modal_comps.forEach(comp => comp.hide());

async function showModal(title, subtitle, cb) {
  $('#modal-title').text(title);
  $('#modal-subtitle').text(subtitle);
  modal_comps.forEach(comp => comp.show());

  button.on('click', async e => {
    e.preventDefault();

    modal_comps.forEach(comp => comp.hide());

    if (cb) return await cb();
  });
}
