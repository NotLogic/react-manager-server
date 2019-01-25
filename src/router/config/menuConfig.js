// 侧边菜单
import SystemUser from '@/pages/authority/systemUser'
import Role from '@/pages/authority/role'
import Authority from '@/pages/authority'

import ChickenSoup from '@/pages/content/chickenSoup'
import Easypaper from '@/pages/content/easypaper'
import Softtext from '@/pages/content/softtext'

import ServiceClassify from '@/pages/service/serviceClassify'
import ServiceNumber from '@/pages/service/serviceNumber'
import Submission from '@/pages/service/submission'
import UserSubmission from '@/pages/service/userSubmission'

import AdviceBack from '@/pages/adviceBack'
import AdviceContent from '@/pages/adviceBack/adviceContent'

import Ad from '@/pages/ad'

import Policy from '@/pages/guide/policy'
import Pover from '@/pages/guide/gover'

import WorkClass from '@/pages/work/workClass'
import WorkMatter from '@/pages/work/workMatter'

import AppVersion from '@/pages/systemSetting/appVersion'
import Article from '@/pages/systemSetting/article'
import Hot from '@/pages/systemSetting/hot'
import Message from '@/pages/systemSetting/message'
import MensitiveWords from '@/pages/systemSetting/sensitiveWords'

import User from '@/pages/user/user'
import Agent from '@/pages/user/agent'
import PostUser from '@/pages/user/postUser'

import ReportIndex from '@/pages/report/reportIndex'
import ReportClass from '@/pages/report/reportClass'
import UserReport from '@/pages/report/userReport'

import Province from '@/pages/basiceData/province'

import Hometown from '@/pages/count/hometown'
import UserCount from '@/pages/count/userCount'

import Post from '@/pages/post'

// import PostUser from '@/pages/user/postUser'



// 键名必须和数据库存储保持一致
// 键名为数据库存储的菜单名称
const config = {
  systemUser: SystemUser,
  role: Role,
  authority_index: Authority,
  chickenSoup: ChickenSoup,
  easypaper: Easypaper,
  softtext: Softtext,
  serviceClassify: ServiceClassify,
  serviceNumber: ServiceNumber,
  submission: Submission,
  userSubmission: UserSubmission,
  ad_index: Ad,
  adviceBack_index: AdviceBack,
  adviceContent: AdviceContent,
  policy: Policy,
  gover: Pover,
  workClass: WorkClass,
  workMatter: WorkMatter,
  appVersion: AppVersion,
  hot: Hot,
  message: Message,
  article: Article,
  sensitiveWords: MensitiveWords,
  app: User,
  agent: Agent,
  postUser: PostUser,
  report_index: ReportIndex,
  reportClass: ReportClass,
  userReport: UserReport,
  province: Province,
  hometown: Hometown,
  userCount: UserCount,
  post_index: Post,
}
export default config