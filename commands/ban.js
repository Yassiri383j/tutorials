var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('**❌ERROR**
You don't have premission to use that command!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('**❌ERROR**, please mention someone!');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(member){
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Sorry, You don't have permission to use this command!');
    }

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('You need to give a reason!');

    var channel = msg.guild.channels.cache.find(c => c.name === 'potato');

    var log = new Discord.MessageEmbed()
    .setTitle('User Banned')
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle('You were banned!')
    .setDescription(reason);

    try {
        await user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    msg.guild.members.ban(user); // This should not be user.id like I said in my video. I made a mistake. Sorry! :)

    msg.channel.send(`**${user}** has been banned by **${msg.author}**!`);
}
