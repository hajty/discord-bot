module.exports = {
    name: 'delete',
    description: '',
    async execute(message, args) {
        const number = parseInt(args[0]);
        if (!args.length) {message.channel.send('Say how many messages should I delete...');}
        else if (isNaN(number)) {
            message.channel.send('You should provide number of message to delete, not text...');
            return;
        }
        if (number === 0) {message.channel.send('Hahaha...');}
        else if (number > 0 && number <= 100) {
            await message.channel.bulkDelete(number);
            message.channel.send('Done. :)');
        }
    },
};