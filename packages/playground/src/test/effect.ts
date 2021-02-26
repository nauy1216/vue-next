import { reactive, effect } from 'reactivity'
debugger
const data = reactive({
  a: 1,
  b: 2
})

effect(() => {
  console.log('data.a', data.a, data.b)
  data.a = 4
})

effect(() => {
  console.log('data.a', data.a)
  data.b = 3
})
