var coffeeFacade = require("./facades/coffeeFacade");
var gpio = require("rpio");

var options = {
    gpiomem: true,
    mapping: "gpio",
    mock: undefined
};

gpio.init(options);

var pin = 4;

module.exports = {
    updateAlarms: function(){
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();

        coffeeFacade.getByFilter({hour: hour, minute: minute}, function (result) {
            if(result.length > 0){
                var result = result[0];

                if(result.stopped === undefined || result.stopped === null || result.stopped === false){
                    if(result.fired === undefined || result.fired === null || result.fired === false){
                        this.makeCoffee();
                        coffeeFacade.update(result._id, {fired: true, stopped: false});
                    }
                }

            }else{
                coffeeFacade.updateAll({fired: false});
            }
        });
    },

    makeCoffee: function(){
        gpio.open(pin, gpio.OUTPUT);
        console.log("HIGH");
        gpio.write(pin, gpio.HIGH);

        setTimeout(function () {
            gpio.write(pin, gpio.LOW);
            console.log("LOW");
            gpio.close(pin, gpio.PIN_RESET);
        }, 500);
    }
};