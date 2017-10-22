var coffeeFacade = require("./facades/coffeeFacade");
var gpio = require("rpi-gpio");

gpio.setMode(gpio.MODE_BCM);

var pin = 4;

module.exports = {
    updateAlarms: function(){
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();

        function closePins() {
            gpio.write(pin, false, function (err) {
                if(err) throw err;
                console.log("End making coffee")
            });
            gpio.destroy();
        }

        function pause() {
            console.log("Making coffee");

            gpio.write(pin, true, function(err){
                if(err) throw err;
                console.log("Written to pin");
                setTimeout(closePins, 36000);
            });
        }

        coffeeFacade.getByFilter({hour: hour, minute: minute}, function (result) {
            if(result.length > 0){
                var result = result[0];

                if(result.fired === undefined || result.fired === null || result.fired === false){
                    gpio.setup(pin, gpio.DIR_OUT, pause);

                    coffeeFacade.update(result._id, {fired: true});
                }
            }else{
                coffeeFacade.updateAll({fired: false});
            }
        });
    }
};