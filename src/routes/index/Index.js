import React, {Component} from 'react';
import {hashHistory} from 'react-router'
import {Grid, WhiteSpace, Toast, Modal} from 'antd-mobile';
import VideoPlayer from './components/VideoPlayer';
import {connect} from 'react-redux';
import {loadCouponDataSet} from "../../service/monitor";
import MonitorsGridItem from './components/MonitorsGridItem';
import Cookie from 'js-cookie';
import {API_DOMAIN} from "../../utils/config";

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

class Index extends Component {

    state = {
        videos: [],
        cur_video: {
            hlsUrl: '',
            rtmpUrl: '',
            id: ''
        }
    }


    componentDidMount() {
        if (!this.checkTime()) {
            return;
        }
        let phone = Cookie.get('phone');
        //console.log(phone);
        if (phone) {
            this.handleGetMonitors(phone);
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


    handleChange = (item, index) => {
        console.log(item);
        this.setState({cur_video: item});
    }

    handleAction = (item, index) => {
        // 获取视频数据
        switch (item.key) {
            case 'refresh' :
                let phone = Cookie.get('phone');
                if (phone) {
                    this.handleGetMonitors(phone);
                } else {
                    Toast.info('请先登录');
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
                this.setState({videos: data.result.monitors});
            })
        }
    }

    render() {
        const {cur_video, videos} = this.state;

        return (
            <div>
                <VideoPlayer data={cur_video}/>

                <Grid
                    data={actions}
                    onClick={this.handleAction}
                />
                <WhiteSpace/>
                {
                    videos.length > 0 ?
                        <Grid
                            data={videos}
                            onClick={this.handleChange}
                            renderItem={(el, index) => <MonitorsGridItem data={el}/>}
                        />
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