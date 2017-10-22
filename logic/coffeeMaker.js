var coffeeFacade = require("./facades/coffeeFacade");
var gpio = require("rpio");

var options = {
    gpiomem: true,
    mapping: "gpio",
    mock: "raspi-b+"
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

                if(result.fired === undefined || result.fired === null || result.fired === false){
                    gpio.open(pin, gpio.OUTPUT, gpio.HIGH);

                    setTimeout(function () {
                       gpio.write(pin, gpio.LOW);
                       gpio.close(pin, gpio.PIN_RESET);
                    });
                    coffeeFacade.update(result._id, {fired: true});
                }
            }else{
                coffeeFacade.updateAll({fired: false});
            }
        });
    }
};