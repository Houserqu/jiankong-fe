// 登录
export function doLogin(phone){
  return {
    type:'LOGIN',
    phone,
  };
}