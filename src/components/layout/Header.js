import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { NavBar, Icon, Popover, Modal } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { sitename } from '../../utils/config';
import { doLogin } from '../../action';

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

const router_name = [
  {  path: '', title: sitename },
  {  path: 'my', title: '个人中心' },
]

class Header extends React.Component {
  state = {
    visible: false,
    selected: '',
    title: sitename,
  };
  onSelect = (opt) => {
    console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });

    switch (opt.props.value) {
      case 'login':
        this.handleLogin();
    }
  };

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

  handleLogin = () => {
    console.log('login');
    Modal.prompt('登录', '输入手机号',
      [
        { text: '取消' },
        {
          text: '登录',
          onPress: value => {
            this.props.doLogin(value);
          },
        },
      ], 'default', null, ['input your name'])
  }

  componentDidMount() {
    // 路由匹配
    let path_arr;
    let path = hashHistory.getCurrentLocation().pathname;

    path_arr  = path.split('/');

    if(path_arr[1]){
      let router;

      router = router_name.find(x => {
        return x.path === path_arr[1];
      });
      if(router){
        this.setState({title: router.title})
      } else {
        this.setState({title: sitename})
      }
    } else {
      this.setState({title: sitename})
    }
  }

  componentWillReceiveProps(){

    // 路由匹配
    let path_arr;
    let path = hashHistory.getCurrentLocation().pathname;

    path_arr  = path.split('/');

    if(path_arr[1]){
      let router;

      router = router_name.find(x => {
        return x.path === path_arr[1];
      });

      if(router){
        this.setState({title: router.title})
      } else {
        this.setState({title: sitename})
      }
    } else {
      this.setState({title: sitename})
    }
  }

  render () {
    return(
      <NavBar
        mode="dark"
        rightContent={[
          <Popover
            key='1'
            mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Item key="1" value="login" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">登录</Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
        ]}
      >
        {this.state.title}
      </NavBar>
    );
  }
}

function mapStatetoProps(state){
  return{
    userInfo: state.session.userInfo,
  };
}

function mapDispatchToProps(dispatch){
  return({
    doLogin: (phone) => {
      dispatch(doLogin(phone))
    }
  })
}

export default connect(mapStatetoProps, mapDispatchToProps)(Header);
