import "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./database/db.js";

const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
