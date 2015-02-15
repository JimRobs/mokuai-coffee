module.exports = (grunt)->
    'test.cli.simple':
        command:
            '
            node bin/mokuai-coffee.js
            test/fixtures/modules/window.coffee
            test/fixtures/modules/Horse.coffee
            test/fixtures/modules/Animal.coffee
            test/fixtures/modules/Snake.coffee
            --prepend test/fixtures/prepend/window.coffee
            --append test/fixtures/append/instances.coffee
            --append test/fixtures/append/move.coffee
            --output test/cli/simple.js
            '
    'test.cli.simple.partial':
        command:
            '
            node bin/mokuai-coffee.js
            test/fixtures/modules/window.coffee
            test/fixtures/modules/Horse.coffee
            test/fixtures/modules/Animal.coffee
            test/fixtures/modules/Snake.coffee
            --prepend test/fixtures/prepend/window.coffee
            --append test/fixtures/append/instances.coffee
            --append test/fixtures/append/move.coffee
            --output test/cli/simple.partial.js
            --partial
            '
    'test.cli.simple.autoexports':
        command:
            '
            node bin/mokuai-coffee.js
            test/fixtures/modules/autoexports/window.coffee
            test/fixtures/modules/autoexports/Horse.coffee
            test/fixtures/modules/autoexports/Animal.coffee
            test/fixtures/modules/autoexports/Snake.coffee
            --prepend test/fixtures/prepend/window.coffee
            --append test/fixtures/append/instances.coffee
            --append test/fixtures/append/move.coffee
            --autoexports
            --exports
            --output test/cli/simple.autoexports.js
            '
    'test.cli.custom':
        command:
            '
            node bin/mokuai-coffee.js
            JollyJumper:test/fixtures/modules/Horse.coffee
            test/fixtures/modules/Animal.coffee
            Kaa:test/fixtures/modules/Snake.coffee
            --exports
            --output test/cli/custom.js
            '
    'test.cli.custom.jollyjumper':
        command:
            '
            node bin/mokuai-coffee.js
            JollyJumper:test/fixtures/modules/Horse.coffee
            test/fixtures/modules/Animal.coffee
            --exports JollyJumper
            --output test/cli/custom.jollyjumper.js
            '
    'test.cli.custom.besthorse':
        command:
            '
            node bin/mokuai-coffee.js
            JollyJumper:test/fixtures/modules/Horse.coffee
            test/fixtures/modules/Animal.coffee
            --exports JollyJumper
            --exportsname BestHorseEver
            --output test/cli/custom.besthorse.js
            '

    # Test CLI failure
    'test.cli.failure':
        command:
            '
            node bin/mokuai-coffee.js
            SubAnimal:test/fixtures/modules/Horse.coffee
            SubAnimal:test/fixtures/modules/Snake.coffee
            test/fixtures/modules/Animal.coffee
            '
        options:
            stdout: no
            stderr: no
            callback: (error, stdout, stderr, done)->
                if error and stderr is 'Module name must be unique : found several "SubAnimal"\n'
                    grunt.log.ok 'CLI failed as expected (multiple "SubAnimal" module name)'
                    done()
                else
                    grunt.log.error 'CLI did not failed as expected... '
                    done no

