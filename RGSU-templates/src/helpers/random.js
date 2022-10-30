module.exports = function(options) {
  // options.fn(this) = Handelbars content between {{#bold}} HERE {{/bold}}
  //function random(min, max) {
	//  return min + Math.floor(Math.random() * (max - min + 1));
	//};
  var numbers = JSON.parse("[" + options.fn(this) + "]");
	var min = numbers[0];
	var max = numbers[1];
  return min + Math.floor(Math.random() * (max - min + 1));
}