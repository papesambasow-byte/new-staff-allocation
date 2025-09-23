const { Client } = require("ssh2");

const sshConfig = {
  host: "172.25.160.235",
  username: "conteh1629079",
  password: "Orange@2222",
};

const sshConnection = new Client();

sshConnection.on("ready", () => {
  console.log("SSH connection establishedd!!");
});

sshConnection.connect(sshConfig);

module.exports = sshConnection;
