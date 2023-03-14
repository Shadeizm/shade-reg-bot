//eğer yardıma ihtiyacınız varsa discord.gg/1734 sunucusuna bekleriz :)

const Discord = require("discord.js")

const client = new Discord.Client()

const ayarlar = require("./shade.json")

const moment = require("moment")

const fs = require("fs")

const db = require("quick.db")

const chalk = require("chalk")


require('./util/Loader')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()


fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} sayıda komut yükleniyor...`)
  files.forEach(f => {                    
    let props = require(`./commands/${f}`)
    console.log(` ${props.config.name} komutu yüklendi.`)
    client.commands.set(props.config.name, props)
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name)
    });
  });
})

client.on('message', async message => {
  
  if(message.content === '.tag') {
    message.channel.send(`\`${ayarlar.tag} , ${ayarlar.etikettag}\``)
  }
  })

client.on("ready", () => {
    console.log(chalk.redBright(`Shade Bots  Aktif`))
})



client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "unfined").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `0`,  //sunucudaki sayı emojilerini tanımlayabilirsiniz
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`,
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.hosgeldinKanal)); 
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = `Sunucumuzda hesabın kayıta uygun görünmüyor. `
  if (kurulus > 1296000000) kontrol = `Sunucumuzda hesabın kayıta uygun görünüyor.`
    moment.locale("tr");
  
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
  
 guild.channels.cache.get(ayarlar.hosgeldinKanal).send(`
Sunucumuza hoş geldin, <@`+ member + `>! Sayende sunucumuz **`+üyesayısı+`** kişi. 
    

`+kontrol+`
    
Tagımızı (tagyaz) alarak bize destek olabilirsin`)});

//giriş yeri

client.login(ayarlar.token)
