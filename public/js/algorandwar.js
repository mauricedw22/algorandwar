
//Tell the library which element to use for the table
cards.init({table:'#card-table', type:STANDARD});

//Create a new deck of cards
deck = new cards.Deck();
//By default it's in the middle of the container, put it slightly to the side
deck.x -= 50;

//cards.all contains all cards, put them all in the deck
deck.addCards(cards.all);
//No animation here, just get the deck onto the table.
deck.render({immediate:true});

//Now lets create a couple of hands, one face down, one face up.
// upperhand = new cards.Hand({faceUp:false, y:60});
lowerhand = new cards.Hand({faceUp:false,  y:340});

//Lets add a discard pile
discardPile = new cards.Deck({faceUp:true});
discardPile.x += 50;


//Let's deal when the Deal button is pressed:
$('#deal').click(function() {
	//Deck has a built in method to deal to hands.
	$('#deal').hide();
	deck.deal(26, [lowerhand], 50, function() {  // deck.deal(26, [upperhand, lowerhand], 50, function() {
		//This is a callback function, called when the dealing
		//is done.
		discardPile.addCard(deck.topCard());
		discardPile.render();
	});
});

$('#contract').hide();

$('#bet').click(function() {
	$('#contract').show();
	$('#contract').text('Loading...');
	setTimeout(function(){ 
		$('#contract').text('Contract launched!');
	 }, 2000);
});

var playerPoints = 0;
var cpuPoints = 0;

//Finally, when you click a card in your hand, if it's
//the same suit or rank as the top card of the discard pile
//then it's added to it
lowerhand.click(function(card){
	if (card.rank > discardPile.topCard().rank){  // card.suit == discardPile.topCard().suit ||
		$('#winningHand').html("Your " + card.rank + " beats the CPU's " + discardPile.topCard().rank);
		discardPile.addCard(card);
		playerPoints++;
		// console.log(playerPoints);
		$('#player').html(playerPoints);		
		discardPile.addCard(deck.topCard());
		discardPile.render();
		lowerhand.render();	
	}else if(card.rank == discardPile.topCard().rank){
		$('#winningHand').html("It's a TIE! Keep Plucking!");
		discardPile.addCard(card);
		discardPile.addCard(deck.topCard());
		discardPile.render();
		lowerhand.render();
	}else{
		$('#winningHand').html("The CPU's " + discardPile.topCard().rank + " beats your  " + card.rank);
		discardPile.addCard(card);
		cpuPoints++;
		console.log(cpuPoints);
		$('#cpu').html(cpuPoints);
		discardPile.addCard(deck.topCard());
		discardPile.render();
		lowerhand.render();
	}

	if (playerPoints == 10){
		$('#winningHand').html("Congrats, YOU WIN!");
		setTimeout(function(){ 
			window.location.href = "http://localhost:5000";
		 }, 2000);
	}else if (cpuPoints == 10){
		$('#winningHand').html("You lose... Please try again!");
		setTimeout(function(){ 
			window.location.href = "http://localhost:5000";
		 }, 2000);
	}
});