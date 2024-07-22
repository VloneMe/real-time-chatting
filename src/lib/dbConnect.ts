import mongoose from "mongoose";

const connection = { isConnected: 0 };

async function dbConnect() {
    // Check if already connected
    if (connection.isConnected) {
        return;
    }

    // Connect to MongoDB using Mongoose
    try {
        const db = await mongoose.connect(process.env.MONGO_URL!, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        // Update connection state
        connection.isConnected = db.connections[0].readyState;
        console.log("[server]: Database connected:", connection.isConnected);
    } catch (error) {
        console.error("[server]: Database connection error:", error);
        throw new Error("[server]: Failed to connect to the database");
    }
}

export default dbConnect;