import { useQuery } from "react-query";
const Write = () => {
  const { isLoading, data, error } = useQuery(["contract_call"], () => {
    return "hey";
  });

  if (isLoading) return <div className="spinner" />;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;
  /*   const hash = await walletClient!.writeContract({
    address: ghoAddress,
    abi: ghoAbi,
    functionName: "approve",
    args: [
      ghoPassContractAddress,
      parseUnits(currentPrice.toString(), 18),
    ],
  });
  const result = await publicClient({
    chainId: 1,
  }).waitForTransactionReceipt({ hash }); */
  return (
    <div className="panel">
      <h2>Write Contract</h2>
      {data}
    </div>
  );
};

export default Write;
