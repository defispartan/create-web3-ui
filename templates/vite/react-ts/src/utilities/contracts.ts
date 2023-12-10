export const contractAddress = "0x6d0f957fca6bc98030068b603bf33e8e7ad6945c";
export const contractAbi = [
    {
        inputs: [{ internalType: "address", name: "caller", type: "address" }],
        name: "readMessage",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "newMessage", type: "string" }],
        name: "writeMessage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;