import React, {Component} from 'react';

class VideoPlayer extends Component {

  componentDidUpdate() {
    console.log('player');
    var player = new EZUIPlayer('myPlayer');
    player.on('error', function(){
      console.log('error');
    });
    player.on('play', function(){
      console.log('play');
    });
    player.on('pause', function(){
      console.log('pause');
    });
  }

  initVideo = () => {

  }

  render() {
    const {hlsUrl, rtmpUrl} = this.props.data;
    return (
      <div>
        <video id="myPlayer" poster="" controls playsInline autoPlay style={{height: '250px', width: '100%'}}>
          <source src={rtmpUrl} type="" />
          <source src={hlsUrl} type="application/x-mpegURL" />
        </video>

        {
          this.initVideo()
        }
      </div>
    );
  }
}

export default VideoPlayer;
