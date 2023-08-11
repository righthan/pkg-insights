#! /usr/bin/env node

import figlet from "figlet";
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { runServer } from "./server";
import open from "open";

const program = new Command();

program
  .version("1.0.0")
  .description(
    chalk.blue("A tool for analyse the npm dependencies of the project")
  )
  .option(
    "-d, --depth <value>",
    "Input the depth of the packages you want to analyse"
  )
  .option("--json <file-path>", "Don't open the website, show me the json file")
  .parse(process.argv);

// 命令选项的参数
const options = program.opts();

// 输出logo
console.log(chalk.blue(figlet.textSync("Pkg - Insights")));

// 如果命令没有参数则输出命令提示
if (!process.argv.slice(2).length) {
  program.outputHelp();
  console.log(
    chalk.red(`[Error] command options not found, use the options above`)
  );
  process.exit();
}

// 获取当前工作目录
const cwd = process.cwd();

// 定义package.json文件的路径
const packageJsonPath = path.join(cwd, "package.json");

// 使用fs模块的readFile方法读取文件内容
fs.readFile(packageJsonPath, "utf8", (err: any, data: any) => {
  if (err) {
    console.error(
      chalk.red(
        `[Error] no package.json file was found in current path: ${cwd}, \n\tmake sure that you have a package.json file in the current working directory`
      )
    );
    // return;
    process.exit();
  }
  // 打印文件内容
  // console.log('the packages in dependencies:\n',JSON.parse(data).dependencies);

  // 启动服务器
  const url = runServer();

  // 调用默认浏览器打开网址
  open(url);
});
