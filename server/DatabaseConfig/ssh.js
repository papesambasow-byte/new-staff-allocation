const { Client } = require("ssh2");

const sshConfig = {
  host: "172.25.160.235",
  username: "conteh1629079",
  password: "Orange@2222",

};

const establishSshTunnel = () => {
  return new Promise((resolve, reject) => {
    const sshConnection = new Client();

    sshConnection.on("ready", () => {
      console.log("SSH connection established!!");
      resolve(sshConnection);
    });

    sshConnection.on("error", (err) => {
      console.error("SSH connection error:", err);
      reject(err);
    });

    sshConnection.connect(sshConfig);
  });
};

module.exports = establishSshTunnel;