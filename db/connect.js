const { connect } = require("mongoose");
const { MONGO_URI } = require("./config");

const connection = {};

module.exports = async function dbConnect() {
  if (connection.isConnected) return;
  const db = await connect(MONGO_URI);
  //   console.log("DB connected", db.connection);
  connection.isConnected = db.connections[0].readyState;
};
