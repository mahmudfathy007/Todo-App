import { MongoClient } from "mongodb";


export const connection = async () => {
  try {
    const client = await MongoClient.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
    return client.db();
  } catch (error) {
    console.log("DB Error", error);
    throw error;
  }
};

