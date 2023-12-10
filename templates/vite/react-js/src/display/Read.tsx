import { useQuery } from "react-query";
import "./styles/spinner.css";
import { activeChain, publicClient } from "../main.tsx"; // current network and rpc config
import { useAccount } from "wagmi";
import { contractAbi, contractAddress } from "../utilities/contracts.ts";

const Read = () => {
  const { isLoading, error } = useQuery(["contract_call"], () => {
    return "hey";
  });
  const { address } = useAccount();

  if (isLoading) return <div className="spinner" />;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  const executeRead = async () => {
    const result = await publicClient({
      chainId: activeChain.id,
    }).readContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "readMessage",
      args: [address as `0x{string}`],
    });
    console.log(result);
  };

  return (
    <div className="panel">
      <div className="header inner-header">
        <h2 className="panel-title">Read Contract </h2>
      </div>
      <h3 className="panel-title">Network</h3>
      <p className="panel-content">{activeChain.name}</p>
      <h3 className="panel-title">Address</h3>
      <a
        href={`${activeChain.blockExplorers.etherscan.url}/address/${contractAddress}`}
        target="_blank"
        className="panel-content"
      >
        {`${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`}
      </a>
      <br />
      <input type="" />
      <input
        type="button"
        onClick={executeRead}
        name="Execute"
        value="Execute"
        className="execute-button"
      />
    </div>
  );
};

export default Read;
