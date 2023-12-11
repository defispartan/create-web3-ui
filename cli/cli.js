#!/usr/bin/env node

import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { input } from "@inquirer/prompts";
import { Command } from "commander";
import select from "@inquirer/select";
import { execaCommand } from "execa";
import ora from "ora";
import childProcess from "child_process";

const log = console.log;
const program = new Command();
const green = chalk.green;

const isYarnInstalled = () => {
  try {
    childProcess.execSync("yarn --version");
    return true;
  } catch {
    return false;
  }
};

const isBunInstalled = () => {
  try {
    childProcess.execSync("bun --version");
    return true;
  } catch (err) {
    return false;
  }
};

const isPnpmInstalled = () => {
  try {
    childProcess.execSync("pnpm --version");
    return true;
  } catch (err) {
    return false;
  }
};

async function main() {
  const spinner = ora({
    text: "Creating codebase",
  });

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
          /*   {
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
          }, */
        ],
      });
    }
    let repoUrl = "https://github.com/defispartan/create-web3-ui.git";
    let subDirPath = "";
    switch (type) {
      case "vite-react-ts":
        subDirPath = "templates/vite/react-ts";
        break;
      /*   case "vite-react-js":
        subDirPath = "templates/vite/react-js";
        break;
      case "next-js":
        subDirPath = "templates/nextjs/js";
        break;
      case "next-ts":
        subDirPath = "templates/nextjs/ts";
        break; */
    }

    spinner.start();

    const __dirname = dirname(fileURLToPath(import.meta.url));
    let tempDir = path.join(__dirname, "temp");
    let finalDir = path.join(process.cwd(), appName);

    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }

      await execaCommand(`git clone ${repoUrl} ${tempDir}`);
      let subDirFullPath = path.join(tempDir, subDirPath);

      // Check if the subdirectory exists
      if (!fs.existsSync(subDirFullPath)) {
        log(
          `The subdirectory '${subDirPath}' does not exist in the repository.`
        );
        throw new Error(
          `The subdirectory '${subDirPath}' does not exist in the repository.`
        );
      }

      // Move contents from the subdirectory to the final directory
      fs.mkdirSync(finalDir, { recursive: true });
      fs.readdirSync(subDirFullPath).forEach((file) => {
        let srcPath = path.join(subDirFullPath, file);
        let destPath = path.join(finalDir, file);
        fs.renameSync(srcPath, destPath);
      });

      // Remove the temporary directory
      fs.rmSync(tempDir, { recursive: true });
    } catch (e) {
      log("\n");
      log("Error occurred while cloning and moving files");
      log(e);
      return;
    }

    let packageJson = fs.readFileSync(`${appName}/package.json`, "utf8");
    const packageObj = JSON.parse(packageJson);
    packageObj.name = appName;
    packageJson = JSON.stringify(packageObj, null, 2);
    fs.writeFileSync(`${appName}/package.json`, packageJson);

    process.chdir(finalDir, appName);
    spinner.text = "";
    let startCommand = "";

    const lockFiles = [
      "package-lock.json",
      "yarn.lock",
      "bun.lockb",
      "pnpm-lock.yaml",
    ];
    const bun = isBunInstalled();
    const pnpm = isPnpmInstalled();
    const yarn = isYarnInstalled();

    const keepLockFile = bun
      ? "bun.lockb"
      : pnpm
      ? "pnpm-lock.yaml"
      : yarn
      ? "yarn.lock"
      : "package-lock.json";

    lockFiles.forEach(async (file) => {
      if (file !== keepLockFile) {
        try {
          if (fs.existsSync(path.join(finalDir, file)))
            fs.unlinkSync(path.join(finalDir, file));
        } catch (err) {
          log("\n");
          log("error");
          log(err);
        }
      } else {
        log("\n");
        log("installing");
        if (bun) {
          spinner.text = `Installing dependencies:`;
          await execaCommand("bun install").pipeStdout(process.stdout);
          spinner.text = "";
          startCommand = "bun run dev";
        } else if (pnpm) {
          await execaCommand("pnpm install").pipeStdout(process.stdout);
          startCommand = "pnpm run dev";
        } else if (yarn) {
          spinner.text = "Installing dependencies";
          await execaCommand("yarn install").pipeStdout(process.stdout);
          spinner.text = "";
          startCommand = "yarn dev";
        } else {
          spinner.text = "Installing dependencies";
          await execaCommand("npm install").pipeStdout(process.stdout);
          spinner.text = "";
          startCommand = "npm run dev";
        }
        spinner.stop();
        log(
          `${green.bold("Success!")} Created ${appName} at ${process.cwd()} \n`
        );

        const changeDir = await input({
          type: "confirm",
          name: "change",
          default: "y",
          message: "Switch to the created directory (y/n)?",
        });

        if (changeDir === "y") {
          process.chdir(finalDir);
          log(`Switched to directory: ${finalDir}`);

          const runDevServer = await input({
            type: "confirm",
            name: "runServer",
            default: "y",
            message: "Start development server (y/n)?",
          });

          if (runDevServer === "y") {
            log("Starting development server...");
            execaCommand(startCommand, { stdio: "inherit" });
          }
        } else {
          log(
            `To get started, change into the new directory and run ${chalk.cyan(
              startCommand
            )}`
          );
        }
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
