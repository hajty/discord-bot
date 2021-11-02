const mongoConnector = require('../db/mongoConnector');
const logger = require('../logger/logger').logger;
const validUrl = require('valid-url');

exports.create = async (link) => {
    const isValid = validUrl.isUri(link.link);

    if (!isValid) return 'invalid link';

    const result = await mongoConnector.insertLink(link);

    if (result) {
        logger.info(`Successfully added link ${link.name} to the list.`);
        return true;
    }
    else {return false;}
};

exports.read = async () => {
    const data = await mongoConnector.selectLinks();

    if (data) return data;
    else return null;
};

exports.readOne = async (linkName) => {
    const data = await mongoConnector.selectLink(linkName);

    if (data) return data;
    else return null;
};

// exports.update = (link) => {
// };
//
exports.delete = async (linkName) => {
    if (linkName.length === 0) return 'invalid name';

    return await mongoConnector.deleteLink(linkName);
};