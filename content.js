chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

	if(msg.account == "odoo"){
	    document.getElementById("login").value = msg.username;
	    document.getElementById("password").value = msg.password;
	    document.getElementsByClassName("oe_login_form")[0].submit();
	}

	if(msg.account == "facebook"){
		document.getElementById("email").value = msg.username;
	    document.getElementById("pass").value = msg.password;
	    document.getElementById("login_form").submit();
	}

	if(msg.account == "linkdin"){
	    document.getElementById("login-email").value = msg.username;
	    document.getElementById("login-password").value = msg.password;
	    document.getElementsByClassName("login-form ")[0].submit()
	}

	if(msg.account == "github"){
	    document.getElementById("login_field").value = msg.username;
	    document.getElementById("password").value = msg.password;
	    document.getElementsByName("commit")[0].click();
	}

	if(msg.account == "moodle"){
	    document.getElementById("username").value = msg.username;
	    document.getElementById("password").value = msg.password;
	    document.getElementById("loginbtn").click();
	}
});
