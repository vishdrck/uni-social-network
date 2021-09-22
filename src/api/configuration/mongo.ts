import * as mongoose from 'mongoose';

import environment from '../env';
import logger from '../helpers/logger';

export class MongoConnection {
  public connect(): void {
    const mongoDB = `mongodb://localhost/${environment.getDBName()}`;

    // @ts-ignore
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

    // @ts-ignore
    mongoose.set('useCreateIndex', true);
    // @ts-ignore
    mongoose.set('useFindAndModify', false);
    // @ts-ignore
    mongoose.set('useUnifiedTopology', true);


    const db = mongoose.connection;

    db.once('open', function () {
      logger.log(`Mongo: Connected to database ${environment.getDBName()}`);
    });
  }
}
