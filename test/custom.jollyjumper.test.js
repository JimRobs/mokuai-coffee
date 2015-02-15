var mokuaiCoffee = require('../mokuai-coffee');
var readFile = require('./utils/readFile');
var fixtures = require('./utils/fixtures');

var expected = readFile(__dirname+'/expected/custom.jollyjumper.js');

exports.testCustomJollyJumper = function(test){
    var result = mokuaiCoffee({
        JollyJumper: readFile(fixtures.modules.Horse),
        Animal: readFile(fixtures.modules.Animal)
    }, {
        exports: 'JollyJumper'
    });

    test.equals(result, expected);
    test.done();
};

exports.testCustomJollyJumperFromFiles = function(test){
    var result = mokuaiCoffee.fromFiles({
        JollyJumper: fixtures.modules.Horse,
        Animal: fixtures.modules.Animal
    }, {
        exports: 'JollyJumper'
    });

    test.equals(result, expected);
    test.done();
};