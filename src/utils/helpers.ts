export const prettyTx = (tx: string) =>
  `${tx.substring(0, 6)}...${tx.substr(tx.length - 5, 5)}`;
