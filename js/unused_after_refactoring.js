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
