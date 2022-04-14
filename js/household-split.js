// JavaScript Document

$(function(){
	
	var table = $('#table-split').DataTable({
		"columnDefs": [
            {
                "targets": [ 2 ],
                "visible": false,
                "searchable": false
            }
        ]
	});
	
	var row_selected = 0;
	
	function init(){
		dataNhanKhau();
 
		$('#table-split tbody').on( 'click', 'tr', function () {
			$(this).toggleClass('selected');
			if($(this).is(".selected")){
				var ord = $(this).find("td:first-child").html();
				$("select[name=chonChuHo].custom-select").html("<option selected class='option-hide'></option>");
				$(".col-change").html("<p>Điền đầy đủ thông tin sau: </p><div class='col-row'><span>Mã khu vực</span><input type='text' placeholder='Mã khu vực' id='maKhuVuc'></div><div class='col-row'><span>Địa chỉ</span><input type='text' placeholder='Địa chỉ' id='diaChi'></div>");
				for(var i = 0; i < row_selected + 1; i++){
					var select_id = table.rows('.selected').data()[i][2],
						select_name = table.rows('.selected').data()[i][3],
						select_ord= table.rows('.selected').data()[i][0];
					$("select[name=chonChuHo].custom-select").append("<option class='selected-" + (i+1) + "' value='" + (i+1) + "'>" + select_name + "</option>");
					$(".col-change").append("<div class='col-row selected-" + (i+1) + "'><span>" + select_name +" </span><input id='changed-" + select_id + "' type='text' placeholder='Quan hệ với chủ hộ'></div>");
					if(ord == select_ord)
						$(this).attr("data-id", 'selected-' + (i + 1));
				}
				row_selected++;	
			}
			else{
				var selected_id = $(this).attr('data-id');
				$(this).removeAttr('data-id');
				$("select[name=chonChuHo].custom-select").find("." + selected_id).remove();
				$(".col-row." + selected_id).remove();
				row_selected--;
			}
		});
		
		$("#input-add").click(function(){
			if($(this).val() == 'yes'){
				$(this).attr('value', 'no');
				$("select[name=chonChuHo]").css('display', 'none');
				$(".col-change").slideUp('slow');
			}else{
				$(this).attr('value', 'yes');
				$("select[name=chonChuHo]").css('display', 'block');
				$(".col-change").slideDown('slow');
			}
		});
		
		$('#button-split').on('click', function(){
			if($('tr').hasClass("selected")){
				var box_add = $('#input-add').val();
			
				var chonChuHo = $("select[name=chonChuHo]").val();
				
				if(box_add == 'yes' && !chonChuHo){
					alert('Bạn phải chọn chủ hộ');
				}else if(box_add == 'yes' || chonChuHo){
					var selected = {},
						data = table.rows('.selected').data();
					var maKhuVuc = $('input#maKhuVuc').val(),
						diaChi = $('input#diaChi').val();
					
					if(maKhuVuc == '' || diaChi == ''){
						alert('Bạn phải nhập đủ thông tin');
						return false;
					}
					
					selected[0] = [maKhuVuc, diaChi];
					
					for(var i = 0; i < data.length; ++i){
						selected[i + 1] = [];
						selected[i + 1][0] = data[i][2];
						var quanHe = $("input#changed-" + data[i][2]).val();
						if(quanHe == ''){
							alert('Bạn phải nhập đủ thông tin');
							return false;
						}else 
							selected[i + 1][1] = quanHe;
					}

					console.log(selected);
					var dataString = JSON.stringify(selected);
					
					$.ajax({
						type : "POST",
						url : "./php/processing.php",
						data : {
							taoHoKhau : '1',
							datastring : dataString
						},
						success : function(res){
							if(res == 'Tách và thêm hộ khẩu mới thành công')
							{
								(confirm(res)) ? window.location.reload() : window.location.reload();
							}
							else
								alert(res);
						},
						error : function(){
							alert("Lỗi mãy chủ");
						}
					});
				}else{
					
					var selected1 = [],
						data1 = table.rows('.selected').data();
					for(var i1 = 0; i1 < data1.length; ++i1){
						selected1[i1] = data1[i1][2];
					}

					var dataString1 = JSON.stringify(selected1);
					$.ajax({
						type : "POST",
						url : "./php/processing.php",
						data : {
							tachHoKhau : '1',
							datastring : dataString1
						},
						success : function(res){
							if(res == 'Tách thành công')
							{
								(confirm(res)) ? window.location.reload() : window.location.reload();
							}
							else
								alert(res);
						},
						error : function(){
							alert("Lỗi mãy chủ");
						}
					});
				}
			}
		});
		
		$('.select').change(function(){
			$('.custom-select option').removeAttr('selected').filter(":selected").attr('selected', true);
			var class_selected = $('.custom-select option').filter(":selected").attr('class');
			$('.col-change').find(":not(." + class_selected + ") input").removeClass('input-disable').attr('value', '');
			$('.col-change').find('.' + class_selected + ' input').addClass('input-disable').attr('value', 'Chủ hộ');
		});
	}
	
	function dataNhanKhau(){
		$.ajax({
            type : "POST",
            url : "./php/processing.php",
            data : {
                NhanKhau : '2'
            },
            dataType : 'json',
            success : function(res){
//				console.log(res);
				for(var i = 0; i < res.length; ++i){
					var maHoKhau = (res[i]['maHoKhau'] == null ? " " : res[i]['maHoKhau']),
						hoTen = res[i]['hoTen'],
						id = res[i]['ID'],
						gioiTinh = (res[i]['gioiTinh'] == null ? " " : res[i]['gioiTinh']),
						namSinh = (res[i]['namSinh'] == null ? " " : res[i]['namSinh']),
						quanHeVoiChuHo = (res[i]['quanHeVoiChuHo'] == null ? " " : res[i]['quanHeVoiChuHo']),
						nguyenQuan = (res[i]['nguyenQuan'] == null ? " " : res[i]['nguyenQuan']),
						danToc = (res[i]['danToc'] == null ? " " : res[i]['danToc']),
						quocTich = (res[i]['quocTich'] == null ? " " : res[i]['quocTich']),
						soCMT = (res[i]['soCMT'] == null ? "Không" : res[i]['soCMT']),
						ngheNghiep = (res[i]['ngheNghiep'] == null ? " " : res[i]['ngheNghiep']),
						noiThuongTru = (res[i]['noiThuongTru'] == null ? " " : res[i]['noiThuongTru']),
						ghiChu = (res[i]['ghiChu'] == null ? " " : res[i]['ghiChu']);
					
					table.row.add( [
						(i+1),
						maHoKhau,
						id,
						hoTen,
						gioiTinh,
						namSinh,
						quanHeVoiChuHo,
						nguyenQuan,
						danToc,
						quocTich,
						soCMT,
						ngheNghiep,
						noiThuongTru,
						ghiChu
					] ).draw( false );
					
				}
			},
			error : function(e){
				console.log(e);
				alert("Lỗi máy chủ");
			}
        });
	}
	
	init();
	
	return {
		init : init,
		dataNhanKhau : dataNhanKhau
	}
});