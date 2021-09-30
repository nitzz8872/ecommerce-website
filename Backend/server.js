const app = require('./app');
const connectDatabase = require('./config/database')

const dotenv = require('dotenv').config({ path: 'backend/config/config.env' });


//handle uncaught exceptions

process.on('uncaughtException', err=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
})


//connec database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server startedon PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

//handle unhandeled promise rejections

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})