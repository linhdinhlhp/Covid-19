<?php
include("config.php");
session_start();

// Thêm nhân khẩu vào database
if(isset($_POST["peopleData"]))
{
	$user = $_SESSION['user'];
	
	$obj = json_decode($_POST["people_data"], true);
	$soNhanKhau = sizeof($obj);
	// Kiểm tra xem sổ hộ khẩu của X tồn tại trong table ho_khau không?
	// 1 - Có    + Thêm mới									-> Thêm X vào table thanh_vien_cua_ho, nhan_khau, (chung_minh_thu)
	// 0 - Không + Đăng ký thường trú -> Tạo sổ hộ khẩu mới -> Thêm X vào table thanh_vien_cua_ho, nhan_khau, (chung_minh_thu), ho_khau
	
	if($obj[8] != '')
	{
		$sql = "SELECT * FROM chung_minh_thu WHERE soCMT = '".$obj[8]."'";
		$select = mysqli_query($db, $sql);
		if (!$select) 
		{
			echo 'Lỗi kết nối với database1';
			mysqli_close($db);
			exit();
		}
		else if(mysqli_num_rows($select) > 0)
        {
            echo "Thông tin nhân khẩu đã tồn tại";
            mysqli_close($db);
            exit();
        }
	}
	
	if($obj[11] != '')
	{
		$sql = "SELECT * FROM ho_khau WHERE maHoKhau = '".$obj[11]."'";
		$select = mysqli_query($db, $sql);
		if (!$select) 
		{
			echo 'Lỗi kết nối với database2';
			mysqli_close($db);
			exit();
		}
		else if(mysqli_num_rows($select) <= 0)
        {
            echo "Mã hộ khẩu không tồn tại";
            mysqli_close($db);
            exit();
        }
	}
	
	if($obj[25] == 1)
	{
		// Thêm sổ hộ khẩu
		$select = mysqli_query($db, "SELECT MAX(maHoKhau) 'maHoKhau' FROM `ho_khau` ORDER BY maHoKhau DESC");
		if (!mysqli_query($db, $sql)) 
		{
			echo 'Lỗi kết nối với database3';
			mysqli_close($db);
			exit();
		}
		$row = mysqli_fetch_array($select, MYSQLI_ASSOC);
		$obj[11] = str_pad($row["maHoKhau"] + 1, 6, '0', STR_PAD_LEFT);
	}
	
	$arr = explode('/', $obj[2]);
	$date = $arr[2].'-'.$arr[1].'-'.$arr[0];
	
	// Thêm X vào table people
	$sql = "INSERT INTO nhan_khau(idNguoiTao, hoTen, bietDanh, gioiTinh, namSinh, noiSinh, danToc, tonGiao, quocTich, noiThuongTru, nguyenQuan,";
	$sql .= "diaChiHienNay, trinhDoHocVan, trinhDoChuyenMon, trinhDoNgoaiNgu, bietTiengDanToc, ngheNghiep, noiLamViec, ghiChu) SELECT ";
	$sql .= "ID, '".$obj[0]."', '".$obj[1]."', '".$obj[3]."', '".$date."', '".$obj[4]."', '".$obj[5]."', '".$obj[6]."', '".$obj[7]."', '".$obj[15]."', '".$obj[16]."',";
	$sql .= "'".$obj[17]."', '".$obj[18]."', '".$obj[19]."', '".$obj[20]."', '".$obj[21]."', '".$obj[22]."', '".$obj[23]."', '".$obj[24]."' FROM users WHERE username = '".$user."'";
	
	echo $sql;
	$select = mysqli_query($db, $sql) or die(mysqli_error($db));
	
	if (!$select) 
	{
		echo 'Lỗi kết nối với database4';
		echo mysqli_error($db);
		mysqli_close($db);
		exit();
	}
	
	$ID = mysqli_insert_id($db);
	$IDHoKhau = '';
	if($obj[25] == 1)
	{
		$sql = "INSERT INTO ho_khau(maHoKhau, idChuHo, maKhuVuc, diaChi, ngayLap, nguoiThucHien) VALUES ";
		$sql .= "('".$obj[11]."', '".$ID."', '".$obj[12]."', '".$obj[15]."', NOW(), ";
		$sql .= "(SELECT ID FROM users WHERE username = '$user'))";
		$select = mysqli_query($db, $sql);
		if (!$select) 
		{
			echo 'Lỗi kết nối với database5';
			mysqli_close($db);
			exit();
		}
		$IDHoKhau = mysqli_insert_id($db);
	}
	else
	{
		$sql = "SELECT ID FROM ho_khau WHERE maHoKhau = '".$obj[11]."'";
		$select = mysqli_query($db, $sql);
		if (!$select) 
		{
			echo 'Lỗi kết nối với database6';
			mysqli_close($db);
			exit();
		}
		$row = mysqli_fetch_array($select);
		$IDHoKhau = $row['ID'];
	}
	
	$arr = explode('/', $obj[9]);
	$date = $arr[2].'-'.$arr[1].'-'.$arr[0];
	$sql = '';
	if($obj[8] != '')
		$sql .= "INSERT INTO chung_minh_thu(idNhanKhau, soCMT, ngayCap, noiCap) VALUES ('".$ID."', '".$obj[8]."',  '".$date."', '".$obj[10]."');";
	
	if($IDHoKhau != '')
		$sql .= "INSERT INTO thanh_vien_cua_ho(idNhanKhau, idHoKhau, quanHeVoiChuHo) VALUES ('".$ID."', '".$IDHoKhau."', '".$obj[14]."')";
	
	$select = mysqli_query($db, $sql);
    if (!$select) 
    {
        echo 'Lỗi kết nối với database7';
        mysqli_close($db);
        exit();
    }
	if($obj[25] != 1)
		echo "Thêm nhân khẩu thành công";
	else
		echo "Thêm nhân khẩu thành công. Mã hộ khẩu đã tạo là: <b>".$obj[11]."</b>";
	mysqli_close($db);
//	echo "Successfully";
	exit();
}

