import React from 'react';
import ReactDOM from 'react-dom';


//End game component with informations about player statistics when game ends
class EndGame extends React.Component {
    render() {
        return (
            <div>
                <h1 style={{color:'white', marginTop: '300px', textAlign:'center', fontSize:'46px'}}>Game over</h1>;
                <h3 style={{color:'white',textAlign:'center'}}>{this.props.endMessage}</h3>
                <h2 style={{color:'white',textAlign:'center'}}>SCORE: {this.props.score}</h2>
                <h3 style={{color:'white',textAlign:'center'}}>DISTROYED SHIPS: {this.props.hitted}</h3>
            </div>
        );
    }
}

export {EndGame}
