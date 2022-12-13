class VibrationAPI {
  static vibrate(scheme: number | number[]) {
    window.navigator.vibrate(scheme);
  }
}

const vibrationAPI = new VibrationAPI();

export default vibrationAPI;
