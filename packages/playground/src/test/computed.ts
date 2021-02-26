import { reactive, effect, ref, computed } from 'reactivity'
debugger

const data = ref(1)
const compu = computed<number>(() => {
  return data.value
})

effect(() => {
  console.log(compu.value)
})

data.value = 2
