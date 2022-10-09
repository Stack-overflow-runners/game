function hasError(response: any): boolean {
  return (
    (response && response.reason) || (response && response.statusText !== '')
  );
}
export default hasError;
