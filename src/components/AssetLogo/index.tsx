import React, { useCallback, useState } from 'react';
import cn from 'classnames';

interface Props {
  address: string;
}

export function AssetLogo(props: Props) {
  const [hide, setHide] = useState(false);
  const handleImgError = useCallback(({ target }) => {
    setHide(true);
  }, []);

  return (
    <div className="w-8 h-8 rounded-full bg-light bg-opacity-25">
      <img
        src={`https://logos.covalenthq.com/tokens/${props.address}.png`}
        onError={handleImgError}
        className={cn('asset w-8 h-8 rounded-full', hide && 'hidden')}
        alt="Asset"
      />
    </div>
  );
}
