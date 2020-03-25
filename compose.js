const classyGreeting = (firstName, lastName) =>
  "The name's " + lastName + ', ' + firstName + ' ' + lastName
const toUpper = str => str.toUpperCase()
const repeat = str => str.repeat(2)

const compose = (...func) => (...args) =>
func.reduce((prev, current) => [current(...prev)], args)[0]

const result = compose(classyGreeting, toUpper, repeat)('dong', 'zhe')
