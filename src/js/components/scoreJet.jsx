import React from 'react';
import ReactDOM from 'react-dom';

//Live statistics about player score, hitted enemies, jets number and missedAliens
class ScoreJet extends React.Component {
    render() {
        let jets = [];
        for(let i=0; i< this.props.jets ; i++){
            jets.push(<div className="score__jet" key={i}></div>);
        }
        return (
            <div className="score__jets">
                {jets}
            </div>
        );
    }
}

export {ScoreJet}
