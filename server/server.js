const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/mongoose.config');
require('./routes/usuario.routes')(app);
require('./routes/consumer.routes')(app);
require('./routes/reading.routes')(app);

app.listen(port, () => console.log(`Port: ${port}`));