// Lấy dữ liệu nhân khẩu 
if(isset($_POST["NhanKhau"]))
{
	$NK = $_POST["NhanKhau"];
	if($NK == 1)
		$sql = "SELECT x.*, y.maHoKhau, y.quanHeVoiChuHo FROM (SELECT a.ID, a.hoTen, a.gioiTinh, a.namSinh, a.noiSinh, a.nguyenQuan, "
				."a.danToc, a.quocTich, d.soCMT, a.ngheNghiep, a.noiThuongTru, a.ghiChu, CASE WHEN a.ngayXoa IS NOT NULL THEN 'Đã xóa' "
				."WHEN a.ngayChuyenDi IS NOT NULL THEN 'Đã chuyển đi' ELSE 'Đang ở đây' END AS tinhTrang FROM nhan_khau a "
				."LEFT JOIN chung_minh_thu d ON d.idNhanKhau = a.ID) x "
				."LEFT JOIN (SELECT c.maHoKhau , b.idNhanKhau, b.quanHeVoiChuHo FROM thanh_vien_cua_ho b LEFT JOIN ho_khau c ON b.idHoKhau = c.ID) "
				."y ON x.ID = y.idNhanKhau";
	else
		$sql =  "SELECT x.*, y.maHoKhau, y.quanHeVoiChuHo FROM (SELECT a.ID, a.hoTen, a.gioiTinh, a.namSinh, a.noiSinh, a.nguyenQuan, "
				."a.danToc, a.quocTich, d.soCMT, a.ngheNghiep, a.noiThuongTru, a.ghiChu, CASE WHEN a.ngayXoa IS NOT NULL THEN 'Đã xóa' "
				."WHEN a.ngayChuyenDi IS NOT NULL THEN 'Đã chuyển đi' ELSE 'Đang ở đây' END AS tinhTrang FROM nhan_khau a "
				."LEFT JOIN chung_minh_thu d ON d.idNhanKhau = a.ID) x "
				."INNER JOIN (SELECT c.maHoKhau , b.idNhanKhau, b.quanHeVoiChuHo FROM thanh_vien_cua_ho b LEFT JOIN ho_khau c ON b.idHoKhau = c.ID) "
				."y ON x.ID = y.idNhanKhau";
	
	$select = mysqli_query($db, $sql);
	if(mysqli_num_rows($select) > 0)
	{
		while($row = mysqli_fetch_array($select)){
			$ID = $row['ID'];
			$maHoKhau = $row['maHoKhau'];
			$hoTen = $row['hoTen'];
			$gioiTinh = $row['gioiTinh'];
			$namSinh = date("d/m/Y", strtotime($row['namSinh']));
			$quanHeVoiChuHo = $row['quanHeVoiChuHo'];
			$noiSinh = $row['noiSinh'];
			$nguyenQuan = $row['nguyenQuan'];
			$danToc = $row['danToc'];
			$quocTich = $row['quocTich'];
			$soCMT = $row['soCMT'];
			$ngheNghiep = $row['ngheNghiep'];
			$noiThuongTru = $row['noiThuongTru'];
			$ghiChu = $row['ghiChu'];
			$tinhTrang = $row['tinhTrang'];

			$return_arr[] = array(
							"ID" => $ID,
							"maHoKhau" => $maHoKhau,
							"hoTen" => $hoTen,
							"gioiTinh" => $gioiTinh,
							"namSinh" => $namSinh,
							"quanHeVoiChuHo" => $quanHeVoiChuHo,
							"noiSinh" => $noiSinh,
							"nguyenQuan" => $nguyenQuan,
							"danToc" => $danToc,
							"quocTich" => $quocTich,
							"soCMT" => $soCMT,
							"ngheNghiep" => $ngheNghiep,
							"noiThuongTru" => $noiThuongTru,
							"tinhTrang" => $tinhTrang,
							"ghiChu" => $ghiChu);
		}
	}
	
	mysqli_close($db);
	echo json_encode($return_arr);
	exit();
}

