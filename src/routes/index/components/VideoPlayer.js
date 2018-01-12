import React, {Component} from 'react';
var player;

class VideoPlayer extends Component {
  initVideo = () => {
    let that = this
    player = new EZUIPlayer(`myPlayer-${this.props.data.id}`, {
      autoplay: true
    });

    console.log(player);

    player.on('play', function(){
      that.props.videoPlay()
    });
  }

  componentDidUpdate() {
    this.initVideo()
  }

  handleScreen = () => {
    console.log(player);
  }

  render() {
    const {hlsUrl, rtmpUrl, id} = this.props.data;
    const html = `<video id="myPlayer-${id}" poster="" controls playsInline autoPlay style="height: 250px; width: 100%">
      <source src="${rtmpUrl}" type="rtmp/flv" />
      <source src="${hlsUrl}" type="application/x-mpegURL" />
    </video>`

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: html}} style={{zIndex: -1}}>
        </div>
      </div>


    );
  }
}

export default VideoPlayer;
