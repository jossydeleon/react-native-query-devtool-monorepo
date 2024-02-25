function debounce(callback: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | undefined;

  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export default debounce;
