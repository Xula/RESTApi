const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bp = require('body-parser');

require('dotenv/config');

const app = express();
const port = 3000;
const postsRoute = require('./routes/posts');

//CORS is used to allow other domains access the api
app.use(cors());

// BodyParser is used to parse the requests (if not used, e can't access req.body for instance)
app.use(bp.json());

//Import routes
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('Home page!');
});

//Connect to database mongo Altas, after connect we can start the server
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
.then( () => {
    console.log('Connected to DB!');

    app.listen(port, () => {
        console.log(`Running on http://localhost:${port}`);
    });
})
.catch( err => console.error(err));