// Lấy dữ liệu hộ khẩu 
if(isset($_POST["HoKhau"]))
{
	$sql  = "SELECT b.maHoKhau, a.hoTen, (SELECT COUNT(DISTINCT c.idHoKhau = b.ID) ";
	$sql .= "FROM thanh_vien_cua_ho c) 'soNhanKhau', b.maKhuVuc, b.diaChi, b.ngayLap FROM ho_khau b ";
	$sql .= "INNER JOIN nhan_khau a ON a.ID = b.idChuHo";
	
	$select = mysqli_query($db, $sql);
	if(mysqli_num_rows($select) > 0)
	{
//		$row = mysqli_fetch_array($select, MYSQLI_ASSOC);
		while($row = mysqli_fetch_array($select)){
			$maHoKhau = $row['maHoKhau'];
			$hoTen = $row['hoTen'];
			$soNhanKhau = $row['soNhanKhau'];
			$maKhuVuc = $row['maKhuVuc'];
			$diaChi = $row['diaChi'];
			$ngayLap = date("d/m/Y", strtotime($row['ngayLap']));

			$return_arr[] = array(
							"maHoKhau" => $maHoKhau,
							"hoTen" => $hoTen,
							"soNhanKhau" => $soNhanKhau,
							"maKhuVuc" => $maKhuVuc,
							"diaChi" => $diaChi,
							"ngayLap" => $ngayLap);
		}
	}
	
	mysqli_close($db);
	echo json_encode($return_arr);
	exit();
}

// Lấy dữ liệu tạm trú 
if(isset($_POST["TamTru"]))
{
	$sql  = "SELECT a.maGiayTamTru, b.hoTen, b.namSinh, b.gioiTinh, a.soDienThoaiNguoiDangKy, ";
	$sql .= "b.diaChiHienNay, a.tuNgay, a.denNgay, (NOW() > a.denNgay) `trangThai`, a.lyDo FROM tam_tru a ";
	$sql .= "LEFT JOIN nhan_khau b ON a.idNhanKhau = b.ID";
	
	$select = mysqli_query($db, $sql);
	if(mysqli_num_rows($select) > 0)
	{
		while($row = mysqli_fetch_array($select)){
			$maGiayTamTru = $row['maGiayTamTru'];
			$hoTen = $row['hoTen'];
			$namSinh = date("d/m/Y", strtotime($row['namSinh']));
			$gioiTinh = $row['gioiTinh'];
			$soDienThoaiNguoiDangKy = $row['soDienThoaiNguoiDangKy'];
			$diaChiHienNay = $row['diaChiHienNay'];
			$tuNgay = date("d/m/Y", strtotime($row['tuNgay']));
			$denNgay = date("d/m/Y", strtotime($row['denNgay']));
			$trangThai = ($row['trangThai'] == 0) ? "Còn hạn" : "Hết hạn";
			$lyDo = $row['lyDo'];
			
			$return_arr[] = array(
							"maGiayTamTru" => $maGiayTamTru,
							"hoTen" => $hoTen,
							"namSinh" => $namSinh,
							"gioiTinh" => $gioiTinh,
							"soDienThoaiNguoiDangKy" => $soDienThoaiNguoiDangKy,
							"diaChiHienNay" => $diaChiHienNay,
							"tuNgay" => $tuNgay,
							"denNgay" => $denNgay,
							"trangThai" => $trangThai,
							"lyDo" => $lyDo);
		}
	}
	
	mysqli_close($db);
	echo json_encode($return_arr);
	exit();
}

