var coffeeFacade = require("./facades/coffeeFacade");
var gpio = require("rpi-gpio");

module.exports = {
    updateAlarms: function(){
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();

        function closePins() {
            gpio.setup(17, gpio.DIR_LOW, gpio.destroy);
        }

        function pause() {
            setTimeout(closePins, 36000);
        }

        coffeeFacade.getByFilter({hour: hour, minute: minute}, function (result) {
            if(result.length > 0){
                var result = result[0];

                if(result.fired === undefined || result.fired === null || result.fired === false){
                    try{
                        gpio.setup(17, gpio.DIR_HIGH, pause);
                    }catch(e){
                        console.log("Could not start pin. Maybe not a raspberry?");
                    }

                    coffeeFacade.update(result._id, {fired: true});
                }
            }else{
                coffeeFacade.updateAll({fired: false});
            }
        });
    }
};