function isPlainObject(object) {
  if (object === null || typeof object !== 'object') return false
  const proto = Object.getPrototypeOf(object)
  return proto === Object.prototype || proto === null
}
function produce(baseState, thunk) {
  const copies = new Map()
  const proxies = new Map()
  const objectTrap = {
    get(target, prop) {
      return getOrCreateProxy(target[prop])
    },
    set(target, prop, value) {
      if (target[prop] !== value) {
        const copy = getOrCreateCopy(target)
        copy[prop] = value
      }
    },
  }
  function getOrCreateProxy(object) {
    if (!isPlainObject(object)) return object
    if (proxies.get(object)) return proxies.get(object)
    const proxy = new Proxy(object, objectTrap)
    proxies.set(object, proxy)
    return proxy
  }
  function getOrCreateCopy(object) {
    if (!isPlainObject(object)) return object
    if (copies.get(object)) return copies.get(object)
    const copy = Object.assign({}, object)
    copies.set(object, copy)
    return copy
  }
  function hasObjectChange(object) {
    if(!proxies.get(object)) return false
    if(copies.get(object)) return true
    // deep check
    for(let i of Object.keys(object)) {
      if(hasObjectChange(object[i])) return true
    }
  }
  function finalizeObject(object){
    if(!hasObjectChange(object)) return object
    const copy = getOrCreateCopy(object)
    Object.keys(copy).forEach(item=>{
      copy[item] = finalizeObject(copy[item])
    })
    return copy
  }
  const proxy = getOrCreateProxy(baseState)
  thunk(proxy)
  return finalizeObject(baseState)
}
module.exports = produce
