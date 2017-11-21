import React from 'react';
import ReactDOM from 'react-dom';
//GAME AREA SPACE
class GameBoard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      text:'test'
    }
  }
  componentDidMount(){

  }
  componentWillUnmount(){

  }
  render(){
    return (
      <div>{this.state.text}</div>
    );
  }
}

export {GameBoard};