// Lấy dữ liệu tạm vắng
if(isset($_POST["TamVang"]))
{
	$sql  = "SELECT a.maGiayTamVang, b.hoTen, b.namSinh, b.gioiTinh, a.noiTamTru, ";
	$sql .= "a.tuNgay, a.denNgay, (NOW() > a.denNgay) `trangThai`, a.lyDo FROM tam_vang a ";
	$sql .= "LEFT JOIN nhan_khau b ON a.idNhanKhau = b.ID";
	
	$select = mysqli_query($db, $sql);
	if(mysqli_num_rows($select) > 0)
	{
		while($row = mysqli_fetch_array($select)){
			$maGiayTamVang = $row['maGiayTamVang'];
			$hoTen = $row['hoTen'];
			$namSinh = date("d/m/Y", strtotime($row['namSinh']));
			$gioiTinh = $row['gioiTinh'];
			$noiTamTru = $row['noiTamTru'];
			$tuNgay = date("d/m/Y", strtotime($row['tuNgay']));
			$denNgay = date("d/m/Y", strtotime($row['denNgay']));
			$trangThai = ($row['trangThai'] == 0) ? "Còn hạn" : "Hết hạn";
			$lyDo = $row['lyDo'];
			
			$return_arr[] = array(
							"maGiayTamVang" => $maGiayTamVang,
							"hoTen" => $hoTen,
							"namSinh" => $namSinh,
							"gioiTinh" => $gioiTinh,
							"noiTamTru" => $noiTamTru,
							"tuNgay" => $tuNgay,
							"denNgay" => $denNgay,
							"trangThai" => $trangThai,
							"lyDo" => $lyDo);
		}
	}
	
	mysqli_close($db);
	echo json_encode($return_arr);
	exit();
}

// Tách hộ khẩu
if(isset($_POST['tachHoKhau']))
{
	$status = '';
	
	$obj = json_decode($_POST["datastring"], true);
	$soNhanKhau = sizeof($obj);
	
    $tmp = '';
    if($soNhanKhau == 1)
	{
		$tmp = "('".$obj[0]."')";
	}
	else
	{
		for($i = 0; $i < $soNhanKhau; $i++){
			if($i == 0)
				$tmp = "('".$obj[$i]."'";
			else if($i == $soNhanKhau - 1)
				$tmp .= ", '".$obj[$i]."')";
			else
				$tmp .= ", '".$obj[$i]."'";
		}
	}
	
	$status = $tmp;
	
    $select = mysqli_query($db,"SELECT * FROM `thanh_vien_cua_ho` WHERE idNhanKhau IN ".$tmp." AND quanHeVoiChuHo = 'Chủ hộ'");
    $num = mysqli_num_rows($select);
	if($num > 0)
    {
        $status = "Nhân khẩu bạn tách đang là chủ hộ";
    }
    else
    {
        $sql = "DELETE FROM `thanh_vien_cua_ho` WHERE idNhanKhau IN ".$tmp;
        if(!mysqli_query($db, $sql))
        {
            $status = "Lỗi truy vấn";
        }
        else
            $status = "Tách thành công";
    }
	
	echo $status;
	mysqli_close($db);
	exit();
}

