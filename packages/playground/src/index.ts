import { reactive, createApp } from 'vue'
import { add } from './add'
import logger from './log'

debugger
createApp({
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

logger.log(add(122))
