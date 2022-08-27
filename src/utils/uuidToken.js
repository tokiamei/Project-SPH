import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串，且每次执行不能再发生变化，游客身份持久存储
export const getUUID = () => {
  // 先判断本地是否有 uuid
  if (!localStorage.getItem('UUIDTOKEN')) {
    const UUIDTOKEN = uuidv4() 
    localStorage.setItem('UUIDTOKEN', UUIDTOKEN)
  }
  return localStorage.getItem('UUIDTOKEN')
}