// Thêm hộ khẩu trong tách
if(isset($_POST['taoHoKhau']))
{
	$status = '';
	
	$obj = json_decode($_POST["datastring"], true);
	$soNhanKhau = sizeof($obj) - 1;
	
	$tmp = '';
    if($soNhanKhau == 1)
	{
		$tmp = "('".$obj[1]."')";
	}
	else
	{
		for($i = 1; $i <= $soNhanKhau; $i++){
			if($obj[$i][1] == 'Chủ hộ')
					$chuHo = $i;
			
			if($i == 1)
				$tmp = "('".$obj[$i][0]."'";
			else if($i == $soNhanKhau)
				$tmp .= ", '".$obj[$i][0]."')";
			else
				$tmp .= ", '".$obj[$i][0]."'";
		}
	}
	
	$status = $tmp;
	
    $select = mysqli_query($db,"SELECT * FROM `thanh_vien_cua_ho` WHERE idNhanKhau IN ".$tmp." AND quanHeVoiChuHo = 'Chủ hộ'");
    $num = mysqli_num_rows($select);
	if($num > 0)
    {
        $status = "Nhân khẩu bạn tách đang là chủ hộ";
    }
    else
    {
		$select = mysqli_query($db, "SELECT MAX(maHoKhau) 'maHoKhau' FROM `ho_khau` ORDER BY maHoKhau DESC");
		if(!$select)
			$status = "Lỗi truy vấn";
		$row = mysqli_fetch_array($select, MYSQLI_ASSOC);

		$maHoKhauMoi = str_pad($row["maHoKhau"] + 1, 6, '0', STR_PAD_LEFT);
		$maKhuVuc = $obj[0][0];
		$diaChi = $obj[0][1];
		$user = $_SESSION['user'];
		
		$sql = "INSERT INTO `ho_khau`(maHoKhau, idChuHo, maKhuVuc, diaChi, nguoiThucHien) "
				."VALUES ('".$maHoKhauMoi."', '".$obj[$chuHo][0]."', '".$maKhuVuc."', '".$diaChi."', "
				."(SELECT `ID` FROM `users` WHERE username = '".$user."'))";
		$select = mysqli_query($db, $sql);
		if(!$select)
			$status = "Lỗi truy vấn";
		
		$sql = "SELECT `ID` FROM `ho_khau` WHERE maHoKhau = '".$maHoKhauMoi."'";
		$select = mysqli_query($db, $sql);
		if(!$select && mysqli_num_rows($select) != 0)
			$status = "Lỗi truy vấn";
		else {
			$row = mysqli_fetch_array($select);
			$ID = $row['ID'];
			for($i = 1; $i <= $soNhanKhau; $i++)
			{
				if($i == 1)
					$tmp = "('".$obj[$i][0]."', '".$ID."', '".$obj[$i][1]."')";
				else if($i == $soNhanKhau)
					$tmp .= ", ('".$obj[$i][0]."', '".$ID."', '".$obj[$i][1]."')";
				else
					$tmp .= ", ('".$obj[$i][0]."', '".$ID."', '".$obj[$i][1]."')";
			}
			
			$sql = "INSERT INTO `thanh_vien_cua_ho` (idNhanKhau, idHoKhau, quanHeVoiChuHo) VALUES ".$tmp
					."ON DUPLICATE KEY UPDATE  idHoKhau = VALUES(idHoKhau), quanHeVoiChuHo = VALUES(quanHeVoiChuHo)";
			$select = mysqli_query($db, $sql);
			if(!$select)
				$status = "Lỗi truy vấn";
			else
				$status = "Tách và thêm hộ khẩu mới thành công";
			
		}
		
//		INSERT INTO `ho_khau`(maHoKhau, idChuHo, maKhuVuc, diaChi, ngayLap, nguoiThucHien) VALUES ('".$maHoKhau."', '".$obj[$chuHo][0]."', '".$maKhuVuc."', '".$diaChi."', CONVERT(DATE, CURRENT_TIMESTAMP), (SELECT ID FROM users WHERE username = '$user'));
//		INSERT INTO `thanh_vien_cua_ho` (idNhanKhau, idHoKhau, quanHeVoiChuHo) VALUES ".$tmp."  ON DUPLICATE KEY UPDATE  idHoKhau = VALUES(idHoKhau), quanHeVoiChuHo = VALUES(quanHeVoiChuHo);
	}
	
	echo $status;
	mysqli_close($db);
	exit();
}

