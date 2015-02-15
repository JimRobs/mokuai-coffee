var mokuaiCoffee = require('../mokuai-coffee');
var readFile = require('./utils/readFile');
var fixtures = require('./utils/fixtures');

var expected = readFile(__dirname+'/expected/custom.besthorse.js');

exports.testCustomBestHorse = function(test){
    var result = mokuaiCoffee({
        JollyJumper: readFile(fixtures.modules.Horse),
        Animal: readFile(fixtures.modules.Animal)
    }, {
        exports: 'JollyJumper',
        exportsname: 'BestHorseEver'
    });

    test.equals(result, expected);
    test.done();
};

exports.testCustomBestHorseFromFiles = function(test){
    var result = mokuaiCoffee.fromFiles({
        JollyJumper: fixtures.modules.Horse,
        Animal: fixtures.modules.Animal
    }, {
        exports: 'JollyJumper',
        exportsname: 'BestHorseEver'
    });

    test.equals(result, expected);
    test.done();
};