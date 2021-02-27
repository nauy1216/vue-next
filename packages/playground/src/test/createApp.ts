import { createApp, watch, reactive } from 'vue'
import * as Vue from 'vue'
import { add } from '../add'
import logger from '../log'
console.log('Vue', Vue)

debugger

const app = createApp({
  setup() {
    const data = reactive({
      msg: 1
    })
    return data
  },
  template: `
    <div>{{msg}}</div>
    `
}).mount('#app')
console.log('app')
console.log(app)
logger.log(add(122))
