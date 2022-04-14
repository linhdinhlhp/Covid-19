// Call the dataTables jQuery plugin
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
	
	var t_nhanKhau = $('#table-nhan-khau').DataTable();
	var t_hoKhau = $('#table-ho-khau').DataTable();
	var t_tamTru = $('#table-tam-tru').DataTable();
	var t_tamVang = $('#table-tam-vang').DataTable();
	
	function init(){
		dataNhanKhau();
		dataHoKhau();
		dataTamTru();
		dataTamVang();
	}
	
	function dataNhanKhau(){
		$.ajax({
            type : "POST",
            url : "./php/processing.php",
            data : {
                NhanKhau : '1'
            },
            dataType : 'json',
            success : function(res){
				console.log(res);
				for(var i = 0; i < res.length; ++i){
					var maHoKhau = (res[i]['maHoKhau'] == null ? " " : res[i]['maHoKhau']),
						hoTen = res[i]['hoTen'],
						gioiTinh = (res[i]['gioiTinh'] == null ? " " : res[i]['gioiTinh']),
						namSinh = (res[i]['namSinh'] == null ? " " : res[i]['namSinh']),
						noiSinh = (res[i]['noiSinh'] == null ? " " : res[i]['noiSinh']),
						nguyenQuan = (res[i]['nguyenQuan'] == null ? " " : res[i]['nguyenQuan']),
						danToc = (res[i]['danToc'] == null ? " " : res[i]['danToc']),
						quocTich = (res[i]['quocTich'] == null ? " " : res[i]['quocTich']),
						soCMT = (res[i]['soCMT'] == null ? " " : res[i]['soCMT']),
						ngheNghiep = (res[i]['ngheNghiep'] == null ? " " : res[i]['ngheNghiep']),
						noiThuongTru = (res[i]['noiThuongTru'] == null ? " " : res[i]['noiThuongTru']),
						tinhTrang = (res[i]['tinhTrang'] == null ? " " : res[i]['tinhTrang']),
						ghiChu = (res[i]['ghiChu'] == null ? " " : res[i]['ghiChu']);
					
					t_nhanKhau.row.add( [
						(i+1),
						maHoKhau,
						hoTen,
						gioiTinh,
						namSinh,
						noiSinh,
						nguyenQuan,
						danToc,
						quocTich,
						soCMT,
						ngheNghiep,
						noiThuongTru,
						tinhTrang,
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
	
	function dataHoKhau(){
		$.ajax({
            type : "POST",
            url : "./php/processing.php",
            data : {
                HoKhau : '1'
            },
            dataType : 'json',
            success : function(res){
				for(var i = 0; i < res.length; ++i){
					var maHoKhau = (res[i]['maHoKhau'] == null ? " " : res[i]['maHoKhau']),
						hoTen = res[i]['hoTen'],
						soNhanKhau = (res[i]['soNhanKhau'] == null ? " " : res[i]['soNhanKhau']),
						maKhuVuc = (res[i]['maKhuVuc'] == null ? " " : res[i]['maKhuVuc']),
						diaChi = (res[i]['diaChi'] == null ? " " : res[i]['diaChi']),
						ngayLap = (res[i]['ngayLap'] == null ? " " : res[i]['ngayLap']);
					t_hoKhau.row.add([
						(i+1),
						maHoKhau,
						hoTen,
						soNhanKhau,
						maKhuVuc,
						diaChi,
						ngayLap
					]).draw( false );
				}
			},
			error : function(){
				alert("Lỗi máy chủ");
			}
        });
	}
	
	function dataTamTru(){
		$.ajax({
            type : "POST",
            url : "./php/processing.php",
            data : {
                TamTru : '1'
            },
            dataType : 'json',
            success : function(res){
				for(var i = 0; i < res.length; ++i){
					var maGiayTamTru = (res[i]['maGiayTamTru'] == null ? " " : res[i]['maGiayTamTru']),
						hoTen = res[i]['hoTen'],
						namSinh = (res[i]['namSinh'] == null ? " " : res[i]['namSinh']),
						gioiTinh = (res[i]['gioiTinh'] == null ? " " : res[i]['gioiTinh']),
						soDienThoaiDangKy = (res[i]['soDienThoaiDangKy'] == null ? " " : res[i]['soDienThoaiDangKy']),
						diaChiHienNay = (res[i]['diaChiHienNay'] == null ? " " : res[i]['diaChiHienNay']),
						tuNgay = (res[i]['tuNgay'] == null ? " " : res[i]['tuNgay']),
						denNgay = (res[i]['denNgay'] == null ? " " : res[i]['denNgay']),
						trangThai = (res[i]['trangThai'] == null ? " " : res[i]['trangThai']),
						lyDo = (res[i]['lyDo'] == null ? " " : res[i]['lyDo']);
					
					t_tamTru.row.add([
						(i+1),
						maGiayTamTru,
						hoTen,
						namSinh,
						gioiTinh,
						soDienThoaiDangKy,
						diaChiHienNay,
						tuNgay,
						denNgay,
						trangThai,
						lyDo
					]).draw( false );
				}
			},
			error : function(){
				alert("Lỗi máy chủ");
			}
        });
	}
	
	function dataTamVang(){
		$.ajax({
            type : "POST",
            url : "./php/processing.php",
            data : {
                TamVang : '1'
            },
            dataType : 'json',
            success : function(res){
				for(var i = 0; i < res.length; ++i){
					var maGiayTamVang = (res[i]['maGiayTamVang'] == null ? " " : res[i]['maGiayTamVang']),
						hoTen = res[i]['hoTen'],
						namSinh = (res[i]['namSinh'] == null ? " " : res[i]['namSinh']),
						gioiTinh = (res[i]['gioiTinh'] == null ? " " : res[i]['gioiTinh']),
						noiTamTru = (res[i]['noiTamTru'] == null ? " " : res[i]['noiTamTru']),
						tuNgay = (res[i]['tuNgay'] == null ? " " : res[i]['tuNgay']),
						denNgay = (res[i]['denNgay'] == null ? " " : res[i]['denNgay']),
						trangThai = (res[i]['trangThai'] == null ? " " : res[i]['trangThai']),
						lyDo = (res[i]['lyDo'] == null ? " " : res[i]['lyDo']);
					
					t_tamVang.row.add([
						(i+1),
						maGiayTamVang,
						hoTen,
						namSinh,
						gioiTinh,
						noiTamTru,
						tuNgay,
						denNgay,
						trangThai,
						lyDo
					]).draw( false );
				}
			},
			error : function(){
				alert("Lỗi máy chủ");
			}
        });
	}
	
	init();
	
	return {
		init : init,
		dataNhanKhau : dataNhanKhau,
		dataHoKhau : dataHoKhau,
		dataTamTru : dataTamTru
	}
});
