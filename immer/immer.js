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
  function getOrCreateProxy(thing) {
    if (!isPlainObject(thing) && !Array.isArray(thing)) return thing
    if (proxies.get(thing)) return proxies.get(thing)
    const proxy = new Proxy(thing, objectTrap)
    proxies.set(thing, proxy)
    return proxy
  }
  function getOrCreateCopy(thing) {
    if (!isPlainObject(thing) && !Array.isArray(thing)) return thing
    if (copies.get(thing)) return copies.get(thing)
    const copy = (()=>{
      if(Array.isArray(thing)) {
        return thing.slice()  
      }else {
        return Object.assign({}, thing)
      }
    })()
    copies.set(thing, copy)
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
