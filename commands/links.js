const MessageEmbed = require('discord.js').MessageEmbed;
const linkController = require('../controller/linkController');

module.exports = {
    name: 'links',
    description: '',
    async execute(message, args) {
        switch (args[0]) {
            case undefined : {
                const links = await linkController.read();
                const messageEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Links');
                for (const link of links) messageEmbed.addField(link.name, link.link);
                message.channel.send(messageEmbed);
                break;
            }
            case 'add' : {
                const link = { 'name': args[1], 'link': args[2] };
                const result = await linkController.create(link);

                if (result === 'invalid link') message.channel.send('Incorrect link format.');
                else if (result === true) message.channel.send(`Successfully added link ${link.name} to the list.`);
                else if (result === false) message.channel.send('Error, couldn\'t add link to the list.');
                break;
            }
            case 'delete' : {
                const linkName = args[1];
                const result = await linkController.delete(linkName);

                if (result === 'invalid link') message.channel.send('Incorrect link name.');
                else if (result === true) message.channel.send(`Successfully deleted link ${linkName} from the list.`);
                else message.channel.send(`Error, couldn't delete link ${linkName} from the list.`);
                break;
            }
            default : {
                message.channel.send('Incorrect command.');
            }
        }
    },
};