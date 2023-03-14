const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../shade.json")  //bu kodda alıntı bulunmaktadır discord.gg/1734

module.exports.run = async (client, message, args) => {

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author

const shadexdembed = new Discord.MessageEmbed()
.setColor("2f3136")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

let isimler = db.get(`isimler.${etiketlenenKişi.id}`) || [];
isimler = isimler.reverse()
let isimler2 = isimler.length > 0 ? isimler.map((value) => `${ayarlar.tag} ${value.İsim} ${ayarlar.sembol} ${value.Yaş}  ( <@!${value.Yetkili}> )`).join("\n") : `${ayarlar.no} ${etiketlenenKişi} üyesine ait herhangibi bir veri bulamadım!`

message.react(ayarlar.yes)

message.channel.send(shadexdembed .setDescription(`
${ayarlar.yes} ${etiketlenenKişi} kullanıcısına ait isimler:
${isimler2}
`))

}
exports.config = {
    name: "isimler",
    guildOnly: true,
    aliases: ["names", "nicknames","isimler","isimveri","veri-isim"]
}