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
                    , fontSize: "1.2em"
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
                    , fontSize: "1em"
                }
                , 300
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
                    , 300
                );
        }
    });
});


// Animation menu
$(function() {
	var isAnimating = false,
		$nextPage = '',
		$currPage = '',
		$iterate = $(".nav-item"),
		outClass = 'pt-page-scaleDown',
        inClass = '',
        endCurrPage = false,
        endNextPage = false,
        animation = '';
	var $currMenu = '', $nextMenu = '';
	var $button = $(".text-cover > a > button");
	
	function init() {
		$iterate.on( 'click', function() {
			$currMenu = $(".nav-item.active");
			$nextMenu = $(this);
			if($nextMenu.is($currMenu)){
				return false;
			}
			
			if(isAnimating) {
				return false;
			}
			
			nextPage($nextMenu, $currMenu);
		} );
		$button.on("click", function(){
			$currMenu = $(".nav-item.active");
			$nextMenu = $(".nav-item:nth-child(3)");
			if($nextMenu.is($currMenu)){
				return false;
			}
			
			if(isAnimating) {
				return false;
			}
			
			nextPage($nextMenu, $currMenu);
		});
	}
	
	function nextPage($nextMenu, $currMenu) {
		
		if(isAnimating) {
            return false;
        }
		
		isAnimating = true;
		
		$currMenu.removeClass("active");
		$nextMenu.addClass("active");
		
//		if($nextMenu.find("a").attr("href") == '#home' && $currMenu.find("a").attr("href") == '#news' || $nextMenu.find("a").attr("href") == '#news' && $currMenu.find("a").attr("href") == '#home'){
//			isAnimating = false;
//			return false;
//		}
		
		if($nextMenu.find("a").attr("href") == '#home'){
			$currPage = $(".pt-wrapper.pt-page-current");
			$currPage.addClass('pt-page-scaleDown').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e){
				$(this).off(e);
				$currPage.attr("class", "pt-wrapper");
				isAnimating = false;
			});
			return false;
		}
		
		var x = $nextMenu.find(".nav-link").data("id");
		if($currMenu.find("a").attr("href") == '#home' && x){
			$nextPage = $("#"+ x);
			animation = $nextMenu.find(".nav-link").data("animation");
			switch(animation){
				case 1:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromRight pt-page-ontop';
					break;
				case 2:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromLeft pt-page-ontop';
					break;
				case 3:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromBottom pt-page-ontop';
					break;
			}
			$nextPage.addClass(inClass).on( "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e) {
				$(this).off(e);
				$nextPage.attr( "class", "pt-wrapper" + " pt-page-current" );
				isAnimating = false;
			});
			return false;
		}
		
		if(x){
			$nextPage = $("#"+ x);
			$currPage = $(".pt-wrapper.pt-page-current");
			animation = $nextMenu.find(".nav-link").data("animation");
			switch(animation){
				case 1:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromRight pt-page-ontop';
					break;
				case 2:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromLeft pt-page-ontop';
					break;
				case 3:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromBottom pt-page-ontop';
					break;
			}
			
			$currPage.addClass(outClass).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e){
				$(this).off(e);
				endNextPage = true;
				if(endCurrPage) {
					onEndAnimation( $currPage, $nextPage);
				}
			});
			
			$nextPage.addClass(inClass).on( "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e) {
				$(this).off(e);
				endCurrPage = true;
				if(endNextPage) {
					onEndAnimation( $currPage, $nextPage);
				}
			});
		}
	}
	
	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
        endNextPage = false;
		$outpage.attr("class", "pt-wrapper");
        $inpage.attr( "class", "pt-wrapper" + " pt-page-current" );
		isAnimating = false;
	}
	
	init();
	
	return { 
		init : init,
		nextPage : nextPage,
	};
	
});

