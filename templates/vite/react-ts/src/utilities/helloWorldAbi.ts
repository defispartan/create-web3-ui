// IMPORTANT: export as const
export const helloWorldAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "caller", "type": "address" }
    ],
    "name": "readMessage",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "newMessage", "type": "string" }
    ],
    "name": "writeMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
