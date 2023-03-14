const Discord = require("discord.js")
const ayarlar = require("../shade.json") //bu kod alıntıdır

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi yapmak için yeterli yetkin bulunmuyor!**`)
    .then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **Kayıtsıza atmak için bir kişi etiketlemelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

if(message.member.roles.highest.position <= etiketlenenKişi.roles.highest.position) return message.channel.send(`${ayarlar.no} **Senden üstte/aynı pozisyonda bir kişiyi kayıtsıza atamazsın!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

const shadexdd = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

etiketlenenKişi.roles.set([ayarlar.kayıtsızRol])
etiketlenenKişi.setNickname(`${ayarlar.tag} İsim ${ayarlar.sembol} Yaş`)

message.react(ayarlar.yes)

message.channel.send(shadexdd.setDescription(`Kullanıcı başarıyla kayıtsıza (<@&${ayarlar.kayıtsızRol}>) atıldı!`))//Youtube Matthe

}
exports.config = {
    name: "kayıtsız",
    guildOnly: true,
    aliases: ["unregistered", "kayitsiz", "unreg", "unregister"]
}