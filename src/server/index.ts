import express from "express";
import path from "path";
import chalk from "chalk";

const PORT = 8999;

export function runServer() :string {
  const app = express();

  app.use(express.static("public"));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });

  const url = 'http://localhost:'+PORT
  // start the server
  app.listen(PORT, () => {
    console.log(
      `\nthe packages of this project can be analysed in the follow site:\n\t----> ${chalk.blue(url)}`
    );
  });

  return url
}

