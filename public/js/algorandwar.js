
cards.init({table:'#card-table', type:STANDARD});

deck = new cards.Deck();
deck.x -= 50;

deck.addCards(cards.all);
deck.render({immediate:true});

lowerhand = new cards.Hand({faceUp:false,  y:340});

discardPile = new cards.Deck({faceUp:true});
discardPile.x += 50;

$('#deal').click(function() {
	$('#deal').hide();
	deck.deal(26, [lowerhand], 50, function() {  
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

lowerhand.click(function(card){
	if (card.rank > discardPile.topCard().rank){ 
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
			window.location.href = "https://algorandwar.herokuapp.com";
		 }, 2000);
	}else if (cpuPoints == 10){
		$('#winningHand').html("You lose... Please try again!");
		setTimeout(function(){ 
			window.location.href = "https://algorandwar.herokuapp.com";
		 }, 2000);
	}
});