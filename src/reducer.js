import { combineReducers } from 'redux';

function session(state={
  userInfo:{
    phone: null,
  }
},action){
  switch(action.type) {
    case 'LOGIN' :
      return Object.assign({}, state, {
        userInfo: { phone: action.phone }
      });
    default :
      return state;
  }
}

function monitors(state={
  list:[]
},action){
  switch(action.type) {
    case 'MONITOR_SET' :
      return Object.assign({}, state, {
        list: action.list
      });
    default :
      return state;
  }
}

const appReducer = combineReducers({
  session,
  monitors
});

export default appReducer;