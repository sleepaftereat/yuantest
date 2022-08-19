(function() {
    var getSwtSid = function() {
        var cookies = document.cookie && document.cookie.split('; ');
        if (cookies && cookies.length > 0) {
            for(var i = 0; i < cookies.length; i++) {
                var c = cookies[i];
                var pair = c.split('=');
                if (pair[0].match(/^LiveWSDHT\d+/g)){
                    return pair[1];
                }
            }
        }
    }

    var identifyWithSid = function() {
        var identified =  localStorage.getItem('xinhuaidentified');
        var sid = getSwtSid();
        if (!identified && sid && window.linkflow) {
            // identify
            window.linkflow.identify({
                externalId: sid,
                name: '商务通'+sid
            }, function(){
                localStorage.setItem('xinhuaidentified', new Date().getTime());
            }, function(err){
            })
        } else {
            // 1秒后重试
            setTimeout(identifyWithSid, 1000);
        }
    }
    try {
        identifyWithSid();
    } catch (err) {
        if (console && console.error) {
            console.error(err);
        }
    }
})()