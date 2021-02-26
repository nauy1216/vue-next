import { createApp, watch } from 'vue'
import * as Vue from 'vue'
import { add } from '../add'
import logger from '../log'
console.log('Vue', Vue)

import { reactive, effect } from 'reactivity'

debugger
const data = reactive({
  a: 1
})
const e = effect(() => {
  console.log('data.a', data.a)
})
console.log(e)
data.a = 3

// const app = createApp({
//   setup() {
//     const data = reactive({
//       msg: 1
//     })
//     return data
//   },
//   template: `
//     <div>{{msg}}</div>
//     `
// }).mount('#app')
// console.log('app')
// console.log(app)
// logger.log(add(122))
