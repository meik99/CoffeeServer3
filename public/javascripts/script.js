function reloadAlarms(){
    $.ajax({
        url: "/api/coffee/asList",
        method: "GET"
    }).done(function (result) {
        $("#alarmList").html(result);
        upgradeElements();
    }).fail(function () {
        alert("Didn't work, mate");
    });
}

function update(id){
    var hour = parseInt($("#hour" + id).val());
    var minute = parseInt($("#minute" + id).val());
    $.ajax({
            method: 'PUT',
            url: '/api/coffee/' + id,
            data:{
                hour: hour,
                minute: minute
            }
        }
    );
}

function remove(id){
    $.ajax({
            method: 'DELETE',
            url: '/api/coffee/' + id
        }
    ).done(function () {
        reloadAlarms();
    });
}

function upgradeElements(){
    var nodes = document.getElementsByTagName("*");
    componentHandler.upgradeElements(nodes);
}

upgradeElements();