function filter(proxies) {
  return proxies.map(p => {
    const { type } = p

    /* 只修改 vmess 和 vless */
    if (['vmess', 'vless'].includes(type)) {
      return /(?<![.\d])\d{3}/.test(p.server)
    }
    return true
  });
}
