Function.prototype.bind2 = function(context) {
  context.__proto__.fun = this
  return () => context.fun()
}

var foo = {
  value: 1,
}

function bar() {
  console.log(this.value)
}

// 返回了一个函数
var bindFoo = bar.bind2(foo)

bindFoo() // 1
