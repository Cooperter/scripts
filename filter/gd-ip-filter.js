function filter(proxies) {
  return proxies.map(proxy => {
    return new RegExp('(?<![.\\d])\\d{3}').test(proxy.server);
  });
}
