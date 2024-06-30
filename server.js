const app = require("./src/app");

const PORT = 1221;

const server = app.listen(PORT, () => console.log('server started on port ' + PORT))

process.on('SIGINT', () => server.close(() => console.log('Server exited')))