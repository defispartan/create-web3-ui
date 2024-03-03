import { useState } from "react";
import useRootStore from "../store/rootStore.ts";
import Read from "./Read.tsx";
import Write from "./Write.tsx";
import { ContractConfig } from "../types.ts";

const Contracts = () => {
  const [activeChainContracts, activeChain] = useRootStore((state) => [
    state.activeChainContracts,
    state.activeChain,
  ]);

  const [expandedContract, setExpandedContract] = useState<number | null>(null);

  const noContracts = activeChainContracts.length === 0;

  const toggleExpand = (index: number) => {
    setExpandedContract(expandedContract === index ? null : index);
  };

  return (
    <div className="panel-full">
      <h1>Contracts</h1>
      {noContracts ? (
        <p>No contracts defined in web3.config.ts</p>
      ) : (
        Object.values(activeChainContracts).map(
          (contract: ContractConfig, index) => (
            <div className="contract-row" key={index}>
              <div className="contract-row-title">
                <div
                  onClick={() => toggleExpand(index)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/caret-right.svg"
                    width={30}
                    height={30}
                    className={`caret ${expandedContract === index ? "rotate-caret" : ""}`}
                  />
                </div>
                <h3>
                  <a
                    href={
                      activeChain.blockExplorers?.default.url +
                      "/address/" +
                      contract.address
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contract.name}{" "}
                    {`(${contract.address.slice(0, 6)}...${contract.address.slice(-4)})`}
                  </a>
                </h3>
              </div>
              {expandedContract === index && (
                <div className="contract-details">
                  <Read />
                  <Write />
                </div>
              )}
            </div>
          )
        )
      )}
    </div>
  );
};

export default Contracts;
