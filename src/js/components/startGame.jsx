import React from 'react';
import ReactDOM from 'react-dom';


//Start game component - first panel
class StartGame extends React.Component {
    handleClick = () => {
        if(typeof this.props.start === 'function'){
            this.props.start();
        }
    }
    render() {
        return (
            <div className="endgame__container">
                <h1 className="endgame__header" onClick={this.handleClick}>Start Game</h1>;
            </div>
        );
    }
}

export {StartGame}
