// JavaScript Document

//$(window).on('load', checkLogin);
//function checkLogin() {
//	
//    $.ajax({
//        type: "POST",
//        url: "checkstatus.php",
//        success: function(res){
//			alert(res);
//            if(res == "success") {
//                window.location.href="dashboard.html";
//            }else{
//                $(".preloader").fadeOut("slow");
//            }
//        }
//    });
//}

$('.toggle').on('click', function() {
	$('.container').stop().addClass('active');
});

$('.close').on('click', function() {
	$('.container').stop().removeClass('active');
});

$(function () 
{
	var username = '',
		password = '',
		$btn_login = $('#login-button'),
		$noti = $("#noti-login"),
		$user = $("#form-login .input-container:first-child input"),
		$pass = $("#form-login .input-container:nth-child(2) input");
	
	function init() {
		
		$btn_login.on('click', function(){
			username = $user.val();
			password = $pass.val();
			
			logining(username, password);
		});
	}
	
	function checkLogin() {
		$.ajax({
			type: "POST",
			url: "./php/checkstatus.php",
			success: function(res){
				if(res == "failed") {
					$(".preloader").fadeOut("slow");
				}else{
					window.location.href="dashboard.html";
				}
			}
		});
	}
	
	function logining(user, pass){
		$noti.html("");
        $.ajax({
            type: 'POST',
            url: './php/login.php',
            data: {
                do_login: "do_login",
                user: user,
                pass: pass
            },
            success: function(res){
                if(res != 'success')
                {
                    $noti.html(res);
                }else{
					window.location.href = './dashboard.html';
				}
            }
        });
	}
	
	init();
	checkLogin();
	
	return { 
		init : init,
		checkLogin : checkLogin,
	};
});