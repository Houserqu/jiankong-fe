import React, {Component} from 'react';
import {doLogin, doGetMonitors} from '../../action';
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import {Modal} from 'antd-mobile';
import {loadCouponDataSet} from "../../service/monitor";


class Login extends Component {

  componentDidMount() {
    Modal.prompt('登录', '输入手机号',
      [
        {
          text: '取消', onPress: value => {
            hashHistory.push('/');
          },
        },
        {
          text: '登录',
          onPress: value => {
            this.props.doLogin(value);
            loadCouponDataSet({phone: value}).then(data => {
              this.props.doGetMonitors(data.result.monitors);
              hashHistory.push('/');
            })
          },
        },
      ], 'default', null, ['请输入手机号'])
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    userInfo: state.session.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    doLogin: (phone) => {
      dispatch(doLogin(phone))
    },
    doGetMonitors: (phone => {
      dispatch(doGetMonitors(phone))
    })
  })
}

export default connect(mapStatetoProps, mapDispatchToProps)(Login);