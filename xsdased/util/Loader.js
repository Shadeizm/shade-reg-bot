const reqEvent = event => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('message'));
};

//koda dokunma sonra dm geliyorsunuz