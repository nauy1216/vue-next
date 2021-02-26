import { reactive, effect, ref } from 'reactivity'
debugger

const data = ref(1)

effect(() => {
  console.log(data.value)
})

data.value = 2
