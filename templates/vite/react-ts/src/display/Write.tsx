const Write = () => {
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
    </div>
  );
};

export default Write;