// Form
$(function () {
	var x = window.location.hash;
	
	if(x == '#declare') {
		x = 'pt-wrapper-1';
		$(".site-nav li.nav-item:nth-child(3)").addClass("active"); 
	} else if(x == '#contact') {
		x = 'pt-wrapper-2';
		$(".site-nav li.nav-item:nth-child(4)").addClass("active"); 
	} else if(x == '#news') {
		x = 'pt-wrapper-0';
		$(".site-nav li.nav-item:nth-child(2)").addClass("active"); 
	} else {
		x = '';
		$(".site-nav li.nav-item:nth-child(1)").addClass("active"); 
	}
	
	if(x) {
		$("#"+x).addClass("pt-page-current");
		
		if(x == 'pt-wrapper-0'){
			$("#"+x).addClass("pt-page-moveFromBottom");
		}else if(x == 'pt-wrapper-1'){
			$("#"+x).addClass("pt-page-moveFromLeft");
		}else{
			$("#"+x).addClass("pt-page-moveFromRight");
		}

		setTimeout(function(){			
			if(x == 'pt-wrapper-0'){
				$("#"+x).removeClass("pt-page-moveFromBottom");
			}else if(x == 'pt-wrapper-1'){
				$("#"+x).removeClass("pt-page-moveFromLeft");
			}else{
				$("#"+x).removeClass("pt-page-moveFromRight");
			}
		}, 1000);
	}
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

	
   $("#form-inf").validate({
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
			gioiTinh : {
				required : true,
			},
            soDienThoaiLienHe : {
                required : true,
				minlength : 10,
				phoneVN : true
            },
			soCMT : {
				required : false,
				digits : true,
				minlength : 12
			},
            diaChi : "required",
			agree_1 : "required",
			hoTenNguoiKhaiBao : {
				required : true,
				minlength : 2,
                letters : true
			}
        },
        messages: {
            hoTen : {
                required : "Vui lòng nhập họ và tên",
                minlength : "Vui lòng nhập họ và tên ít nhất 2 ký tự",
                letters : "Vui lòng nhập họ và tên bằng chữ cái in thường, chữ cái in hoa và dấu cách"
            },
            namSinh : {
				required : "Vui lòng nhập ngày tháng năm sinh",
				valiDate : "Vui lòng nhập đúng định dạng của ngày tháng năm"
            },
			gioiTinh : {
				required : "Vui lòng chọn giới tính",
			},
			soDienThoaiLienHe : {
				required : "Vui lòng nhập số điện thoại",
				minlength : "Số điện thoại không đúng định dạng",
				phoneVN : "Số điện thoại không đúng định dạng"
			},
			soCMT : {
				digits : "Số CCCD không đúng định dạng",
				minlength : "Số CCCD gồm 12 chữ số"
			},
			diaChi : {
				required : "Vui lòng nhập địa chỉ"
            },
			agree_1 : {
				required : "Vui lòng tích vào ô đồng ý"
			},
			hoTenNguoiKhaiBao : {
                required : "Vui lòng nhập họ và tên người khai báo hộ",
                minlength : "Vui lòng nhập họ và tên ít nhất 2 ký tự",
                letters : "Vui lòng nhập họ và tên bằng chữ cái in thường, chữ cái in hoa và dấu cách"
            }
        },
        errorPlacement: function(error) {
			$("#form-inf .error-inf").html(error);
//			error.appendTo( element.parent("form").prev("input") );
        },
        submitHandler: function() {
            $("#btn1").attr("checked", false);
            $("#btn2").trigger("click");
            $(".card-body .timeline_info").not(".page-2").removeClass("timeline_info_active");
            $(".card-body .page-2").addClass("timeline_info_active");
        }
    });
	
	$("#form-khao-sat").validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
			agree_2 : "required"
        },
        messages: {
			agree_2 : {
				required : "Vui lòng tích vào ô đồng ý"
			}
        },
        errorPlacement: function(error) {
			$("#form-khao-sat .error-inf").html(error);
//			error.appendTo( element.parent("form").prev("input") );
        },
        submitHandler: function() {
			var data_1 = $("#form-inf").serializeArray(),
				data_2 = $("#form-khao-sat").serializeArray(),
				arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			
			$.each(data_1, function(i, field) {
				arr[i] = field.value;
            });
						
			$.each(data_2, function(i, field) {
				if(field.name == 'nation' && field.value != '') 
					arr[10] = field.value;
				if(field.name == 'x1' && field.value == 'on')
					arr[11] = 1;
				if(field.name == 'x2' && field.value == 'on')
					arr[12] = 1;
				if(field.name == 'x3' && field.value == 'on')
					arr[13] = 1;
				if(field.name == 'x4' && field.value == 'on')
					arr[14] = 1;
				if(field.name == 'x5' && field.value == 'on')
					arr[15] = 1;
				if(field.name == 'x6' && field.value == 'on')
					arr[16] = 1;
				if(field.name == 'y1' && field.value == 'on')
					arr[17] = 1;
				if(field.name == 'y2' && field.value == 'on')
					arr[18] = 1;
				if(field.name == 'y3' && field.value == 'on')
					arr[19] = 1;
				if(field.name == 'z1' && field.value == 'on')
					arr[20] = 1;
				if(field.name == 'z2' && field.value == 'on')
					arr[21] = 1;
				if(field.name == 'z3' && field.value == 'on')
					arr[22] = 1;
				if(field.name == 'z4' && field.value == 'on')
					arr[23] = 1;
				if(field.name == 'z5' && field.value == 'on')
					arr[24] = 1;
				if(field.name == 'z6' && field.value == 'on')
					arr[25] = 1;
				if(field.name == 'z7' && field.value == 'on')
					arr[26] = 1;
				if(field.name == 'z8' && field.value == 'on')
					arr[27] = 1;
				if(field.name == 'z9' && field.value == 'on')
					arr[28] = 1;
				if(field.name == 'z10' && field.value == 'on')
					arr[29] = 1;
				if(field.name == 'z11' && field.value == 'on')
					arr[30] = 1;
            });
			
			var dataString = JSON.stringify(arr),
				$placeholder = $(".preloader");
			
			$.ajax({
                type : "POST",
                url : "./php/processing.php",
                data : {
                    khaiBao : '1',
                    data : dataString
                },
                dataType : 'json',
                beforeSend : function(){
                    $placeholder.show();
                },
                success : function(res){
					$placeholder.fadeOut("slow");
                    if(res == "1") {
						(confirm("Khai báo thành công") == true) ? window.location.reload() : window.location.reload();
                    }else{
                        $("p#noti-add").html("Lỗi kết nối với máy chủ.");
                    }
                },
				error : function(){
					$("p#noti-add").html("Lỗi kết nối với máy chủ.");
					$(".preloader").fadeOut("slow");
				}
            });
			
        }
    });
	
	$("#btn2").click(function(e){
		if($("#form-inf").valid() == true){
			$("#btn1").attr("checked", false);
			$("#btn2").attr("checked", true);
			$(".card-body .timeline_info").not(".page-2").removeClass("timeline_info_active");
			$(".card-body .page-2").addClass("timeline_info_active");
		}else{
			$("#form-inf #error-inf").html("Vui lòng nhập thông tin");
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	$("#btn1").click(function(){
		$("#btn2").attr("checked", false);
		$("#btn1").attr("checked", true);
		$(".card-body .page-2").removeClass("timeline_info_active");
		$(".card-body .timeline_info").not(".page-2").addClass("timeline_info_active");
	});
	
	$("#form-inf .object").find("input").click(function(){
		if($(this).attr("id") == 'other'){
			$("input[name=hoTenNguoiKhaiBao]").parent().parent().show(200);
		}else{
			$("input[name=hoTenNguoiKhaiBao]").parent().parent().hide(200);
		}
	});
});

$(function(){
	$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
	}

	var settings = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
	};
	
	$.ajax(settings).done(function (res) {
//		console.log(res);
		$("#count_1").text(res.Global.TotalConfirmed).digits();
		$("#count_2").text(res.Global.NewConfirmed).digits();
		$("#count_3").text(res.Global.TotalDeaths).digits();
		$("#count_4").text(res.Global.TotalRecovered).digits();
	});
	
	var settingsVN = {
		"url": "https://api.apify.com/v2/datasets/co7waY3Rtg9JGhrXY/items",
		"method": "GET",
		"timeout": 0,
	};

	$.ajax(settingsVN).done(function (res) {
		console.log(res);
		var data = res[0];
//		console.log(data);
        $("#VN_1").text(data.infected).digits();
        $("#VN_2").text(data.treated).digits();
        $("#VN_3").text(data.recovered).digits();
        $("#VN_4").text(data.deceased).digits();

//        $("#capNhat").text("Dữ liệu được cập nhật lúc: " + d.toUTCString());
	});
});