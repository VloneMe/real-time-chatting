import mongoose from "mongoose";

const connect = async (): Promise<void> => {
    if (mongoose.connections[0].readyState) return;

    const mongo_url = process.env.MONGO_URL;
    console.log(mongo_url)

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`[server]: Database successfully connected!`);
    } catch (err: any) {
        console.error(`[server]: Error connecting to database: ${err.message}`);
        throw new Error(`[server]: Error connecting to database!`);
    }
};

export default connect;