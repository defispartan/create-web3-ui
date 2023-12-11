import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";
import "./App.css";

function App() {
  const [packageManager, setPackageManager] = useState("npm");
  const [isCopied, setIsCopied] = useState(false);

  const codeBlockStyle: React.CSSProperties = {
    position: "relative",
    width: "300px",
    height: "54px",
    margin: "0px auto",
    textAlign: "center",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid slategray",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px",
    flex: 2,
  };

  const managerText = `${
    packageManager === "bun"
      ? "bunx create web3-ui"
      : packageManager === "pnpm"
      ? "pnpm create web3-ui"
      : packageManager === "yarn"
      ? "yarn create web3-ui"
      : "npx create-web3-ui"
  }`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(managerText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div>
      <h1>Create Web3 UI</h1>
      <h3>{`Web3 Connected in Seconds`}</h3>
      <div
        className="manager-block"
        style={{ textAlign: "center", width: "80%", margin: "0 auto" }}
      >
        <div className="manager">
          {["bun", "pnpm", "yarn", "npm"].map((manager) => (
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                cursor: "pointer",
                borderLeft: "1px solid slategray",
                borderTop: "1px solid slategray",
                borderRight: "1px solid slategray",
                borderBottom: "none",
                backgroundColor:
                  packageManager === manager ? "lightgray" : "transparent",
                color: packageManager === manager ? "black" : "white",
              }}
              key={manager}
              onClick={() => setPackageManager(manager)}
            >
              {manager}
            </div>
          ))}
        </div>
      </div>
      <div style={codeBlockStyle}>
        <SyntaxHighlighter
          language="javascript"
          style={dracula}
          className="codeblock"
        >
          {managerText}
        </SyntaxHighlighter>
        <div
          style={{
            background: "rgb(40, 42, 54)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            paddingRight: "20px",
            cursor: "pointer",
            flex: 1,
            color: `${isCopied ? "green" : "lightgray"}`,
          }}
          onClick={copyToClipboard}
        >
          {isCopied ? <FiCheck size={20} /> : <FiCopy size={20} />}
        </div>
      </div>
      <div
        className="manager-block"
        style={{ textAlign: "center", width: "80%", margin: "0 auto" }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px",
            cursor: "pointer",
            border: "1px solid slategray",
            marginTop: "20px",
            backgroundColor: "rgb(40, 42, 54)",
            color: "rgb(248, 248, 242)",
            justifyContent: "center",
          }}
        >
          Get started at{" "}
          {packageManager === "bun" ? (
            <a target="_blank" href="https://bun.sh">
              https://bun.sh
            </a>
          ) : packageManager === "pnpm" ? (
            <a target="_blank" href="https://pnpm.io">
              https://pnpm.io
            </a>
          ) : packageManager === "yarn" ? (
            <a
              target="_blank"
              href="https://yarnpkg.com/getting-started/install"
            >
              https://yarnpkg.com
            </a>
          ) : (
            <a
              target="_blank"
              href=" https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"
            >
              https://npmjs.com
            </a>
          )}
        </div>
      </div>
      <h2 style={{ paddingTop: "10px" }}>What's Included?</h2>
      <div className="tech-stack">
        <div>React</div>
      </div>
      <div className="tech-stack">
        <div className="tech-stack">Vite</div>
        <div style={{ color: "#f1f1f1" }}>or</div>
        <div className="tech-stack">NextJS</div>
      </div>
      <div className="tech-stack">
        <div className="tech-stack">TypeScript</div>
        <div style={{ color: "#f1f1f1" }}>or</div>
        <div className="tech-stack">JavaScript</div>
      </div>
      <div>
        <div className="tech-stack">Viem</div>
        <div className="tech-stack">Wagmi</div>
        <div className="tech-stack">ConnectKit</div>
      </div>
      <div>
        <div className="tech-stack">Zustand</div>
        <div className="tech-stack">Tanstack Query</div>
      </div>
    </div>
  );
}

export default App;
