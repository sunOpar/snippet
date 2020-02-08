const modifier = () => {
  return {
    set(target, propKey, value) {
      Reflect.set(target, propKey, value)
    },
  }
}
function produce(base, cb) {
  const baseCopy = {...base}
  const proxy = createProxy(baseCopy)
  cb(proxy)
  return baseCopy
}
function createProxy(base) {
  const proxy = new Proxy(base, modifier)
  return proxy
}

module.exports = produce
