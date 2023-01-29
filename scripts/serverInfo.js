const ip = 'play.sharpmc.org';
const apiEndpoint = 'https://api.mcsrvstat.us/2/';

const ipElement = `<span id="ip" onclick="showModal('IP Copied', 'The IP was successfully copied. You can now paste it anywhere.'); copy('${ip}')">${ip}</span>`;

const ipPill = $('#ip-pill');
const playersOnline = $('#players');

ipPill.append(ipElement);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

function getPlurals(num) {
  if (num == 1) return 'player';

  return 'players';
}

function getPlayers(data) {
  if (!data || data == null) return 0;

  return data.players.online;
}

fetch(apiEndpoint + ip, requestOptions).then(res =>
  res.text().then(data => {
    data = JSON.parse(data);

    playersOnline.text(getPlayers(data) + ' ' + getPlurals(getPlayers(data)) + ' Online');
  })
);
