import React from 'react';
import ReactDOM from 'react-dom';

//Live statistics about player score, hitted enemies, jets number and missedAliens
class ScoreMissed extends React.Component {
    render() {
        let color = '';
        if(this.props.missedShips > 6 && this.props.missedShips <= 11){
            color = 'orange';
        }
        else if (this.props.missedShips > 11){
            color ='red';
        }
        return (
            <div className="score__missed" style={{backgroundColor: color}}>
                MISSED ALIENS: <strong>{this.props.missedShips}</strong>
            </div>
        );
    }
}

export {ScoreMissed}
