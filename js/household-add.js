$(function(){
	var tabLinks = document.querySelectorAll(".tablinks");
	var tabContent =document.querySelectorAll(".tabcontent");

	tabLinks.forEach(function(el) {
		el.addEventListener("click", openTabs);
	});


	function openTabs(el) {
		var btn = el.currentTarget; // lắng nghe sự kiện và hiển thị các element
		var electronic = btn.dataset.electronic; // lấy giá trị trong data-electronic

		tabContent.forEach(function(el) {
			el.classList.remove("active");
		});

		tabLinks.forEach(function(el) {
			el.classList.remove("active");
		});

		document.querySelector("#" + electronic).classList.add("active");

		btn.classList.add("active");
	}
});

$(function(){
	'use strict';
	var $submit = $('button[name=addNew]'),
		$placeholder = $(".preloader");
	
	
	function init() {
		$submit.on('click', function(){
			var data = $('form#form-thuong-tru').serializeArray(),
				arr = [];
			
			$.each(data, function(i, field) {
				arr[i] = field.value;
				i++;
            });
			
			arr[25] = ($("#capSoMoi").is(':checked') == true) ? 1 : 0;
			
			var dataString = JSON.stringify(arr);
			
            $.ajax({
                type : "POST",
                url : "./php/processing.php",
                data : {
                    peopleData : '1',
                    people_data : dataString
                },
                dataType : 'json',
                beforeSend : function(){
                    $placeholder.show();
                },
                success : function(res){
//                    console.log(res);
                    if(res == "Error") {
                        $(".preloader").fadeOut("slow");
                        $("p#noti-add").html("Lỗi kết nối với máy chủ.");
                    }else{
                        (confirm(res) == true) ? window.location.reload() : window.location.reload();
                    }
                },
				error : function(){
					$(".preloader").fadeOut("slow");
//					console.log(e);
				}
            });
			
			return false;
		});
		
		$("#form-tam-tru button[name=btn_tam_tru]").on('click', function(){
			alert("x");
		});
		
		$(".capSoMoi .check-box input[type=checkbox]").on('change', function(){
			if ($(this).is(':checked') == true){
				$(".maKHuVuc").show();
				$("input[name=maKhuVuc]").attr("required", true);
				$("input[name=quanHeVoiChuHo]").attr("value", "Chủ hộ");
				$(".tenChuHo, .maHoKhau").css("pointer-events", "none");
				$(".tenChuHo, .tenChuHo label, .maHoKhau, .maHoKhau label").css("background-color", "#dde9f8");
				$(".quanHeVoiChuHo").addClass('focus').css("pointer-events", "none");
				$(".quanHeVoiChuHo label").css({fontSize : "1rem", top : "-6px"});
			}else{
				$(".maKHuVuc").hide();
				$("input[name=maKhuVuc]").attr("required", false);
				$("input[name=quanHeVoiChuHo]").removeAttr('value');
				$(".tenChuHo, .maHoKhau").removeAttr('style');
				$(".tenChuHo, .tenChuHo label, .maHoKhau, .maHoKhau label").css("background-color", "");
				$(".quanHeVoiChuHo").removeClass('focus').removeAttr('style');
				$(".quanHeVoiChuHo label").css({fontSize : "1.2rem", top : "20px"})
				
			}
		});
		
		
		
	}
	
	init();
	
	return {
		init : init
	}
});


$(function(){
	$('form').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) { 
        e.preventDefault();
        return false;
      }
    });
	
	$(".form-responsive")
		.find(".form-control")
		.each(function () {
			var targetItem = $(this).parent();
			if ($(this).val()) {
				$(targetItem)
					.find("label")
					.css({
						top: "-6px"
						, fontSize: "1.2rem"
						, color: "#858796"
					});
			}
		});
	$(".form-responsive")
		.find(".form-control")
		.focus(function () {
			$(this)
				.parent(".input-block")
				.addClass("focus");
			$(this)
				.parent()
				.find("label")
				.animate({
						top: "-6px"
						, fontSize: "1rem"
						, color: "#858796"
					}
					, 400
				);
		});
	$(".form-responsive")
		.find(".form-control")
		.blur(function () {
			if ($(this).val().length == 0) {
				$(this)
					.parent(".input-block")
					.removeClass("focus");
				$(this)
					.parent()
					.find("label")
					.animate({
							top: "20px"
							, fontSize: "1.2rem"
						}
						, 400
					);
			}
		});
});