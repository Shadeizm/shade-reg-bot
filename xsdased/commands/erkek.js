const Discord = require("discord.js")

const db = require("quick.db")  //shadexrdddd

const ayarlar = require("../shade.json") //shadexrdddd
module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(shadexdd => message.member.roles.cache.has(shadexdd)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} Register işlemini gerçekleştirmek için <@&${ayarlar.yetkiliRol}> yetkisinine sahip olman gerekiyor!`).then(message.react(client.emojis.cache.get(ayarlar.no)))
  
    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **Kimi kayıt edeciğim?**`)
message.react(ayarlar.no)
 
const isim = args[1];
const yaş = args[2];
if(!isim) return message.channel.send(`${ayarlar.no} **İsmini ne yapıcağım?**`)
.then(message.react(client.emojis.cache.get(ayarlar.no))) //mesaja emoji ile react ediyor
if(!yaş) return message.channel.send(`${ayarlar.no} **Yaşını ne yapacağım?**`)
.then(message.react(client.emojis.cache.get(ayarlar.no)))
if(isNaN(yaş)) return message.channel.send(`${ayarlar.no} **Lütfen yaşını rakam olarak belirt**`)
.then(message.react(client.emojis.cache.get(ayarlar.no)))
  
etiketlenenKişi.roles.add(ayarlar.kadınRol1)
etiketlenenKişi.roles.add(ayarlar.kadınRol)
etiketlenenKişi.roles.remove(ayarlar.kayıtsızRol)
etiketlenenKişi.setNickname(`${ayarlar.tag} ${isim} ${ayarlar.sembol} ${yaş}`)

message.react(ayarlar.yes)

const shadexdembed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Kayıt olan kullanıcının ismi \`${ayarlar.tag} ${isim} ${ayarlar.sembol} ${yaş}\` olarak değiştirildi ve <@&${ayarlar.erkekRol1}> rolü verildi!`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})) 
.setTimestamp()

message.channel.send(shadexdembed)

db.push(`isimler.${etiketlenenKişi.id}`, {
İsim: isim,
Yaş: yaş,
Yetkili: message.author.id
})

db.add(`erkekTeyit.${message.member.id}`, `1`)
db.add(`toplamTeyit.${message.member.id}`, `1`)

client.channels.cache.get(ayarlar.sohbetKanal).send(`${etiketlenenKişi} **kayıt olarak ailemize katıldı! Ona sıcak bir merhaba diyin :)**`)
client.channels.cache.get(ayarlar.logkanal).send("${etiketlenenKişi}  ${message.member.id} yetkilisi tarafından kayıt edildi!")
  
}
exports.config = {
    name: "erkek",
    guildOnly: true,
    aliases: ["e", "male","erkek","erkekkayıt"]
}