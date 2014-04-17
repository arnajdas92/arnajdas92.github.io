var menu_state = {
    create: function () {
        // Call the 'play' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this); 

        // Adding a label centered on the screen
        var style = { font: "30px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2;
        var text1 = this.game.add.text(x, y-50, "Press space to start", style);
		var text2 = this.game.add.text(x, y-80, "Press space to jump", style);
        text1.anchor.setTo(0.5, 0.5);
		text2.anchor.setTo(0.5, -1.5);

        // If the user already played, display its previous score
        if (score > 0) {
            var score_label = this.game.add.text(x, y+50, "score: " + score, style);
            score_label.anchor.setTo(0.5, 0.5); 
        }
    },

    // Start the actual game
    start: function () {
        this.game.state.start('play');
    }
};