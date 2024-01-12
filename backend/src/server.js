const express = require('express'); 
const router = require('./router')

const app = express();

const port = 3333;

app.listen(port, () => console.log(`Server running on port: ${port}`));

app.use(express.json());
app.use(router);


