const Discord = require("discord.js");
const moment = require("moment");
const ayarlar = require("../shade.json") //shadexdd

module.exports = client => {
  client.user.setActivity(ayarlar.botdurum);  //ayarlardaki botun durumunu ayarlıyo eğer ayarlardakini istemiyosan sil parantez içindekileri "" at içine durumu yaz
  //watching için 1734e gel kodu atim
};