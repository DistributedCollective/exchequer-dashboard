import React from 'react';
import { Asset } from '../../utils/types';
import styles from './index.module.css';
import { AssetsDictionary } from '../../utils/dictionaries/assets-dictionary';

const symbolMap: { [key: string]: any } = {
  [Asset.RBTC]: (
    <>
      <em>R</em>BTC
    </>
  ),
  [Asset.USDT]: (
    <>
      <em>R</em>USDT
    </>
  ),
  [Asset.ETH]: (
    <>
      ETH<em>S</em>
    </>
  ),
  [Asset.BNB]: (
    <>
      BNB<em>S</em>
    </>
  ),
};

export function getAssetSymbol(asset: Asset) {
  if (symbolMap.hasOwnProperty(asset)) {
    return symbolMap[asset];
  }
  return AssetsDictionary.get(asset)?.symbol || asset;
}

interface IAssetSymbolRenderer {
  asset?: Asset;
  assetString?: string;
}

export const AssetSymbolRenderer: React.FC<IAssetSymbolRenderer> = ({
  asset,
  assetString,
}) => (
  <span className={styles.symbol}>
    {asset ? getAssetSymbol(asset) : assetString}
  </span>
);
