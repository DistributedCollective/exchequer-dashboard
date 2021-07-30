import React from 'react';

interface Props {
  address: string;
}

export function AssetLogo(props: Props) {
  return (
    <img
      src={`https://logos.covalenthq.com/tokens/${props.address}.png`}
      className="w-8 h-8 rounded-full"
      alt="Asset"
    />
  );
}
