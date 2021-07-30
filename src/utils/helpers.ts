export const prettyTx = (tx: string) =>
  `${tx.substring(0, 5)}...${tx.substr(tx.length - 4, 4)}`;
