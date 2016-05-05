var ip;
function SelectText () {
        var input = document.getElementById("mytextbox");
         input.focus();
         input.setSelectionRange(2,5);
         alert(input.value);
         ip = input.value;
}
 function hrmStart(){
	
        webapis.motion.start("HRM", function(hrmData){
            //process the HRM data
        	var textbox = document.querySelector('.contents');
            box = document.querySelector('#textbox');
            box.innerHTML = hrmData.heartRate;
            
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                	console.log('this is response '+xhr.responseText); 
                    //alert(xhr.responseText);
                }
            }
          //  xhr.open('GET', 'http://54.172.41.133:8080/heart/api/heart/9884110869/vishwa@gmail.com/'+hrmData.heartRate, true);
          //  xhr.open('GET', 'http://'+ip+':8080/WatchServ/hbm?hbm='+hrmData.heartRate, true);
            xhr.open('GET', 'http://54.172.41.133:10000/storerate?val='+hrmData.heartRate, true);
            
            xhr.send();
        });
    }

    //stops the HRM sensor
    function hrmStop(){
        webapis.motion.stop("HRM");
    }
   
window.onload = function () {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
	try {
	    tizen.application.getCurrentApplication().exit();
	} catch (ignore) {
	}
    });
    hrmStart();
    setTimeout(function() {
    	hrmStop();
    	hrmStart();
    }, 5000);
    
    // Sample code
  /*  var textbox = document.querySelector('.contents');
    textbox.addEventListener("click", function(){
    	box = document.querySelector('#textbox');
    	box.innerHTML = box.innerHTML == "Basic123" ? "Sample" : "Basic123";
    });*/
   
    
};
