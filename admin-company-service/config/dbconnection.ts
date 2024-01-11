import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const dbName = process.env.DB_NAME, host = process.env.DB_HOST, dialect = process.env.DB_DIALECT, password = process.env.DB_PASSWORD, username = process.env.DB_USERNAME;

if (!(dbName && host && password && username )) {
  throw new Error('Required DB Credentials are missing!');
}

const sequelize = new Sequelize(dbName, username, password, {
  host,
  dialect:'postgres'
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

export default sequelize;