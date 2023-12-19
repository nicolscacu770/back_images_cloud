const express = require('express');
const router = require('./routers/index.routers');
const cors = require('cors');

require('./services/connectDB');
const app = express();

app.use(cors());

//setters
app.set('PORT', process.env.PORT || 3001);
app.set(express.json());

//middlewares
router(app);
app.use("/", (req, res) => res.send("welcome to API images cloud"));


app.listen(app.get('PORT'), () => console.log( `server Listen to port ${app.get('PORT')}` ) )
