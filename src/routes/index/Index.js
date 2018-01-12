import React, {Component} from 'react';
import {hashHistory} from 'react-router'
import {Grid, WhiteSpace, Toast, Modal,Accordion} from 'antd-mobile';
import VideoPlayer from './components/VideoPlayer';
import {connect} from 'react-redux';
import {loadCouponDataSet, CreateViewLog, UpdateViewLog} from "../../service/monitor";
import MonitorsGridItem from './components/MonitorsGridItem';
import Cookie from 'js-cookie';
import {API_DOMAIN} from "../../utils/config";
import { doLogin } from "../../action";

const actions = [
  {
    icon: <i className="iconfont icon-shuaxin" style={{fontSize: '25px'}}/>,
    text: '刷新列表',
    key: 'refresh'
  },
  {
    icon: <i className="iconfont icon-jietu" style={{fontSize: '25px'}}/>,
    text: '截图',
    key: 'screen'
  },
  {
    icon: <i className="iconfont icon-saoyisao" style={{fontSize: '25px'}}/>,
    text: '扫码',
    key: 'scan'
  },
  // {
  //   icon: <i className="iconfont icon-yonghurenxiang" style={{ fontSize: '25px' }}  />,
  //   text: '登录',
  //   key: 'login'
  // }
]

let logInterval = null;
let isLog = false;
class Index extends Component {

  state = {
    videos: [],
    cur_video: {
      hlsUrl: '',
      rtmpUrl: '',
      id: '',
    },
    isLog: false
  }


  componentDidMount() {
    // if (!this.checkTime()) {
    //     return;
    // }
    let phone = Cookie.get('phone');
    //let phone = '18678781860';
    console.log(phone);
    if (phone) {
      this.handleGetMonitors(phone);
      this.props.doLogin(phone);
    } else {
      Toast.info('请先登录');
    }
  }

  checkTime = () => {
    let h = new Date().getHours();
    // let h = 3;
    if (h < 9 || h > 18) {
      Toast.fail('观看时间：9:00-18:00', 0);
      return false;
    } else {
      return true
    }
  }

  // 点击视频
  handleChange = (item, index) => {
    console.log(item);
    this.setState({cur_video: item});
    console.log(item, this.props.userInfo)
    clearTimeout(logInterval);
    isLog = false;
  }

  handleAction = (item, index) => {
    // 获取视频数据
    switch (item.key) {
      case 'refresh' :
        let phone = Cookie.get('phone');
        if (phone) {
          this.handleGetMonitors(phone);
        } else {
          Toast.info('请先登录', 1);
        }

        break;
      case 'login' :
        hashHistory.push('/login');
        break;
      case 'screen' :
        this.handleScreen();
        break;
      default :
        return;
    }
  }

  handleScreen = () => {
    console.log(player);
  }

  handleLogin = () => {
    console.log('login');
    Modal.prompt('登录', '输入手机号',
      [
        {text: '取消'},
        {
          text: '登录',
          onPress: value => {
            this.props.doLogin(value);
            this.handleGetMonitors(value);
          },
        },
      ], 'default', null, ['请输入手机号'])
  }

  handleGetMonitors = (phone) => {
    if (phone) {
      // 获取视频数据
      loadCouponDataSet({phone}).then(data => {
        this.setState({videos: data.result.garages});
      })
    }
  }

  // 点击播放按钮
  handleVideoPlay = () => {
    console.log('play');
    if( !isLog ){
      // 创建 log
      console.log('create log');
      isLog = true;

      CreateViewLog({phone: this.props.userInfo.phone, monitorId: this.state.cur_video.id}).then(data => {

        logInterval = setInterval(() => {
          console.log(this.state.cur_video);
          UpdateViewLog({id: data.result})
        }, 60000)
      })
    }
  }

  render() {
    const {cur_video, videos} = this.state;

    return (
      <div>
        <VideoPlayer data={cur_video} userInfo={this.props.userInfo} videoPlay={this.handleVideoPlay}/>

        {/*<Grid*/}
          {/*data={actions}*/}
          {/*onClick={this.handleAction}*/}
        {/*/>*/}
        <WhiteSpace/>
        {
          videos.length > 0 ?
            <Accordion>
              {
                videos.map(item => {
                  return (
                    <Accordion.Panel header={`${item.garageName}`} key={item.id}>
                      <Grid
                        data={item.monitors}
                        onClick={this.handleChange}
                        renderItem={(el, index) => <MonitorsGridItem data={el}/>}
                      />
                    </Accordion.Panel>
                  )
                })
              }
            </Accordion>
            :
            <div style={{textAlign: 'center', color: '#bebebe'}}>无可观看视频</div>
        }

      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    userInfo: state.session.userInfo,
    monitors_list: state.monitors.list
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    doLogin: (phone) => {
      dispatch(doLogin(phone))
    },
  })
}

export default connect(mapStatetoProps, mapDispatchToProps)(Index);
