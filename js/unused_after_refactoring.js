//Show JetFighter method
showMissle = () => {
    let updatedBoard = this.state.board.slice();
    let newElement = <div key='missle' className='fireMissle'></div>;
    updatedBoard.splice(this.index(this.state.jet.x, this.state.jet.y-1),1,newElement);
    this.setState({
        board:updatedBoard
    });
}

//Show Alien ship method
showAlien = () => {
    let updatedBoard = this.state.board.slice();
    let newElement = <div key='alien' className='alien'></div>;
    updatedBoard.splice(this.index(this.state.alien.x, this.state.alien.y),1,newElement);
    this.setState({
        board:updatedBoard
    });
}

    hideVisibleAlien = () => {
        let updatedBoard = this.state.board.slice();
        let newElement = <div key={this.state.counter} className=''></div>;
        updatedBoard.splice(this.index(this.state.alien.x, this.state.alien.y),1,newElement);
        this.setState({
            board:updatedBoard,
            counter: this.state.counter + 1

        });
    }



        hideVisibleJet = () => {
            let updatedBoard = this.state.board.slice();
            let newElement = <div key={this.state.counter} className=''></div>;
            updatedBoard.splice(this.index(this.state.jet.x, this.state.jet.y),1,newElement);
            this.setState({
                board:updatedBoard,
                counter: this.state.counter + 1
            });
        }



        //Show JetFighter method
        showJet = () => {
            let updatedBoard = this.state.board.slice();
            let newElement = <div key='jetFighter' className='jetFighter'></div>;
            updatedBoard.splice(this.index(this.state.jet.x, this.state.jet.y),1,newElement);
            this.setState({
                board:updatedBoard
            });
        }



        //Colision detection with space ship
        colisionDetection = () => {
            //With Jet Figter
            if(this.state.jet.x === this.state.alien.x && this.state.jet.y === this.state.alien.y){
                let space = this;
                this.showElement('',this.state.jet.x, this.state.jet.y); //SHOW JET
                this.setState({
                    countDownToEnd: this.state.countDownToEnd - 1,
                    text: 'Damn ! We were hitted ! Hold on !',
                    jet: {
                        x: 5,
                        y: 10
                    },
                    score: this.state.score + 100,
                    hitted: this.state.hitted + 1,
                    alien: {
                        x:Math.floor(Math.random() * 11),
                        y:0
                    }
                });
                clearInterval(this.alienIdSetInterval);
                this.showElement('',this.state.alien.x, this.state.alien.y);  //HIDE ALIEN
                this.messageInterval = setTimeout(()=>{
                    this.setState({ text: ''});
                },1500);
                if(this.state.countDownToEnd === 0){
                    console.log('End of game ! We were killed');
                    clearInterval(this.alienIdSetInterval);
                    clearInterval(this.startGameIntervalId);
                    this.setState({
                        endGame: true
                    });
                }
            }
        }
