const express = require("express");
const redis = require("redis");

const app = express();


app.listen(3001, ()=> console.log(`This published server is runing http://localhost:3001`));