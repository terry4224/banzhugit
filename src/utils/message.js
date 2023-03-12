import { ElMessage } from 'element-plus'
const message = (message,type,time) => {
  ElMessage({
    message,
    type,
    duration:time
  })
}
export {message}