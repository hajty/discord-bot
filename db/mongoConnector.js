const access = require('../config/config').mongo;
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${access.username}:${access.password}@discordbot.vki0m.mongodb.net/${access.dbname}?retryWrites=true&w=majority`;
const logger = require('../logger/logger').logger;

const connect = async () => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        logger.info('Connected to the database.');

        return client;
    }
    catch (e) {
        logger.error(`Cannot connect to the database. Error: ${e}`);
        return 'error';
    }
};

const close = (client) => {
    client.close().then(() => logger.info('Connection to the database closed.'));
};

exports.selectLinks = async () => {
    try {
        const client = await connect();
        const db = client.db(access.dbname);
        const collection = db.collection('links');
        const data = await collection.find().toArray();

        close(client);

        return data;
    }
    catch (e) {
        logger.error(`Cannot select items from database ${access.dbname} and collection links. Error: ${e}`);
    }
};

exports.selectLink = async (linkName) => {
    try {
        const client = await connect();
        const db = client.db(access.dbname);
        const collection = db.collection('links');
        const data = await collection.findOne({ 'name': linkName });

        close(client);
        if (data) logger.info(`Found link ${data.name} in the database ${access.dbname} and collection ${collection.collectionName}.`);
        return data;
    }
    catch (e) {
        logger.error(`Cannot select items from database ${access.dbname} and collection links. Error: ${e}`);
    }
};

exports.insertLink = async (link) => {
    try {
        const client = await connect();
        const db = client.db(access.dbname);
        const collection = db.collection('links');

        const result = await collection.insertOne(
            {
                'name': link.name,
                'link': link.link,
            });

         if (result) logger.info(`Successfully added link ${result.ops[0].name} to the database.`);
        close(client);
        return result;
    }
    catch (e) {
        logger.error(`Cannot insert item to the database ${access.dbname} and collection links. Error: ${e}`);
        return false;
    }
};

exports.deleteLink = async (linkName) => {
    try {
        const client = await connect();
        const db = client.db(access.dbname);
        const collection = db.collection('links');

        const result = await collection.deleteOne({name: linkName});

        console.log(result.ok);

        if (result.deletedCount === 1) {
            logger.info(`Successfully deleted link ${linkName} from the database.`);
            close(client);
            return true;
        }
    }
    catch (e) {
        logger.error(`Cannot delete item ${linkName} from the database ${access.dbname}  and collection links. Error: ${e}`);
        return false;
    }
};