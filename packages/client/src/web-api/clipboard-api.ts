class ClipboardAPI {
  copy(value: string) {
    navigator.clipboard.writeText(value);
  }
}

const clipboardAPI = new ClipboardAPI();

export default clipboardAPI;
