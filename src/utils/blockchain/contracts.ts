/**
 * Do not import this file directly.
 * Use getContract(contractName) helper
 * @example getContract('sovrynProtocol');
 */

import TestTokenABI from './abi/abiTestToken.json';

export const contracts = {
  DOC_token: {
    address: '0xe700691da7b9851f2f35f8b8182c69c53ccad9db',
    abi: TestTokenABI,
    blockNumber: 1764664,
  },
  MOC_token: {
    address: '0x9aC7Fe28967b30e3a4E6E03286D715B42B453d10',
    abi: TestTokenABI,
    blockNumber: 202559,
  },
  USDT_token: {
    address: '0xEf213441a85DF4d7acBdAe0Cf78004E1e486BB96',
    abi: TestTokenABI,
    blockNumber: 1408174,
  },
  XUSD_token: {
    address: '0xb5999795BE0EbB5bAb23144AA5FD6A02D080299F',
    abi: TestTokenABI,
    blockNumber: 1408174,
  },
  BPRO_token: {
    address: '0x440cd83c160de5c96ddb20246815ea44c7abbca8',
    abi: TestTokenABI,
    blockNumber: 1764667,
  },
  ETH_token: {
    address: '0x1D931Bf8656d795E50eF6D639562C5bD8Ac2B78f',
    abi: TestTokenABI,
    blockNumber: 1408174,
  },
  BNBS_token: {
    address: '0x6D9659bdF5b1A1dA217f7BbAf7dBAF8190E2e71B',
    abi: TestTokenABI,
    blockNumber: 1408174,
  },
};
