#!/usr/bin/env node

import chalk from "chalk";
import path from "path";
import fs from "fs";
import { input } from "@inquirer/prompts";
import { Command } from "commander";
import select from "@inquirer/select";
import { execa, execaCommand } from "execa";
import ora from "ora";

const log = console.log;
const program = new Command();
const green = chalk.green;

async function main() {
  const spinner = ora({
    text: "Creating codebase",
  });
  function getPackageManager() {
    if (process.env.npm_execpath?.includes("bun")) {
      return "bun";
    } else if (process.env.npm_execpath?.includes("pnpm")) {
      return "pnpm";
    } else if (process.env.npm_execpath?.includes("yarn")) {
      return "yarn";
    } else {
      return "npm";
    }
  }

  try {
    const kebabRegez = /^([a-z]+)(-[a-z0-9]+)*$/;

    program
      .name("Create Web3 UI")
      .description("Generate template for Web3 frontend application.")
      .option(
        "-f, --framework <web project framework>",
        "Choose a web project framework. Options: vite-react-js, vite-react-ts, next-js, next-ts"
      );

    program.parse(process.argv);

    const options = program.opts();
    const args = program.args;
    let type = options.framework;
    let appName = args[0];

    if (!appName || !kebabRegez.test(args[0])) {
      appName = await input({
        message: "Enter your app name",
        default: "my-web3-ui",
        validate: (d) => {
          if (!kebabRegez.test(d)) {
            return "please enter your app name in the format of my-app-name";
          }
          return true;
        },
      });
    }

    if (
      !type ||
      (type !== "vite-react-js" &&
        type !== "vite-react-ts" &&
        type !== "next-js" &&
        type !== "next-ts")
    ) {
      type = await select({
        message: "Select an app type",
        choices: [
          {
            name: "vite-react-ts",
            value: "vite-react-ts",
            description: "Template for a Vite + React + TypeScript project",
          },
          {
            name: "vite-react-js",
            value: "vite-react-js",
            description: "Template for a Vite + React project",
          },
          {
            name: "next-js",
            value: "next-js",
            description: "Template for a Next.js project",
          },
          {
            name: "next-ts",
            value: "next-ts",
            description: "Template for a Next.js + TypeScript project",
          },
        ],
      });
    }
    let repoUrl = "https://github.com/defispartan/create-web3-ui.git";
    let subDirPath = "";
    switch (type) {
      case "vite-react-ts":
        subDirPath = "templates/vite/react-ts";
        break;
      case "vite-react-js":
        subDirPath = "templates/vite/react-js";
        break;
      case "next-js":
        subDirPath = "templates/next-js";
        break;
      case "next-ts":
        subDirPath = "templates/next-ts";
        break;
    }

    spinner.start();

    try {
      await execaCommand(`git init ${appName}`);
      await execaCommand(`git -C ${appName} remote add origin ${repoUrl}`);
      await execaCommand(`git -C ${appName} config core.sparseCheckout true`);
      await fs.writeFileSync(
        `${appName}/.git/info/sparse-checkout`,
        subDirPath
      );
      await execaCommand(`git -C ${appName} pull origin main`);
    } catch (e) {
      log("GH clone error");
      log(e);
    }

    let packageJson = fs.readFileSync(`${appName}/package.json`, "utf8");
    const packageObj = JSON.parse(packageJson);
    packageObj.name = appName;
    packageJson = JSON.stringify(packageObj, null, 2);
    fs.writeFileSync(`${appName}/package.json`, packageJson);

    process.chdir(path.join(process.cwd(), appName));
    spinner.text = "";
    let startCommand = "";

    const packageManager = getPackageManager();

    const lockFiles = [
      "package-lock.json",
      "yarn.lock",
      "bun.lockb, pnpm-lock.yaml",
    ];
    const keepLockFile =
      packageManager === "bun"
        ? "bun.lockb"
        : packageManager === "pnpm"
        ? "pnpm-lock.yaml"
        : packageManager === "yarn"
        ? "yarn.lock"
        : "package-lock.json";

    lockFiles.forEach(async (file) => {
      if (file !== keepLockFile) {
        try {
          fs.unlinkSync(path.join(appName, file));
        } catch (err) {
          // Handle error if file does not exist
        }
      } else {
        if (isBunInstalled()) {
          spinner.text = "Installing dependencies";
          await execaCommand("bun install").pipeStdout(process.stdout);
          spinner.text = "";
          startCommand = "bun run dev";
          console.log("\n");
        } else if (isYarnInstalled()) {
          await execaCommand("yarn").pipeStdout(process.stdout);
          startCommand = "yarn dev";
        } else if (isPnpmInstalled()) {
          spinner.text = "Installing dependencies";
          await execa("pnpm", ["install", "--verbose"]).pipeStdout(
            process.stdout
          );
          spinner.text = "";
          startCommand = "pnpm run dev";
        } else {
          spinner.text = "Installing dependencies";
          await execa("npm", ["install", "--verbose"]).pipeStdout(
            process.stdout
          );
          spinner.text = "";
          startCommand = "npm run dev";
        }
        spinner.stop();
        log(
          `${green.bold("Success!")} Created ${appName} at ${process.cwd()} \n`
        );
        log(
          `To get started, change into the new directory and run ${chalk.cyan(
            startCommand
          )}`
        );
      }
    });
  } catch (err) {
    log("\n");
    if (err.exitCode == 128) {
      log("Error: directory already exists.");
    }
    spinner.stop();
  }
}
main();
