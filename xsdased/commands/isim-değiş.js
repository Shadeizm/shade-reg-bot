const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../shade.json")  //bu kodda alıntı bulunmaktadır.

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(shadexdd => message.member.roles.cache.has(shadexdd)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`)
    .then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **İsim değiştirmek için bir kişi etiketlemelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

const isim = args[1];
const yaş = args[2];
if(!isim) return message.channel.send(`${ayarlar.no} **Kullanıcının ismini değiştirmek için bir isim belirtmelisin.**`)
.then(message.react(client.emojis.cache.get(ayarlar.no)))
if(!yaş) return message.channel.send(`${ayarlar.no} **Kullanıcının ismini değiştirmek için bir yaş belirtmelisin.**`)
.then(message.react(client.emojis.cache.get(ayarlar.no)))
if(isNaN(yaş)) return message.channel.send(`${ayarlar.no} **Belirttiğin yaş rakamlardan oluşmalı.**`)
.then(message.react(client.emojis.cache.get(ayarlar.no)))

etiketlenenKişi.setNickname(`${ayarlar.tag} ${isim} ${ayarlar.sembol} ${yaş}`) //shadexdd discord.gg/1734

message.react(ayarlar.yes)

const shEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Kullanıcının ismi \`${ayarlar.tag} ${isim} ${ayarlar.sembol} ${yaş}\` olarak değiştirildi!`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})) //shadexdd discord.gg/1734
.setTimestamp()

message.channel.send(shEmbed)

db.push(`isimler.${etiketlenenKişi.id}`, {
İsim: isim,
Yaş: yaş,
Yetkili: message.author.id
})

}
exports.config = {
    name: "isim",
    guildOnly: true,
    aliases: ["i", "nick",,"isim","isim-değiştir"]
}