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
    return (
      <div>
        <video id="myPlayer" poster="" controls playsInline autoPlay style={{height: '250px', width: '100%'}}>
          <source src="rtmp://rtmp.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b" type="" />
          <source src="http://hls.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8" type="application/x-mpegURL" />
        </video>

        {
          this.initVideo()
        }
      </div>
    );
  }
}

export default VideoPlayer;
