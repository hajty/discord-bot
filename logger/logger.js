const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: 'logs.log',
        timestampFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    log = SimpleNodeLogger.createSimpleLogger(opts);

exports.logger = log;