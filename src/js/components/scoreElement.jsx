import React from 'react';
import ReactDOM from 'react-dom';

//Live statistics about player score, hitted enemies, jets number and missedAliens
class ScoreElement extends React.Component {
    render() {
        return (
              <div className="score__element">
                {this.props.text1} <strong>{this.props.text2}</strong>
              </div>
        );
    }
}

export {ScoreElement}
