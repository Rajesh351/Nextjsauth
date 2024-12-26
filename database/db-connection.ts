import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connections = mongoose.connection;

        connections.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connections.on("error", (error) => {
            console.error("MongoDB connection error:", error);
            process.exit(1);
        });
    } catch (err) {
        console.error("Error during MongoDB connection:", err);
    }
};
