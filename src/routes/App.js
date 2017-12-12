import React, { Component } from 'react';
import Header from '../components/layout/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* 此处可以引入全局通知组件 */}
        {this.props.children}
      </div>
    );
  }
}

export default App;