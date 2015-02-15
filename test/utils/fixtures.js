module.exports = {
    modules: {

        autoexports: {
            Animal: __dirname+'/../fixtures/modules/autoexports/Animal.coffee',
            Horse: __dirname+'/../fixtures/modules/autoexports/Horse.coffee',
            Snake: __dirname+'/../fixtures/modules/autoexports/Snake.coffee',
            window: __dirname+'/../fixtures/modules/autoexports/window.coffee'
        },

        Animal: __dirname+'/../fixtures/modules/Animal.coffee',
        Horse: __dirname+'/../fixtures/modules/Horse.coffee',
        Snake: __dirname+'/../fixtures/modules/Snake.coffee',
        window: __dirname+'/../fixtures/modules/window.coffee'
    },

    prepend: {
        window: __dirname+'/../fixtures/prepend/window.coffee'
    },

    append: {
        instances: __dirname+'/../fixtures/append/instances.coffee',
        move: __dirname+'/../fixtures/append/move.coffee'
    }
};