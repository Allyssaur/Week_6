class Player{                               //the 'blueprint' for a player
    constructor(player, hand, score) {
        this.player = player;
        this.hand = hand;
        this.score = score;
        }    
    showDeckCount() {                       //this funciton shows which players have how many cards in console

        console.log(`${this.player} has ${this.hand.length} cards in their deck.`);
    }
    
}

class Card {
    constructor(faceValue, suit, rank) {       //this 'blueprint' for a card
        this.faceValue = faceValue;
        this.suit = suit;
        this.rank = rank;
    }
}

class Deck {                                 //the 'blueprint' for a deck
    constructor() {
    this.p1Deck = [];
    this.p2Deck = [];
    this.fullDeck = [];

    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K','A'];
    this.suits= ['-C', '-D', '-H', '-S'];
    this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    }
    
    createDeck() {                          //creates the deck
        for(let f = 0; f < this.values.length; f++) {
            for(let s = 0; s < this.suits.length; s++) {
                this.fullDeck.push(new Card(this.values[f], this.suits[s], this.ranks[f]))
                } 
        }

    }
    shuffleDeck() {                         //shuffles deck funciton
            for(let i = 0; i < this.fullDeck.length; i++) {
                let j = Math.floor(Math.random() * this.fullDeck.length);
                let temp = this.fullDeck[i];
                this.fullDeck[i] = this.fullDeck[j];
                this.fullDeck[j] = temp;
        }
    }       
}     

class GameLogic {
constructor() {
    this.player1 = new Player('Player 1', [], 0);     //creation of player's 1 and 2
    this.player2 = new Player('Player 2', [], 0);
        
    this.gameDeck = new Deck();                     //creation of the deck

    }
    startGame() {
        this.gameDeck.createDeck();                 //activation for the functions
        this.gameDeck.shuffleDeck();
        newGame.dealDecks();
    } 
    dealDecks() {
        this.player1.hand = this.gameDeck.fullDeck.slice(0,26);     //cutting the deck and assigning them to players
        this.player2.hand = this.gameDeck.fullDeck.slice(26,52);     
        this.player1.showDeckCount();            //calling the function shows the deck count in the console log
        this.player2.showDeckCount();
    }
    flipTopDeck1() {                            //'flips' Player1's top card to be played
        this.topDeck1 = this.player1.hand.shift();
        console.log(this.topDeck1);

        newGame.getCardImg1();                  //calls function to display image
    }
    getCardImg1() {
        let cardImg = document.createElement('img');  //gets Card image for Player 1 and 2 and puts it into the html file
        cardImg.src = './images/' + '' + this.topDeck1.faceValue + this.topDeck1.suit + '' + ".png";
        document.getElementById('Player1Content').append(cardImg);
    }
    getCardImg2() {
        let cardImg = document.createElement('img');   
        cardImg.src = './images/' + '' + this.topDeck2.faceValue + this.topDeck2.suit + '' + ".png";
        document.getElementById('Player2Content').append(cardImg);
    }
    replaceCardImg1() {                                  //deletes the old card image for Player 1 and 2 when a new turn takes place
        let oldImg = document.getElementById('Player1Content').lastChild;
        document.getElementById('Player1Content').removeChild(oldImg);
    }
    replaceCardImg2() {
        let oldImg = document.getElementById('Player2Content').lastChild;
        document.getElementById('Player2Content').removeChild(oldImg);
    }
    flipTopDeck2() {                                    //'flips Player2's top card to be played
        this.topDeck2 = this.player2.hand.shift();
        console.log(this.topDeck2);

        newGame.getCardImg2();
    }    
    compareCard() {                             //comparing the values of each players cards and pushes them to correct decks
                if(this.topDeck1.rank > this.topDeck2.rank) {
                    this.player1.hand.push(this.topDeck1, this.topDeck2);

                    console.log('Player 1 wins this round!')

                } else if(this.topDeck1.rank < this.topDeck2.rank) {
                    this.player2.hand.push(this.topDeck2, this.topDeck1);
                    console.log('Player 2 wins this round!')
                } else {
                    this.player1.hand.push(this.topDeck1);
                    this.player2.hand.push(this.topDeck2);
                    console.log('Tied!');
                }              
    }
    doThings() {                            //calls all functions needed to clear the board and start the next turn
        newGame.replaceCardImg1();
        newGame.replaceCardImg2();
        newGame.takeTurn();
    }
    takeTurn() {                            //calls all functions needed to fulfill a turn
        newGame.flipTopDeck1();
        newGame.flipTopDeck2();
        newGame.determineWinner();
        newGame.compareCard();
        
                console.log(this.player1, this.player2);
    }
    determineWinner() {                 //declares a winner at the end of the game
        if(this.player1.hand.length === 0 || this.player2.hand.length === 0) {
            if (this.player1.hand.length > 0) {
                alert('Player 1 wins!')
            } else {
                alert('Player 2 wins!')
            }
        }
    }
}
let newGame = new GameLogic()           //makes all elements in "GameLogic" exist in scope