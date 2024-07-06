
import { Server } from './../src/presentation/server';
import { MongoDatabase } from './../src/data/mongodb';

jest.mock('./../src/presentation/server');
jest.mock('./../src/data/mongodb');

describe('App', () => {
    it('should call the server with the arguments and start', async () => {

        await import('./../src/app');

        expect(MongoDatabase.connect).toHaveBeenCalledWith({
            mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017",
            dbName: process.env.MONGO_DB_NAME || "catAPI"
        });
        expect(MongoDatabase.connect).toHaveBeenCalledTimes(1);

        expect(Server).toHaveBeenCalledWith({
            port: +(process.env.PORT || 3100),
            routes: expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalledTimes(1);
    });
})

