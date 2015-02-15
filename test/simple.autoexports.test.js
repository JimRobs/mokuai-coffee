var mokuaiCoffee = require('../mokuai-coffee');
var readFile = require('./utils/readFile');
var fixtures = require('./utils/fixtures');

var expected = readFile(__dirname+'/expected/simple.autoexports.js');

exports.testSimpleAutoExports = function(test){
    var result = mokuaiCoffee({
        window: readFile(fixtures.modules.autoexports.window),
        Horse: readFile(fixtures.modules.autoexports.Horse),
        Animal: readFile(fixtures.modules.autoexports.Animal),
        Snake: readFile(fixtures.modules.autoexports.Snake)
    }, {
        prepend: [
            readFile(fixtures.prepend.window)
        ],
        append: [
            readFile(fixtures.append.instances),
            readFile(fixtures.append.move)
        ],
        exports: true,
        autoexports: true
    });

    test.equals(result, expected);
    test.done();
};

exports.testSimpleAutoExportsFromFiles = function(test){
    var result = mokuaiCoffee.fromFiles({
        window: fixtures.modules.autoexports.window,
        Horse: fixtures.modules.autoexports.Horse,
        Animal: fixtures.modules.autoexports.Animal,
        Snake: fixtures.modules.autoexports.Snake
    }, {
        prepend: [
            fixtures.prepend.window
        ],
        append: [
            fixtures.append.instances,
            fixtures.append.move
        ],
        exports: true,
        autoexports: true
    });

    test.equals(result, expected);
    test.done();
};