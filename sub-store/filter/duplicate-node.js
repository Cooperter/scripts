function filter(proxies, targetPlatform) {
  const set = new Set()
  return proxies.map(p => {
    const { server, port, type } = p
    const key = `${server}-${port}-${type}`
    return set.has(key) ? false : true && set.add(key)
  })
}