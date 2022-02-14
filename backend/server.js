const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");
// ===============================
//handling uncaught exception

process.on("uncaughtException", (err) => {
    console.log(`error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Error`);
    process.exit(1);
})
// ===============================

dotenv.config({ path:"backend/config/config.env" });
// connectDatabase()

const server =  app.listen(process.env.PORT,() => {
    console.log(`server is running on http://locahost:${process.env.PORT}`)
});

// =============================
//unhandled promise rejections
process.on("unhandledRejection", err =>{
    console.log(`Error:$(err.message)`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(()=>{
        process.exit(1);
    });

});
// ================================
