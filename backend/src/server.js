const app = require('./app');

const host = '127.0.0.1';
const port = 3333;

app.listen(port, host,() => console.log(`Server is running att http://${host}:${port}`));

module.exports = app;
