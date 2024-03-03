import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
} from "wagmi";

import { Address } from "viem";

const Actions = () => {
  const { isConnected, address } = useAccount();

  const {
    signMessage,
    isPending: signMessageIsLoading,
    isError: signMessageIsError,
  } = useSignMessage();
  const {
    signTypedData,
    isPending: signTypedDataIsLoading,
    isError: signTypedDataIsError,
  } = useSignTypedData();
  const {
    sendTransaction,
    isPending: sendTransactionIsLoading,
    isError: sendTransactionIsError,
  } = useSendTransaction();

  const testSignMessage = () => {
    signMessage({
      message: "wen token",
    });
  };
  const testSignTypedData = () => {
    signTypedData({
      // All properties on a domain are optional
      domain: {
        name: "Ether Mail",
        version: "1",
        chainId: 1,
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
      },
      // The named list of all type definitions
      types: {
        Person: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" },
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "contents", type: "string" },
        ],
      },
      primaryType: "Mail",
      message: {
        from: {
          name: "Cow",
          wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        },
        to: {
          name: "Bob",
          wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        },
        contents: "Hello, Bob!",
      },
    });
  };
  const testSendTransaction = () => {
    sendTransaction({
      to: (address as Address) ?? "",
      value: 0n,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <h2>Actions {!isConnected && `(connect to test)`}</h2>
      <button disabled={!isConnected} onClick={testSignMessage}>
        {signMessageIsError
          ? "Error. Check console"
          : signMessageIsLoading
            ? "Waiting..."
            : "Sign message"}
      </button>
      <button disabled={!isConnected} onClick={testSignTypedData}>
        {signTypedDataIsError
          ? "Error. Check console"
          : signTypedDataIsLoading
            ? "Waiting..."
            : "Sign typed data"}
      </button>
      <button disabled={!isConnected} onClick={testSendTransaction}>
        {sendTransactionIsError
          ? "Error. Check console"
          : sendTransactionIsLoading
            ? "Waiting..."
            : "Send transaction"}
      </button>
    </div>
  );
};

export default Actions;
