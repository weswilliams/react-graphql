import Sequelize from 'sequelize';
import logger from "../helpers/logger";
require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
  logger.log({level:"info", message:"dev: loading require-context"});
  require('babel-plugin-require-context-hook/register')()
}

export default (sequelize) => {
  let db = {};

  const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync')
  context.keys().map(context).forEach(module => {
    const model = module(sequelize, Sequelize);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
