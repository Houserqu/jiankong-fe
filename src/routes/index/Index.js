import React, {Component} from 'react';
import { Grid } from 'antd-mobile';
import VideoPlayer from './components/VideoPlayer';
import {connect} from 'react-redux';

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

class Index extends Component {

  state = {
    videos: data
  }

  handleChange = (item, index) => {
    console.log(item);
    let videos = this.state.videos;
    videos[index].text = 'playing';

    this.setState({videos});
  }

  render() {
    console.log(this.props.userInfo);
    return (
      <div>
        <VideoPlayer />
        <Grid
          data={this.state.videos}
          onClick={this.handleChange}
          />
      </div>
    );
  }
}

function mapStatetoProps(state){
  return{
    userInfo: state.session.userInfo,
  };
}

export default connect(mapStatetoProps)(Index);