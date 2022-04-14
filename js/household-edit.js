// Hàm search
$(function(){
	'use strict';
	var $placeholder = $(".preloader"),
		$data = '';
	
	var table_NK = $('#table-nhan-khau').DataTable({
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
        "editting": true,
        "columnDefs": [
        {
            "targets": [2, 5, 6, 7, 8, 9, 11, 12, 15, 19, 20, 21, 22, 23, 24, 25, 28],
            "visible": false,
            "searchable": false,
			"defaultContent": "<span class='icon-edit han-edit'><i class='fa fa-edit'></i></span><span class='icon-edit'> / </span><span class='icon-edit han-remove'><i class='fa fa-trash-o'></i></span>"
        }
    ]
    });
		
	function init(){
		options();
		$('#table-nhan-khau tbody').on( 'click', '.han-edit', function () {
			edit($(this));
		} );
		
		$("#table-nhan-khau tbody").on('click', '.han-remove', function(){
			deletes($(this));
		});
		
		$("#btn-1").on('click', function(){
			var arr = $("#form-nhan-khau").serializeArray(),
				data = [];

			$.each(arr, function(i, field) {
				data[i] = field.value
				i++
			});

			if(data[0] == '' && data[1] == '' && data[2] == ''){
				$("#error-1").text("Bạn phải nhập ít nhất 1 trường")
				return false
			}

			var dataString = JSON.stringify(data);

			$.ajax({
				type : "POST",
				url : "./php/household-edit.php",
				data : {
					NhanKhau : '1',
					inf : dataString
				},
				dataType : 'json',
				beforeSend : function(){
					$placeholder.show();
				},
				success : function(res){
					$placeholder.fadeOut("slow");
					table_NK.clear().draw();

					if(res != 0){
						for(var i = 0; i < res.length; ++i){
							res[i][29] = "<span class='icon-edit han-edit'><i class='fa fa-edit'></i></span><span class='icon-edit'> / </span><span class='icon-edit han-remove'><i class='fa fa-trash-o'></i></span>";
							table_NK.row.add(res[i]).draw(false);
						}
					}else
						alert("Không có kết quả tìm kiếm");
					
					window.location.href.replace(window.location.search,'');
				},
				error : function(){
					$placeholder.fadeOut("slow");
					alert("Lỗi kết nối với Server");
				}
			});
		});
		
		
	}
	
	function edit($r){
		$data = table_NK.row( $r.parents('tr') ).data();
		
		var $popup = "<div class='popup'><div class='card'><div class='card-header'><h6 class=''>Edit</h6><span id='popup-close'><i class='fa fa-close'></i></span></div><div class='card-body'><form class='form-responsive' autocomplete='off'>";
	
		$popup += ($data[1] == '')  ? "<div class='col-sm-4'><div class='input-block'><label for='hoTen'>Họ và tên</label><input class='form-control' type='text' name='hoTen'></div></div>"
									: "<div class='col-sm-4'><div class='input-block focus'><label for='hoTen'>Họ và tên</label><input class='form-control' type='text' name='hoTen' value='"+ $data[1] +"'></div></div>";
		$popup += ($data[2] == '')  ? "<div class='col-sm-3'><div class='input-block'><label for='bietDanh'>Biệt danh</label><input class='form-control' type='text' name='bietDanh'></div></div>"
									: "<div class='col-sm-3'><div class='input-block focus'><label for='bietDanh'>Biệt danh</label><input class='form-control' type='text' name='bietDanh' value='"+ $data[2] +"'></div></div>";
		$popup += ($data[3] == '')  ? "<div class='col-sm-3'><div class='input-block'><label for='namSinh'>Ngày sinh</label><input class='form-control input-date' type='text' name='namSinh' maxlength='10' required></div></div>"
									: "<div class='col-sm-3'><div class='input-block focus'><label for='namSinh'>Ngày sinh</label><input class='form-control input-date' type='text' name='namSinh' maxlength='10' value='"+ $data[3] +"' required></div></div>";
		$popup += ($data[4] == 'Nam')   ? "<div class='col-sm-2'><div class='input-block focus'><label for='gioiTinh'>Giới tính</label><select name='gioiTinh' class='form-control'></option><option value='Nam' selected>Nam</option><option value='Nữ'>Nữ</option></select></div></div>"
										: "<div class='col-sm-2'><div class='input-block focus'><label for='gioiTinh'>Giới tính</label><select name='gioiTinh' class='form-control'></option><option value='Nam'>Nam</option><option value='Nữ' selected>Nữ</option></select></div></div>";
		$popup += ($data[5] == '')  ? "<div class='col-sm-6'><div class='input-block'><label for='noiSinh'>Nơi sinh</label><input class='form-control' type='text' name='noiSinh'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='noiSinh'>Nơi sinh</label><input class='form-control' type='text' name='noiSinh' value='"+ $data[5] +"'></div></div>";
		$popup += ($data[6] == '') ? "<div class='col-sm-6'><div class='input-block'><label for='nguyenQuan'>Nguyên quán</label><input class='form-control' type='text' name='nguyenQuan'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='nguyenQuan'>Nguyên quán</label><input class='form-control' type='text' name='nguyenQuan' value='"+ $data[6] +"'></div></div>";
		$popup += ($data[7] == '') ? "<div class='col-sm-4'><div class='input-block'><label for='danToc'>Dân tộc</label><input class='form-control' type='text' name='danToc'></div></div>"
									: "<div class='col-sm-4'><div class='input-block focus'><label for='danToc'>Dân tộc</label><input class='form-control' type='text' name='danToc' value='"+ $data[7] +"'></div></div>";
		$popup += ($data[8] == '') ? "<div class='col-sm-4'><div class='input-block'><label for='quocTich'>Quốc tịch</label><input class='form-control' type='text' name='quocTich'></div></div>"
									: "<div class='col-sm-4'><div class='input-block focus'><label for='quocTich'>Quốc tịch</label><input class='form-control' type='text' name='quocTich' value='"+ $data[8] +"'></div></div>";
		$popup += ($data[9] == '') ? "<div class='col-sm-4'><div class='input-block'><label for='tonGiao'>Tôn giáo</label><input class='form-control' type='text' name='tonGiao'></div></div>"
									: "<div class='col-sm-4'><div class='input-block focus'><label for='tonGiao'>Tôn giáo</label><input class='form-control' type='text' name='tonGiao' value='"+ $data[9] +"'></div></div>";
		$popup += ($data[10] == '')  ? "<div class='col-sm-3'><div class='input-block'><label for='soCMT'>Số CCCD</label><input class='form-control' type='text' name='soCMT'></div></div>"
									: "<div class='col-sm-3'><div class='input-block focus'><label for='soCMT'>Số CCCD</label><input class='form-control' type='text' name='soCMT' value='"+ $data[10] +"'></div></div>";
		$popup += ($data[11] == '')  ? "<div class='col-sm-3'><div class='input-block'><label for='ngayCap'>Ngày cấp</label><input class='form-control input-date' type='text' name='ngayCap'></div></div>"
									: "<div class='col-sm-3'><div class='input-block focus'><label for='ngayCap'>Ngày cấp</label><input class='form-control input-date' type='text' name='ngayCap' value='"+ $data[11] +"'></div></div>";
		$popup += ($data[12] == '')  ? "<div class='col-sm-6'><div class='input-block'><label for='noiCap'>Nơi cấp</label><input class='form-control' type='text' name='noiCap'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='noiCap'>Nơi cấp</label><input class='form-control' type='text' name='noiCap' value='"+ $data[12] +"'></div></div>";
		$popup += ($data[13] == '')  ? "<div class='col-sm-4'><div class='input-block input-disable'><label for='maHoKhau' style='background: #DDE9F8 !important;'>Số hộ khẩu</label><input class='form-control' type='text' name='maHoKhau'></div></div>"
									: "<div class='col-sm-4'><div class='input-block input-disable focus'><label for='maHoKhau'>Số hộ khẩu</label><input class='form-control' type='text' name='maHoKhau' value='"+ $data[13] +"'></div></div>";
		$popup += ($data[14] == '') ? "<div class='col-sm-4'><div class='input-block input-disable'><label for='quanHeVoiChuHo' style='background: #DDE9F8 !important;'>Quan hệ với chủ hộ</label><input class='form-control' type='text' name='quanHeVoiChuHo'></div></div>"
									: "<div class='col-sm-4'><div class='input-block input-disable focus'><label for='quanHeVoiChuHo'>Quan hệ với chủ hộ</label><input class='form-control' type='text' name='quanHeVoiChuHo' value='"+ $data[14] +"'></div></div>";
		$popup += ($data[15] == '') ? "<div class='col-sm-4'><div class='input-block'><label for='soHoChieu'>Số hộ chiếu</label><input class='form-control' type='text' name='soHoChieu'></div></div>"
									: "<div class='col-sm-4'><div class='input-block focus'><label for='soHoChieu'>Số hộ chiếu</label><input class='form-control' type='text' name='soHoChieu' value='"+ $data[15] +"'></div></div>";
		$popup += ($data[16] == '') ? "<div class='col-sm-6'><div class='input-block'><label for='noiThuongTru'>Nơi thường trú</label><input class='form-control' type='text' name='noiThuongTru'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='noiThuongTru'>Nơi thường trú</label><input class='form-control' type='text' name='noiThuongTru' value='"+ $data[16] +"'></div></div>";
		$popup += ($data[17] == '') ? "<div class='col-sm-6'><div class='input-block'><label for='diaChiHienNay'>Nơi ở hiện nay</label><input class='form-control' type='text' name='diaChiHienNay'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='diaChiHienNay'>Nơi ở hiện nay</label><input class='form-control' type='text' name='diaChiHienNay' value='"+ $data[17] +"'></div></div>";
		$popup += ($data[18] == '') ? "<div class='col-sm-6'><div class='input-block'><label for='ngheNghiep'>Nghề nghiệp</label><input class='form-control' type='text' name='ngheNghiep'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='ngheNghiep'>Nghề nghiệp</label><input class='form-control' type='text' name='ngheNghiep' value='"+ $data[18] +"'></div></div>";
		$popup += ($data[19] == '') ? "<div class='col-sm-6'><div class='input-block'><label for='noiLamViec'>Nơi làm việc</label><input class='form-control' type='text' name='noiLamViec'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='noiLamViec'>Nơi làm việc</label><input class='form-control' type='text' name='noiLamViec' value='"+ $data[19] +"'></div></div>";
		$popup += ($data[20] == '') ? "<div class='col-sm-6'><div class='input-block'><label for='trinhDoHocVan'>Trình độ học vấn</label><input class='form-control' type='text' name='trinhDoHocVan'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='trinhDoHocVan'>Trình độ học vấn</label><input class='form-control' type='text' name='trinhDoHocVan' value='"+ $data[20] +"'></div></div>";
		$popup += ($data[21] == '') ? "<div class='col-sm-6'><div class='input-block'><label for='trinhDoNgoaiNgu'>Trình độ ngoại ngữ</label><input class='form-control' type='text' name='trinhNgoaiNgu'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='trinhDoNgoaiNgu'>Trình độ ngoại ngữ</label><input class='form-control' type='text' name='trinhNgoaiNgu' value='"+ $data[21] +"'></div></div>";
		$popup += ($data[22] == '') ? "<div class='col-sm-6'><div class='input-block'><label for='trinhDoChuyenMon'>Trình độ chuyên môn</label><input class='form-control' type='text' name='trinhDoChuyenMon'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='trinhDoChuyenMon'>Trình độ chuyên môn</label><input class='form-control' type='text' name='trinhDoChuyenMon' value='"+ $data[22] +"'></div></div>";
		$popup += ($data[23] == '') ? "<div class='col-sm-6'><div class='input-block'><label for='bietTiengDanToc'>Biết tiếng dân tộc</label><input class='form-control' type='text' name='bietTiengDanToc'></div></div>"
									: "<div class='col-sm-6'><div class='input-block focus'><label for='bietTiengDanToc'>Biết tiếng dân tộc</label><input class='form-control' type='text' name='bietTiengDanToc' value='"+ $data[23] +"'></div></div>";
		$popup += ($data[24] == '') ? "<div class='col-sm-4'><div class='input-block'><label for='ngayChuyenDen'>Ngày chuyển đến</label><input class='form-control input-date' type='text' name='ngayChuyenDen'></div></div>"
									: "<div class='col-sm-4'><div class='input-block focus'><label for='ngayChuyenDen'>Ngày chuyển đến</label><input class='form-control input-date' type='text' name='ngayChuyenDen' value='"+ $data[24] +"'></div></div>";
		$popup += ($data[25] == '') ? "<div class='col-sm-8'><div class='input-block'><label for='lyDoChuyenDen'>Lý do chuyển đến</label><input class='form-control' type='text' name='lyDoChuyenDen'></div></div>"
									: "<div class='col-sm-8'><div class='input-block focus'><label for='lyDoChuyenDen'>Lý do chuyển đến</label><input class='form-control' type='text' name='lyDoChuyenDen' value='"+ $data[25] +"'></div></div>";
		$popup += "<div class='col-sm-4'><div class='input-block'><label for='ngayChuyenDi'>Ngày chuyển đi</label><input class='form-control input-date' type='text' name='ngayChuyenDi'></div></div>";
		$popup += "<div class='col-sm-4'><div class='input-block'><label for='lyDoChuyenDi'>Lý do chuyển đi</label><input class='form-control' type='text' name='lyDoChuyenDi'></div></div>";
		$popup += "<div class='col-sm-4'><div class='input-block'><label for='noiChuyenDen'>Nơi chuyến đến</label><input class='form-control' type='text' name='noiChuyenDen'></div></div>";
		$popup += ($data[26] == '') ? "<div class='col-sm-12'><div class='input-block'><label for='tienAn'>Tiền án</label><input class='form-control' type='text' name='tienAn'></div></div>"
									: "<div class='col-sm-12'><div class='input-block'><label for='tienAn'>Tiền án</label><input class='form-control' type='text' name='tienAn' value='"+ $data[26] +"'></div></div>";
		$popup += ($data[27] == '') ? "<div class='col-sm-12'><div class='input-block notes'><label for='ghiChu'>Ghi chú</label><textarea class='form-control' rows='3' name='ghiChu'></textarea></div></div>"
									: "<div class='col-sm-12'><div class='input-block notes'><label for='ghiChu'>Ghi chú</label><textarea class='form-control' rows='3' name='ghiChu'>"+ $data[27] +"</textarea></div></div>";
		$popup += "<input type='hidden' name='hidden' value='"+ $data[28] +"'><div class='col-sm-12'> <button class='square-button' id='btn-save' type='button'>Lưu</button></div></form></div></div></div>";
	
		$("#wrapper").after($popup);
		var y1 = $("#wrapper").outerHeight(),
			y2 = $(".popup").outerHeight();
		(y1 > y2) ? $(".popup").css("min-height", y1) : $("#wrapper").height(y2);
		options();
	}
	
	function options(){
		$(".popup").on("click", function (e) {
            if (!$(".card").is(e.target) && $(".card").has(e.target).length === 0) {
				$(".popup").remove();
				$("#wrapper").removeAttr('style');
            }
		});
		$(".input-date").mask("00/00/0000");
		$("input[name=soCMT]").mask("000000000000");
		
		$("#popup-close").click(function () {
			$(".popup").remove();
			$("#wrapper").removeAttr('style');
		});

		$(".form-responsive").find(".form-control").each(function () {
            var targetItem = $(this).parent();
            if ($(this).val()) {
                $(targetItem)
                    .find("label")
                    .css({
                        top: "-6px",
                        fontSize: "1.2rem",
                        color: "#858796"
                    });
            }
        });
		$(".popup .focus").find("label").css({"font-size": "1rem", "top": "-6px"});
		$(".form-responsive").find(".form-control").focus(function () {
            $(this)
                .parent(".input-block")
                .addClass("focus");
            $(this)
                .parent()
                .find("label")
                .animate({
                    top: "-6px",
                    fontSize: "1rem",
                    color: "#858796"
                }, 300);
        });
		$(".form-responsive").find(".form-control").blur(function () {
            if ($(this).val().length == 0) {
                $(this)
                    .parent(".input-block")
                    .removeClass("focus");
                $(this)
                    .parent()
                    .find("label")
                    .animate({
                        top: "20px",
                        fontSize: "1.2rem"
                    }, 300);
            }
        });
		
		$("#btn-save").on("click", function(){
			if(confirm("Bạn có chắc chắn không?") == true){
				var $new = $(".popup").find("form").serializeArray(),
					arr = [], j = 0;
				
				$.each($new, function(i, feild){
					if($data[i+1] != feild.value && i >= 0 && i <= 24){
						arr[j++] = [feild.name, feild.value];
					}
						
					if(i == 25 && feild.value != ''){
						arr[j++] = [feild.name, feild.value];
					}
					if(i == 26 && feild.value != ''){
						arr[j++] = [feild.name, feild.value];
					}
					if(i == 27 && feild.value != ''){
						arr[j++] = [feild.name, feild.value];
					}
					if((i == 28 && feild.value != $data[26]) || (i == 29 && feild.value != $data[27])){
						arr[j++] = [feild.name, feild.value];
					}
				});
				
				arr[j++] = $data[28];
				
				if(arr.length > 1){
					var dataString = JSON.stringify(arr);

					$.ajax({
						type : "POST",
						url : "./php/household-edit.php",
						data : {
							edit : '1',
							data : dataString
						},
						dataType : 'json',
						beforeSend : function(){
							$placeholder.show();
						},
						success : function(res){
							$placeholder.fadeOut("slow");

							if(res != 0){
								if(confirm("Bạn có muốn tải lại trang không?") == true)
									window.location.reload()
								else{
									$("#error-1").text("Cập nhật thành công!");
									$("#popup-close").trigger("click");
								}
								
							}else
								$("#error-1").text("Cập nhật không thành công. Vui lòng kiểm tra lại!");
						},
						error : function(e){
							console.log(e);
							$placeholder.fadeOut("slow");
							alert("Lỗi kết nối với Server");
						}
					});
				}
			}
		});
		
	}
	
	function deletes($r){
		var data = table_NK.row( $r.parents('tr') ).data();
		var html = "<div class='modal'><span class='close' title='Close Modal'>×</span><div class='modal-content'><div class='container'><br>"
						+ "<h1>Delete Data</h1><p>Are you sure you want to delete this pesonal data?</p><input type='text' name='lyDoXoa' class='input-ly-do' placeholder='Lý do xóa' /><div class='clearfix'><br>"
						+ "<button type='button' class='cancelbtn'>Cancel</button><button type='button' class='deletebtn'>Delete</button></div></div></div></div>";
		$("#wrapper").after(html);
		options_delete(data[28]);
	}
	
	function options_delete($d){
		$(".modal .cancelbtn, .modal .close").click(function(){
			$(".modal").remove();
		});
		
		$(".modal").on("click", function (e) {
            if (!$(".modal-content").is(e.target) && $(".modal-content").has(e.target).length === 0) {
				$(".modal").remove();
            }
		});
		
		$(".modal .deletebtn").click(function(){
			var $lydo = $(".modal input[name=lyDoXoa]").val();
			
			if($lydo == ""){
				$("input[name=lyDoXoa]").css({"border" : "2px solid red"});
				return false;
			}else{
				$("input[name=lyDoXoa]").removeAttr("style");
			}
			
			$.ajax({
				type : "POST",
				url : "./php/household-edit.php",
				data : {
					xoaNK : $d,
					data : $lydo
				},
				beforeSend : function(){
					$placeholder.show();
				},
				success : function(res){
					$placeholder.fadeOut("slow");
					console.log(res);
					if(res == 1){
						(confirm("Xóa dữ liệu nhân khẩu thành công!") == true) 
							? window.location.reload()
							: window.location.reload();
					}else
						alert("Xóa không thành công");
				},
				error : function(){
					$placeholder.fadeOut("slow");
					alert("Lỗi kết nối với Server");
				}
			});
			
		});
	}
	
	init();
	
	return {
		init : init,
		edit : edit,
		deletes : deletes
	}
});

$(function(){
	$(".preloader").fadeOut("slow");
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