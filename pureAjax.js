 function ajaxCall(url, cb){
 
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        
        /** process server response */
        
        // Step1 :  check the client request's state
        if(xhr.readyState === XMLHttpRequest.DONE) {
            
            console.log("req received");

            // Step 2 : check the response code of the HTTP response.
            if (xhr.status === 200) {
                // Perfect!
                cb(xhr.responseText, "Perfect!!");
            } else {
                // There was a problem with the request.
                console.log("Got Problem")
            }
        }else {
            // Not ready yet.
            console.log("not ready");
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// test
var url = "Some url";
ajaxCall(u, function(res){
    console.log(res);
});
