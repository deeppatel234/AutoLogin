$(document).ready(function() {
    console.log("load");

    $(".account").click(function(e) {
        var account = $(e.currentTarget).attr("account");
        var username = "default";
        var password = "default";

        chrome.storage.sync.get([account + "-username", account + "-password" , account + "-key"], function(items) {
        	if(items[account + "-key"]){
	            var key = prompt("Please enter your key");
			    if (key != null) {
		            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		                var data = {
		                    account: account,
		                    username: items[account + "-username"],
		                    password: CryptoJS.AES.decrypt(items[account + "-password"],key).toString(CryptoJS.enc.Utf8)
		                }
		                chrome.tabs.sendMessage(tabs[0].id, data, function() {});
		                window.close();
		            });
			    }
			}else{
				var username = items[account + "-username"];
				if(username.length >= 4)
	    			key = username.substring(0, 4);
	    		else
	    			key = "Keys";
		    	
				chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	                var data = {
	                    account: account,
	                    username: items[account + "-username"],
	                    password: CryptoJS.AES.decrypt(items[account + "-password"],key).toString(CryptoJS.enc.Utf8)
	                }
	                chrome.tabs.sendMessage(tabs[0].id, data, function() {});
	                window.close();
	            });
			}
        });
    });


    function notify(message){
    	$("#notifyMessage").html(message);
        $(".link_notify").fadeIn("show");

        setTimeout(function() {
            $(".link_notify").fadeOut();
        }, 2000);
    }

    $(".save").click(function(e) {
    	var account = $( "#account" ).val();
    	var username = $( "#username" ).val();
    	var password = $( "#password" ).val();
    	$( "#password" ).val("")
    	var key = $("#pin").val();
    	$("#pin").val("")
    	var keyBool = true;

    	if(!key){
    		if(username.length >= 4)
    			key = username.substring(0, 4);
    		else
    			key = "Keys";
    		keyBool = false;
    	}

    	console.log(account , username , password , key , keyBool);
    	var tempusername = account.toLowerCase() + '-username';
    	var temppassword = account.toLowerCase() + '-password';
    	
    	var values = {}; 
        	
        values[tempusername] = username; 
        values[temppassword] = CryptoJS.AES.encrypt(password, key).toString();
        values[account.toLowerCase() + "-key"] = keyBool;

        chrome.storage.sync.set(values, function() {
            notify(account + " data added successfully..");
            $(".add-toggle").trigger("click");
        });
    });

    $(".closepopup").click(function(){
    	window.close();
    });

    var addtoggleTemp,deltoggleTemp;
    
    $(".delete").click(function(){
    	var account = $("#delaccount").val();
    	var tempusername = account.toLowerCase() + '-username';
    	var temppassword = account.toLowerCase() + '-password';
    	
    	var values = {}; 
        	
        values[tempusername] = ""; 
        values[temppassword] = "";
        values[account.toLowerCase() + "-key"] = false;

        chrome.storage.sync.set(values, function() {
            notify(account + " data deleted successfully..");
        });
    });

    $(".add-toggle").click(function(){
    	$("#account").change();
    	$("#add").css({'display' : 'block'});
    	$("#delete").css({'display' : 'none'});

    	addtoggleTemp = !addtoggleTemp;
    	deltoggleTemp = false;
    	if(addtoggleTemp)
    		$('body').animate({height: "355px"}, 500);
    	else
    		$('body').animate({height: "173px"}, 500);
    });

    $(".delete-toggle").click(function(){
    	$("#add").css({'display' : 'none'});
    	$("#delete").css({'display' : 'block'});
    	deltoggleTemp = !deltoggleTemp;
    	addtoggleTemp = false;
    	if(deltoggleTemp)
    		$('body').animate({height: "275px"}, 500);
    	else
    		$('body').animate({height: "173px"}, 500);
    });

    $("#activepin").click(function(){
    	if ($(this).is(':checked')) {
            $('#pin').attr("disabled",false);
        }else{
    		$('#pin').attr("disabled",true);
        }
    });

    $("#account").change(function(){
    	var account = $( "#account" ).val().toLowerCase();
    	chrome.storage.sync.get([account+"-username"], function(values) {
            $( "#username" ).val(values[account+"-username"]);
        });
	});
});
