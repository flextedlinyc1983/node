require.config({
	paths: {
// 		"jquery": "jquery.min.js",
// 　　　　"underscore": "underscore.min.js",
// 　　　　"backbone": "backbone.min.js"
		"math":"require_test"
　　}
});

require(["math"], function(math) {
  console.log(math.add(1,1));  
});