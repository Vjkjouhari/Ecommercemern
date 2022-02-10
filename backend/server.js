const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");


dotenv.config({ path:"backend/config/config.env" });
// connectDatabase()

app.listen(process.env.PORT,() => {
    console.log(`server is running on http://locahost:${process.env.PORT}`)
});