// 
if(isset($_POST['search_request']))
{
	$data = $_POST['search_data'];
	
	$sql = "SELECT a.ID, a.hoTen, a.bietDanh, a.namSinh, a.gioiTinh, a.noiSinh, d.soCMT, d.ngayCap, d.noiCap, x.maHoKhau, x.quanHeVoiChuHo,
			a.nguyenQuan, a.noiThuongTru, a.diaChiHienNay, a.danToc, a.quocTich, a.tonGiao, a.soHoChieu, a.trinhDoHocVan, a.trinhDoChuyenMon, 
			a.bietTiengDanToc, a.trinhDoNgoaiNgu, a.ngheNghiep, a.noiLamViec, a.tienAn, a.ngayChuyenDen, a.lyDoChuyenDen, a.ngayChuyenDi, a.lyDoChuyenDi, a.diaChiMoi, a.ghiChu, 
			b.maGiayTamTru, b.soDienThoaiNguoiDangKy, b.tuNgay, b.denNgay, b.lyDo,
			c.maGiayTamVang, c.noiTamTru, c.tuNgay, c.denNgay, c.lyDo
			FROM nhan_khau a 
			LEFT JOIN tam_tru b ON a.ID = b.idNhanKhau
			LEFT JOIN tam_vang c ON a.ID = c.idNhanKhau
			LEFT JOIN chung_minh_thu d ON a.ID = d.idNhanKhau
			LEFT JOIN (SELECT e.quanHeVoiChuHo, e.idNhanKhau, f.maHoKhau FROM thanh_vien_cua_ho e LEFT JOIN ho_khau f ON e.idHoKhau = f.ID) x ON a.ID = x.idNhanKhau  
			WHERE a.hoTen LIKE \'%$data[0]%'\ OR d.soCMT LIKE \'%$data[1]%'\ OR x.maHoKhau LIKE \'%$data[2]%'\ 
			OR b.maGiayTamTru LIKE \'%$data[3]%'\ OR c.maGiayTamVang LIKE \'%$data[4]%'\ ORDER BY `a`.`ID` ASC";
	
	$query = mysqli_query($db, $sql);
	
	if(!$query)
	{
		echo "Lỗi kết nối với cơ sở dữ liệu";
		mysqli_close($db);
		exit();
	}
	
	$newArr = array();
	while($db_field = mysqli_fetch_assoc($select))
	{
		$newArr[] = $db_field;
	}
	
	mysqli_close($db);
	echo json_encode($newArr);
	exit();
}

// Khai báo thông tin covid
if(isset($_POST['khaiBao']))
{
	$data = json_decode($_POST['data'], true);
	$idNK = '';
	
	if($data[6] != '')
	{
		$sql = "SELECT idNhanKhau FROM chung_minh_thu WHERE soCMT = '".$data[6]."'";
		$select = mysqli_query($db, $sql) or die(mysqli_error($db));
		if(!$select)
		{
			echo "Lỗi kết nối với cơ sở dữ liệu";
			mysqli_close($db);
			exit();
		}else if(mysqli_num_rows($select) > 1){
			$row = mysqli_fetch_array($select);
			$idNK = $row['idNhanKhau'];
			echo $idNK;
		}
	}
	
	
	$arr = explode('/', $data[3]);
	$date = $arr[2].'-'.$arr[1].'-'.$arr[0];
	
	
	if($idNK != '')
		$sql = "INSERT INTO `khai_bao`(`idNhanKhau`, `hoTen`, `doiTuong`, `hoTenKhaiBaoHo`, `namSinh`, `gioiTinh`, `soDienThoaiLienHe`, `soCMT`, `soHoChieu`, `soBaoHiemYTe`, `noiOHienNay`, `quocGia`, "
		."`x1`, `x2`, `x3`, `x4`, `x5`, `x6`, `y1`, `y2`, `y3`, `z1`, `z2`, `z3`, `z4`, `z5`, `z6`, `z7`, `z8`, `z9`, `z10`, `z11`) "
		."VALUES ('".$idNK."', '".$data[2]."',  '".$data[0]."', '".$data[1]."', '".$date."', '".$data[4]."', '".$data[5]."', '".$data[6]."', '".$data[7]."', '".$data[8]."', '".$data[9]."',  '".$data[10]."', "
		."'".$data[11]."', '".$data[12]."', '".$data[13]."', '".$data[14]."', '".$data[15]."', '".$data[16]."', '".$data[17]."', '".$data[18]."', '".$data[19]."', '".$data[20]."', '".$data[21]."', "
		."'".$data[22]."', '".$data[23]."', '".$data[24]."', '".$data[25]."', '".$data[26]."', '".$data[27]."', '".$data[28]."', '".$data[29]."', '".$data[30]."')";
	else
		$sql = "INSERT INTO `khai_bao`(`hoTen`, `doiTuong`, `hoTenKhaiBaoHo`, `namSinh`, `gioiTinh`, `soDienThoaiLienHe`, `soCMT`, `soHoChieu`, `soBaoHiemYTe`, `noiOHienNay`, `quocGia`, "
		."`x1`, `x2`, `x3`, `x4`, `x5`, `x6`, `y1`, `y2`, `y3`, `z1`, `z2`, `z3`, `z4`, `z5`, `z6`, `z7`, `z8`, `z9`, `z10`, `z11`) "
		."VALUES ('".$data[2]."',  '".$data[0]."', '".$data[1]."', '".$date."', '".$data[5]."', '".$data[4]."', '".$data[6]."', '".$data[7]."', '".$data[8]."', '".$data[9]."',  '".$data[10]."', "
		."'".$data[11]."', '".$data[12]."', '".$data[13]."', '".$data[14]."', '".$data[15]."', '".$data[16]."', '".$data[17]."', '".$data[18]."', '".$data[19]."', '".$data[20]."', '".$data[21]."', "
		."'".$data[22]."', '".$data[23]."', '".$data[24]."', '".$data[25]."', '".$data[26]."', '".$data[27]."', '".$data[28]."', '".$data[29]."', '".$data[30]."')";
	
	$select = mysqli_query($db_covid, $sql) or die(mysqli_error($db_covid));
	if(!$select)
	{
		echo "Lỗi kết nối với cơ sở dữ liệu";
		mysqli_close($db_covid);
		exit();
	}else{
		echo "1";
	}
	
    mysqli_close($db);
    mysqli_close($db_covid);
    exit();
}

