$(function(){
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
	
	$(".custom-select[name=phanLoai]").change(function(){
			$(this)
				.parent()
				.addClass("focus")
				.find("label")
				.animate({
						top: "-6px"
						, fontSize: "1rem"
						, color: "#858796"
					}
					, 300
				);
		});
});


$(function(){
	$.validator.addMethod("letters", function(value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/);
    });

    $.validator.addMethod("valiDate", function(value, element) {
        return this.optional(element) || value == value.match(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/gm);
    });

    $.validator.addMethod("phoneVN", function(value, element) {
        return this.optional(element) || value == value.match(/^[0-9]{3}?[\s]?[0-9]{3}[\s]?[0-9]{4}\b/);
    });
	
   $("#form-covid").validate({
		onsubmit: false,
		onfocusout: false,
        onkeyup: false,
        rules: {
            hoTen : {
                required : true,
                minlength : 2,
                letters : true
            },
            namSinh : {
                required : true,
                valiDate : true
            },
            soDienThoai : {
                required : true,
                minlength : 10,
                phoneVN : true
            },
            diaChi : "required",
			phanLoai : "required",
			hinhThucCachLy : "required",
			hinhThucTest : "required",
			thoiGianBatDau : "required",
			diaDiemCachLy : "required"
        },
        messages: {
            hoTen : {
                required : "Vui lòng nhập đầy đủ thông tin có dấu *",
                minlength : "Vui lòng nhập họ và tên ít nhất 2 ký tự",
                letters : "Vui lòng nhập họ và tên bằng chữ cái in thường, chữ cái in hoa và dấu cách"
            },
			namSinh : {
                required : "Vui lòng nhập đầy đủ thông tin có dấu *",
                valiDate : "Vui lòng nhập đúng định dạng của ngày tháng năm"
            },
			soDienThoai : {
                required : "Vui lòng nhập đầy đủ thông tin có dấu *",
                minlength : "Số điện thoại không đúng định dạng",
                phoneVN : "Số điện thoại không đúng định dạng"
            },
			diaChi : {
				required : "Vui lòng nhập đầy đủ thông tin có dấu *"
			},
			phanLoai : {
				required : "Vui lòng nhập đầy đủ thông tin có dấu *"
			},
			hinhThucCachLy : {
				required : "Vui lòng nhập đầy đủ thông tin có dấu *"
			},
			hinhThucTest : {
				required : "Vui lòng nhập đầy đủ thông tin có dấu *"
			},
			thoiGianBatDau : {
				required : "Vui lòng nhập đầy đủ thông tin có dấu *"
			},
			diaDiemCachLy : {
				required : "Vui lòng nhập đầy đủ thông tin có dấu *"
			}
        },
        errorPlacement: function(error) {
            $("#form-covid .error-inf").html(error);
        }
    });
	
	$("#btn-add").on('click', function(e){
        e.preventDefault();
        if($("#form-covid").valid() == true)
		{
			var data = $("#form-covid").serializeArray(),
				arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

			$.each(data, function(i, field) {
				arr[i] = field.value;
			});

			var dataString = JSON.stringify(arr),
				$placeholder = $(".preloader");

			console.log(data);

			$.ajax({
				type : "POST",
				url : "./php/processing.php",
				data : {
					themCovid : '1',
					data : dataString
				},
				dataType : 'json',
				beforeSend : function(){
					$placeholder.show();
				},
				success : function(res){
					$(".preloader").fadeOut("slow");
					if(res == "1") {
						(confirm("Khai báo thành công") == true) ? window.location.reload() : window.location.reload();
					}else{
						$("p#noti-add").html("Lỗi kết nối với máy chủ.");
					}
				},
				error : function(e){
					console.log(e);
					$("p#noti-add").html("Lỗi kết nối với máy chủ.");
					$(".preloader").fadeOut("slow");
				}
			});
		}else{
			$("p#noti-add").html("Điền đầy đủ thông tin yêu cầu");
		}	
	});
});