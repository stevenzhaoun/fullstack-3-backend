import express from "express";
import rolesRouter from "./routes/roles";

const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(rolesRouter);

app.listen(8888, () => {
    console.log('Server is running on port 8888')
})