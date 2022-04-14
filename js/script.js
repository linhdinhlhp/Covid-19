// JavaScript Document

//$(window).on('load', checkLoginStatus);
//
//function checkLoginStatus() {
//    $.ajax({
//            type: "POST",
//            url: "checkstatus.php",
//            success: function(res){
//                if(res == "1") {
//                     window.location.href = "index.html"; 
//                }
//				else
//				{
//					$(".preloader").fadeOut("slow");
//				}
//            }
//    });
//}

function do_register() 
{
	var user = $("#form-register .input-container:first-child input").val();
	var pass = $("#form-register .input-container:nth-child(2) input").val();
	var repass = $("#form-register .input-container:nth-child(3) input").val();
	if(user != "" && pass != "" && repass != "") 
	{
		$.ajax({
			type: 'POST',
			url: './php/login.php',
			data: {
				do_login: "do_register",
				user: user,
				pass: pass,
				repass: repass
			},
			success: function(response){
				if(response == "success")
				{
					window.location.href="index.html";
				}
				else
				{
					$("#loading_spinner").css({"display":"none"});
					$("#noti-login").html(response);
				}
			}
		});
	}
	
	return false;
}