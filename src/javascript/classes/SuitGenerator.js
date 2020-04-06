
class SuitGenerator {

  constructor() {
    this.special = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', 
    '[', ']', '{', '}', ':', ';', '\'', '"', '<', '>', '/', '?'];
  }

  getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

  generate_number_suit() {
		return (Math.random() * Math.pow(10, 17)).toString();
  }
  
  generate_symbols_suit() {
		let suit = "";
		for (let index = 0; index < 18; index++) {
			const number = this.getRandomInt(0, this.special.length - 1);
			suit += this.special[number];
		}
		return suit;
  }
  
  generateNumbers() {
    let suit = "";
    for (let index = 0; index < 20; index++) {
      suit += this.generate_number_suit() + ' ';
    }
    return suit;
  }
  
  generateSymbols() {
    let suit = "";
    for (let index = 0; index < 20; index++) {
      suit += this.generate_symbols_suit() + ' ';
    }
    return suit;
  }
}

export { SuitGenerator };