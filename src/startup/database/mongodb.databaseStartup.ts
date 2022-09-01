import { MongoClient } from "mongodb";

const dbName = "shiny_chikorita_db";

const url = `mongodb://localhost:27017/${dbName}`;

const mongoClient = new MongoClient(url);

mongoClient.connect((err: any, client: MongoClient) => {
    if (err) {
        console.log(`There was an error while creating the database: ${err}`);

        process.exit(-1);
    } else {
        console.log("Database successfully created");

        const databaseObject = client.db();

        databaseObject.createCollection("user", (err: any) => {
            if (err) {
                console.log(`There was an error while creating user table: ${err}`);

                process.exit(-1);
            } else {
                console.log("User table successfully created");
            }

            client.close();

            process.exit(0);
        });
    }
});
