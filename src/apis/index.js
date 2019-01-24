// import http from '@/plugins/axios'
// const url = {
//   getTopics: 'get /topics',
// }
// // 
// const BASE_URL = process.env.NODE_ENV === 'production' ? 'test' : ''
// let config = {
//   baseURL: BASE_URL
// }
// export function getTopics({page=1, tab='ask', limit=10, mdrender=false }){
//   return new Promise(function(resolve, reject){
//     // tab分类（string）:  ask share job good
//     const params = {
//       url: url.getTopics,
//       params: {
//         page,
//         tab,
//         limit,
//         mdrender,
//       }
//     }
//     http(params, config).then(res=>{
//       console.log('res: ',res)
//     }).catch(err=>{
//       console.log('err: ',err)
//     })
//   })
// }

const apis = {
  // 请求侧边菜单数据
  getMenu(){
    return {
      params: {
        url: 'web/sys/perm/dataAllGrid'
      },
      config: {}
    }
  }
}
export default apis