// Thêm người bệnh, người cách ly
if(isset($_POST['themCovid']))
{
	$data = json_decode($_POST['data'], true);
	
	$arr = explode('/', $data[1]);
	$data[1] = $arr[2].'-'.$arr[1].'-'.$arr[0];
	
	$arr = explode('/', $data[5]);
	$data[5] = $arr[2].'-'.$arr[1].'-'.$arr[0];
	
	$sql = "INSERT INTO `cach_ly`(`hoTen`, `soDienThoai`, `namSinh`, `diaChi`, `quocTich`, `hinhThucCachLy`, `diaDiemCachLy`, `mucDoCachLy`, `thoiGianBatDauCachLy`, `hinhThuctest`, `ketQuaTest`, `lyDo`, `loTrinh`) "
			."VALUES('".$data[0]."', '".$data[2]."', '".$data[1]."', '".$data[4]."', '".$data[3]."', '".$data[6]."', '".$data[10]."', '".$data[5]."', '".$data[8]."', '".$data[7]."', '".$data[11]."', '".$data[9]."', '".$data[12]."')";
	$select = mysqli_query($db_covid, $sql) or die(mysqli_error($db_covid));
	if(!$select)
	{
		echo "Lỗi kết nối với cơ sở dữ liệu";
		mysqli_close($db_covid);
		exit();
	}
	
	if($data[5] == "F0")
	{
		$idCL = mysqli_insert_id($db_covid);
		$select = mysqli_query($db_covid, "SELECT MAX(maBenhNhan) `maBenhNhan` FROM mac_covid ORDER BY maBenhNhan DESC") or die(mysqli_error($db_covid));
		if(!$select)
		{
			echo "Lỗi kết nối với cơ sở dữ liệu";
			mysqli_close($db_covid);
			exit();
		}
		
		$maBN = mysqli_fetch_array($select);
		
		$maBN = "BN".(substr($maBN['maBenhNhan'], 2) + 1);
		
		$select = mysqli_query($db, "SELECT ID FROM users WHERE username='".$_SESSION['user']."'") or die(mysqli_error($db));
		if(!$select)
		{
			echo "Lỗi kết nối với cơ sở dữ liệu";
			mysqli_close($db);
			exit();
		}
		$idNT = mysqli_fetch_array($select);
		$idNT = $idNT['ID'];
		
		$sql = "INSERT INTO `mac_covid`(`idCachLy`, `maBenhNhan`, `tinhTrang`, `ngayTao`, `idNguoiTao`) VALUES('".$idCL."', '".$maBN."', 'Đang điều trị', NOW(), '".$idNT."')";
		$select = mysqli_query($db_covid, $sql) or die(mysqli_error($db_covid));
		if(!$select)
		{
			echo "Lỗi kết nối với cơ sở dữ liệu";
			mysqli_close($db_covid);
			exit();
		}
	}
	
	echo "1";
	mysqli_close($db);
    mysqli_close($db_covid);
    exit();
}

?>