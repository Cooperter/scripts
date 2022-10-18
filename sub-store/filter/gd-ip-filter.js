function filter(proxies) {
  return proxies.map(proxy => {
    const { server } = proxy
    const firstIp = server.substring(0, server.indexOf('.'))
    return new RegExp('\\d{3}').test(firstIp);
  });
}