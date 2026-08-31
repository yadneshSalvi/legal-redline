(() => {
  const nativeSetTimeout = window.setTimeout.bind(window);
  window.setTimeout = (callback, delay = 0, ...args) =>
    nativeSetTimeout(callback, Number(delay) * 20, ...args);
})();
