// 登录
export function doLogin(phone){
  return {
    type:'LOGIN',
    phone,
  };
}

export function doGetMonitors(list){
  return {
    type:'MONITOR_SET',
    list,
  };
}