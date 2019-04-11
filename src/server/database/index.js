import Sequelize from 'sequelize';
import configFile from '../config/';
import models from '../models';
import logger from '../helpers/logger';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

logger.log({ level: 'info', message: 'connecting to db' + config.database + ' for user ' + config.username });
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
  models: models(sequelize),
  sequelize,
};

export default db;
