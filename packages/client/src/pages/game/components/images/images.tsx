import React from 'react';
import mainShipFullHealth from '../../../../assets/main-ship-full-health.png';
import enemyBattlecruiserBase from '../../../../assets/enemy-battlecruiser-base.png';
import shipRocket from '../../../../assets/ship-rocket.png';
import enemyRocket from '../../../../assets/enemy-rocket.png';
import backgroundVoid from '../../../../assets/background-void.png';
import backgroundStars from '../../../../assets/background-stars.png';
import enemyBattlecruiserDestruction from '../../../../assets/enemy-battlecruiser-destruction.png';

import usePreloadedImagesRefs from '../../hooks/use-preloaded-images-refs';

type Props = {
  refs: ReturnType<typeof usePreloadedImagesRefs>;
};

function Images({ refs }: Props) {
  return (
    <div style={{ display: 'none' }}>
      <img
        src={mainShipFullHealth}
        alt=""
        ref={refs.mainShipFullHealthRef as React.LegacyRef<HTMLImageElement>}
      />
      <img
        src={enemyBattlecruiserBase}
        alt=""
        ref={
          refs.enemyBattlecruiserBaseRef as React.LegacyRef<HTMLImageElement>
        }
      />
      <img
        src={shipRocket}
        alt=""
        ref={refs.shipRocketRef as React.LegacyRef<HTMLImageElement>}
      />
      <img
        src={enemyRocket}
        alt=""
        ref={refs.enemyRocketRef as React.LegacyRef<HTMLImageElement>}
      />
      <img
        src={backgroundVoid}
        alt=""
        ref={refs.backgroundVoidRef as React.LegacyRef<HTMLImageElement>}
      />
      <img
        src={backgroundStars}
        alt=""
        ref={refs.backgroundStarsRef as React.LegacyRef<HTMLImageElement>}
      />
      <img
        src={enemyBattlecruiserDestruction}
        alt=""
        ref={
          refs.enemyBattlecruiserDestructionRef as React.LegacyRef<HTMLImageElement>
        }
      />
    </div>
  );
}

export default Images;
