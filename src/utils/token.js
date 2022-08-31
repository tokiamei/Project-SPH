// 向外暴露一个函数【用于在 localStorage 存储 token】
export const setToken = (token) => {
  // 把 token 存储到本地仓库
  localStorage.setItem('TOKEN', token)
}

// 拿到本地存储的 token
export const getToken = () => {
  return localStorage.getItem('TOKEN')
}

// 清除本地存储的 token
export const removeToken = () => {
  localStorage.removeItem('TOKEN')
}