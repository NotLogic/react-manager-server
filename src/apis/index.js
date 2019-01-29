// 获取侧边菜单
const getMenu = {
  params: {
    url: 'web/sys/perm/dataAllGrid'
  }
}
// 系统用户
const systemUser = {
  dataGrid: {
    params: {
      url: 'web/sys/user/dataGrid',
      method: 'post'
    },
  },
  add: {
    params: {
      url: 'web/sys/user/add'
    },
  },
  edit: {
    params: {
      url: 'web/sys/user/update'
    },
  },
  delete: {
    params: {
      url: 'web/sys/user/delete'
    },
  },
  search:{
    params: {
      url: 'web/sys/user/search'
    },
  }
}
// 角色
const role = {
  dataGrid: {
    params: {
      url: 'web/sys/role/dataGrid',
      method: 'post'
    },
  },
  all: {
    params: {
      url: 'web/sys/role/dataAllGrid'
    },
  },
  add: {
    params: {
      url: 'web/sys/role/add'
    },
  },
  edit: {
    params: {
      url: 'web/sys/user/update'
    },
  },
  delete: {
    params: {
      url: 'web/sys/role/delete'
    },
  },
  search:{
    params: {
      url: ''
    },
  }
}
// 权限列表
const authority = {
  dataGrid: {
    params: {
      url: 'web/sys/perm/dataGrid'
    },
  },
  all: {
    params: {
      url: 'web/sys/perm/dataAllGrid'
    },
  },
  add: {
    params: {
      url: 'web/sys/perm/add'
    },
  },
  edit: {
    params: {
      url: 'web/sys/perm/update'
    },
  },
  delete: {
    params: {
      url: 'web/sys/perm/delete'
    },
  },
  search:{
    params: {
      url: 'web/sys/perm/search'
    },
  }
}

const apis = {
  getMenu,
  systemUser,
  role,
  authority,
}
export default apis