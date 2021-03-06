const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, msg) => {

const radio = {
    "number1": "http://20723.live.streamtheworld.com/NUMBER1FM_SC?type=.mp3",
    "powerturk": "http://listen.powerapp.com.tr/powerturk/mpeg/icecast.audio?/;stream.nsv",
    "power": "http://listen.powerapp.com.tr/powerfm/mpeg/icecast.audio?/;stream.nsv",
    "metrofm": "http://17703.live.streamtheworld.com/METRO_FM_SC?type=.mp3",
    "fenomen": "http://listen.radyofenomen.com/fenomen/128/icecast.audio?/;stream.nsv",
    "civasradyo": "http://radyo1.radyo-dinle.tc:8170/stream",
    "slowtr": "https://radyo.dogannet.tv/slowturk",
    "joyturk": "http://17733.live.streamtheworld.com/JOY_TURK_SC",
    "ulkufm": "http://yayin.canliradyolive.com/ulku-fm/live/icecast.audio",
}
            if (!msg.guild.voiceConnection) {
                if (!msg.member.voice.channel) return msg.channel.send('❎ | Lütfen bir **odaya gir!**')
            }
            let args = msg.content.split(" ").slice(1).join(" ").toLowerCase();
      if (!args) return msg.channel.send('❎ | Bir **radyo seçin:** **civasradyo** | **powerturk** | **fenomen** | **metrofm** | **number1** | **joyturk** | **slowtr** | **ulkufm**')
        if(!radio[args]) return msg.channel.send('❎ | Lütfen yandaki Radyolardan **birini seç:** **civasradyo** | **number1** | **powerturk** | **fenomen** | **metrofm** | **joyturk** | **slowtr** | **ulkufm**')
    msg.member.voice.channel.join().then(connection => {
    require('http').get(radio[args], (res) => {
            connection.play(res);
     let embed = new Discord.MessageEmbed()
        .setAuthor("Radyo Çalınıyor", `https://cdn.discordapp.com/emojis/475822981277286400.gif`)
        .setColor("RANDOM")
        .addField("RADYO", args)
        .setFooter(msg.author.username, msg.author.avatarURL());
     msg.channel.send(embed);
          });
  });
  client.on('message', msg => {
  if (msg.author.id === client.user.id) return
  if (msg.content.startsWith('radyo-kapat')) {

    if (!msg.member.voice.channel) return msg.channel.send(new Discord.MessageEmbed()
    .setColor('#C34E4E')
    .setDescription('❎ | Sesli bir kanalda değilsin!'));

    msg.member.voice.channel.leave()
    return msg.channel.send(new Discord.MessageEmbed()
    .setColor('#C34E4E')
    .setDescription('❎ | Radyo kapatıldı!'));

}});
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["radio"],
    permLevel: 0
};
exports.help = {
    name: "radyo",
    description: "Belirtilen radyo istasyonunu bulunduğu kanalda paylaşır.",
    usage: "radyo <name>"
};
