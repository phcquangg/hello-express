'use strict'

const { default: mongoose } = require("mongoose")
const os = require('node:os');

const TIME_INTERVAL = 5000

const countConnects = () => {
  // console.log('Currently have ' + mongoose.connections.length + ' connection(s)');
  return mongoose.connections.length;
}

const checkOverload = () => {
  setInterval(() => {
    const connections = mongoose.connections.length;
    const cores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnections = cores * 5;

    console.log(`
      Active connection: ${connections} \n
      Memory usage: ${Math.floor(memoryUsage / 1024 / 1024)}mb
    `)

    if (connections > maxConnections) console.log('Connection overloaded!');

  }, TIME_INTERVAL) // monitor every 5 seconds
}

module.exports = { countConnects, checkOverload };
