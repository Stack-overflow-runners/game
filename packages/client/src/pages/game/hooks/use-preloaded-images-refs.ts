import {useRef} from 'react'

const usePreloadedImagesRefs = () => {
  const mainShipFullHealthRef = useRef<CanvasImageSource>(null);
  const enemyBattlecruiserBaseRef = useRef<CanvasImageSource>(null);
  const shipRocketRef = useRef<CanvasImageSource>(null);
  const enemyRocketRef = useRef<CanvasImageSource>(null);
  const backgroundVoidRef = useRef<CanvasImageSource>(null);
  const backgroundStarsRef = useRef<CanvasImageSource>(null);
  const enemyBattlecruiserDestructionRef = useRef<CanvasImageSource>(null);

  return {
    mainShipFullHealthRef,
    enemyBattlecruiserBaseRef,
    shipRocketRef,
    enemyRocketRef,
    backgroundVoidRef,
    backgroundStarsRef,
    enemyBattlecruiserDestructionRef,
  }
}

export default usePreloadedImagesRefs;
