import React from 'react';
import ReactDOM from 'react-dom';
import {ScoreElement} from './scoreElement.jsx';
import {ScoreJet} from './scoreJet.jsx';
import {ScoreMissed} from './scoreMissed.jsx';


//Live statistics about player score, hitted enemies, jets number and missedAliens
class Score extends React.Component {
    render() {
        return (
            <section className="score__section">
              <div className="score__container">
                <ScoreElement text1='SCORE: ' text2={this.props.score}/>
                <ScoreElement text1='HITTED: ' text2={this.props.hitted}/>
                <ScoreMissed missedShips={this.props.missedAliens}/>
                <ScoreJet jets={this.props.jets}/>
              </div>
            </section>
        );
    }
}

export {Score}
