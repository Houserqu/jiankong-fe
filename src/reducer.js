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

const appReducer = combineReducers({
  session,
});

export default appReducer;