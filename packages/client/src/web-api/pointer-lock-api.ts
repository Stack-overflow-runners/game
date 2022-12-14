class PointerLockAPI {
  lockByElement(element: HTMLElement) {
    element.requestPointerLock();
  }
}

const pointerLockAPI = new PointerLockAPI();

export default pointerLockAPI;
