const ayarlar = require('../shade.json');
module.exports = message => { //shadexdd
  let client = message.client; //shadexdd
  if (message.author.bot) return; //shadexdd
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split('')[0].slice(ayarlar.prefix.length);
  let params = message.content.split('').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command)); //shadexdd
  };
  if (cmd) {
    if(!message.guild) {
      if(cmd.config.guildOnly === true) {
        return;
      };
    };
    if (cmd.config.permLevel) {
      if(cmd.config.permLevel === "BOT_OWNER") { //bot owner yaz  //shadexdd
   if(!ayarlar.sahip.includes(message.author.id)) {
        message.channel.send(`Bu komutu kullanabilmek için \`${cmd.config.permLevel}\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout: 3000}));
        return;
   }
      } //shadexdd
        if(!message.member.hasPermission(cmd.config.permLevel)) {
      message.channel.send(`Bu komutu kullanabilmek için \`${cmd.config.permLevel}\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout: 3000}));
     return;
      };
    };
    cmd.run(client, message, params);
    //tag komutu mainde
};
};