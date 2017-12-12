import React, {Component} from 'react';
import { Grid, WhiteSpace, Toast, Modal } from 'antd-mobile';
import VideoPlayer from './components/VideoPlayer';
import {connect} from 'react-redux';
import {loadCouponDataSet} from "../../service/monitor";
import  MonitorsGridItem from './components/MonitorsGridItem';
import { doLogin } from '../../action';

import {API_DOMAIN} from "../../utils/config";

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

const actions = [
  {
    icon: <i className="iconfont icon-shuaxin" style={{ fontSize: '25px' }}  />,
    text: '刷新列表',
    key: 'refresh'
  },
  {
    icon: <i className="iconfont icon-jietu" style={{ fontSize: '25px' }} />,
    text: '截图',
    key: 'screen'
  },
  {
    icon: <i className="iconfont icon-saoyisao" style={{ fontSize: '25px' }} />,
    text: '扫码',
    key: 'scan'
  },
  {
    icon: <i className="iconfont icon-yonghurenxiang" style={{ fontSize: '25px' }}  />,
    text: '登录',
    key: 'login'
  }
]

class Index extends Component {

  state = {
    videos: [],
    cur_video: {
      hlsUrl: '',
      rtmpUrl: '',
      id: 'ini'
    }
  }


  componentDidMount() {
    // this.checkTime();
  }

  checkTime = () => {
    let h = new Date().getHours();
    // let h = 3;
    console.log(h);
    if(h < 9 || h > 18){
      Toast.fail('观看时间：9:00-18:00', 0);
    }
  }


  handleChange = (item, index) => {
    console.log(item);
    this.setState({cur_video: item});
  }

  handleAction = (item, index) => {
    // 获取视频数据
    console.log(item, index);
    switch (item.key) {
      case 'refresh' :
        if(this.props.userInfo.phone){
          this.handleGetMonitors(this.props.userInfo.phone);
        }else{
          Toast.info('请先登录');
        }
        break ;
      case 'login' :  this.handleLogin(); break;
      default : return ;
    }
  }

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
      ], 'default', null, ['请输入手机号'])
  }

  handleGetMonitors = (phone) => {
    if(phone){
      // 获取视频数据
      loadCouponDataSet({phone}).then(data => {
        this.setState({videos: data.result.monitors});
        console.log('data');
      })
    }
  }

  render() {
    console.log(this.props.userInfo);
    return (
      <div>
        <VideoPlayer data={this.state.cur_video} />
        <Grid
          data={actions}
          onClick={this.handleAction}
        />
        <WhiteSpace />
        {
          this.state.videos.length > 0 ?
            <Grid
              data={this.state.videos}
              onClick={this.handleChange}
              renderItem={(el, index) => <MonitorsGridItem data={el} />}
            />
            :
            <div style={{ textAlign: 'center', color: '#bebebe' }}>无可观看视频</div>
        }

      </div>
    );
  }
}

function mapStatetoProps(state){
  return {
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

export default connect(mapStatetoProps,mapDispatchToProps)(Index);