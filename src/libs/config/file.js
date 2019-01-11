const config = {
  host: '',                   //  文件存储host
  server: 'web/server/get',   //  获取文件存储host的API
  source: {
    user: 1,    //  用户
    post: 2,    //  帖子
    ad: 3,      //  广告
    news: 4,    //  新闻
    service: 5  //  服务号
  },
  position:{
    userHead: 1,          //  用户头像
    postList: 2,          //  帖子列表
    postReply: 3,         //  帖子回复
    createGroupHead: 4,   //  创建群头像
    editGroupHead: 5,     //  编辑群头像
    ad: 6,                //  广告
    systemNotice: 7,      //  系统通知
    news: 8,              //  新闻
    userReport: 9,        //  用户举报
    serviceBg: 10,        //  服务号背景图
    service: 11           //  服务号
  }
}
export default config