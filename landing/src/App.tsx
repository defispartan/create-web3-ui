import { CSSProperties, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";
import "./App.css";

function App() {
  const [packageManager, setPackageManager] = useState("npm");
  const [isCopied, setIsCopied] = useState(false);

  const boxes = [
    {
      title: "Template Project",
      images: [
        { src: "/react.png", text: "React", link: "https://react.dev" },
        { src: "/vite.svg", text: "Vite", link: "https://vitejs.dev" },
        {
          src: "/jsts.png",
          text: "TypeScript or JavaScript",
          link: "https://typescriptlang.org",
        },
      ],
    },
    {
      title: "EVM Developer Tooling",
      images: [
        { src: "/wevm.jpg", text: "Viem + Wagmi", link: "https://wevm.dev" },
      ],
    },

    {
      title: "Wallet Library",
      images: [
        {
          src: "/connectwallet.png",
          text: "ConnectKit",
          link: "https://docs.family.co/connectkit/try-it-out",
        },
      ],
    },
    {
      title: "State Management",
      images: [
        {
          src: "/zustand.png",
          text: "Zustand",
          link: "https://github.com/pmndrs/zustand",
        },
        {
          src: "/react-query.png",
          text: "TanStack Query",
          link: "https://tanstack.com/query",
        },
      ],
    },
  ];

  const codeBlockStyle: CSSProperties = {
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
    background: "rgb(40, 42, 54)",
  };

  const managerText =
    packageManager === "bun"
      ? "bunx create-web3-ui"
      : packageManager === "pnpm"
      ? "pnpm create web3-ui"
      : packageManager === "yarn"
      ? "yarn create web3-ui"
      : "npx create-web3-ui";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(managerText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="background">
      <div className="background-anim">
        <div className="content-wrapper">
          <h1 className="header-text">Create Web3 UI</h1>
          <h3>Web3 Connected in Seconds</h3>
          <div className="manager-block">
            <div className="manager">
              {["bun", "pnpm", "yarn", "npm"].map((manager) => (
                <div
                  className={
                    packageManager === manager
                      ? "manager-option selected"
                      : "manager-option"
                  }
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
            <div className="clipboard-container" onClick={copyToClipboard}>
              {isCopied ? <FiCheck size={20} /> : <FiCopy size={20} />}
            </div>
          </div>
          <div className="manager-block">
            <div className="get-started-link">
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
          <h3 className="demo">
            <a
              href="https://create-web3-ui-demo.vercel.app/"
              target="_blank"
              className="serif"
            >
              Demo
            </a>
          </h3>
          <h2>What's Included?</h2>
          <div className="box-container">
            {boxes.map((box, index) => (
              <div className="box" key={index}>
                <h2 className="box-title serif">{box.title}</h2>
                <div className="box-content">
                  {box.images.map((image, imageIndex) => (
                    <div className="box-image-container" key={imageIndex}>
                      <a href={image.link} target="_blank">
                        <img
                          src={image.src}
                          alt={image.text}
                          className={
                            image.src === "/connectwallet.png"
                              ? "connect-image"
                              : "box-image"
                          }
                        />
                        <p className="box-image-text">{image.text}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer">
          <div className="footer-item">
            <a
              href="https://github.com/defispartan"
              target="_blank"
              rel="noopener noreferrer"
            >
              built by defispartan
            </a>
          </div>
          <div className="footer-item">
            <a
              href="https://github.com/defispartan/create-web3-ui/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT license
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
