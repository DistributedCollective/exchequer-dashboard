export const prettyTx = (tx: string) =>
  `${tx.substring(0, 6)}...${tx.substr(tx.length - 5, 5)}`;

export const toChecksumAddress = (address: string) => {
  try {
    return !!address ? address.toLocaleLowerCase() : '';
  } catch (e) {
    return address;
  }
};
