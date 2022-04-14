<?php
include("config.php");
session_start();

// Lấy dữ liệu nhân khẩu 
if(isset($_POST["NhanKhau"]))
{
	$data = json_decode($_POST["inf"]);
	
	$str = "";
	if($data[0] != "")
	{
		$str .= " WHERE x.hoTen LIKE '%".$data[0]."%'";
		if($data[1] != "")
		{
			$str .= " OR x.soCMT LIKE '%".$data[1]."%'";
			if($data[2] != 0)
			{
				$str .= " OR y.maHoKhau LIKE '%".$data[2]."%'";
			}
		}else{
			if($data[2] != 0)
			{
				$str .= " OR y.maHoKhau LIKE '%".$data[2]."%'";
			}
		}
	}else{
		if($data[1] != "")
		{
			$str .= " WHERE x.soCMT LIKE '%".$data[1]."%'";
			if($data[2] != 0)
			{
				$str .= " OR y.maHoKhau LIKE '%".$data[2]."%'";
			}
		}else{
			if($data[2] != 0)
			{
				$str .= " WHERE y.maHoKhau LIKE '%".$data[2]."%'";
			}
		}
	}
	
	$sql = "SELECT x.*, y.maHoKhau, y.quanHeVoiChuHo FROM (SELECT a.ID, a.hoTen, a.bietDanh, a.gioiTinh, a.namSinh, a.noiSinh, a.nguyenQuan, "
				."a.danToc, a.tonGiao, a.quocTich, a.soHoChieu, a.diaChiHienNay, d.soCMT, d.ngayCap, d.noiCap, a.trinhDoHocVan, a.trinhDoChuyenMon, a.bietTiengDanToc, "
				."a.trinhDoNgoaiNgu, a.ngheNghiep, a.noiLamViec, a.noiThuongTru, a.ngayChuyenDen, a.lyDoChuyenDen, a.ngayChuyenDi, a.tienAn, a.ghiChu "
				."FROM nhan_khau a LEFT JOIN chung_minh_thu d ON d.idNhanKhau = a.ID WHERE a.ngayChuyenDi IS NULL) x "
				."LEFT JOIN (SELECT c.maHoKhau , b.idNhanKhau, b.quanHeVoiChuHo FROM thanh_vien_cua_ho b LEFT JOIN ho_khau c ON b.idHoKhau = c.ID) "
				."y ON x.ID = y.idNhanKhau";
	
	if($str != "")
		$sql = $sql.$str;
	
	$select = mysqli_query($db, $sql) or die(mysqli_error($db));
	if(!$select)
    {
        echo "Lỗi kết nối với cơ sở dữ liệu";
        mysqli_close($db);
        exit();
    }
	
	if(mysqli_num_rows($select) > 0)
	{
		$i = 1;
		while($row = mysqli_fetch_array($select)){
			$ID = $row['ID'];
			$maHoKhau = ($row['maHoKhau'] == '') ? "" : $row['maHoKhau'];
			$hoTen = $row['hoTen'];
			$bietDanh = ($row['bietDanh'] == '') ? "" : $row['bietDanh'];
			$gioiTinh = $row['gioiTinh'];
			$namSinh = date("d/m/Y", strtotime($row['namSinh']));
			$quanHeVoiChuHo = ($row['quanHeVoiChuHo'] == '') ? "" : $row['quanHeVoiChuHo'];
			$noiSinh = ($row['noiSinh'] == '') ? "" : $row['noiSinh'];
			$nguyenQuan = ($row['nguyenQuan'] == '') ? "" : $row['nguyenQuan'];
			$danToc = ($row['danToc'] == '') ? "" : $row['danToc'];
			$tonGiao = ($row['tonGiao'] == '') ? "" : $row['tonGiao'];
			$quocTich = ($row['quocTich'] == '') ? "" : $row['quocTich'];
			$soHoChieu = ($row['soHoChieu'] == '') ? "" : $row['soHoChieu'];
			$diaChiHienNay = ($row['diaChiHienNay'] == '') ? "" : $row['diaChiHienNay'];
			$soCMT = ($row['soCMT'] == '') ? "" : $row['soCMT'];
			$ngayCap = ($row['ngayCap'] == '') ? "" : date("d/m/Y", strtotime($row['ngayCap']));
			$noiCap = ($row['noiCap'] == '') ? "" : $row['noiCap'];
			$trinhDoHocVan = ($row['trinhDoHocVan'] == '') ? "" : $row['trinhDoHocVan'];
			$trinhDoChuyenMon = ($row['trinhDoChuyenMon'] == '') ? "" : $row['trinhDoChuyenMon'];
			$bietTiengDanToc = ($row['bietTiengDanToc'] == '') ? "" : $row['bietTiengDanToc'];
			$trinhDoNgoaiNgu = ($row['trinhDoNgoaiNgu'] == '') ? "" : $row['trinhDoNgoaiNgu'];
			$ngheNghiep = ($row['ngheNghiep'] == '') ? "" : $row['ngheNghiep'];
			$noiLamViec = ($row['noiLamViec'] == '') ? "" : $row['noiLamViec'];
			$noiThuongTru = ($row['noiThuongTru'] == '') ? "" : $row['noiThuongTru'];
			$tienAn = ($row['tienAn'] == '') ? "" : $row['tienAn'];
			$ngayChuyenDen = ($row['ngayChuyenDen'] == '') ? "" : date("d/m/Y", strtotime($row['ngayChuyenDen']));
			$lyDoChuyenDen = ($row['lyDoChuyenDen'] == '') ? "" : $row['lyDoChuyenDen'];
			$ghiChu = ($row['ghiChu'] == '') ? "" : $row['ghiChu'];
			
			$return_arr[] = array($i, $hoTen, $bietDanh, $namSinh, $gioiTinh, $noiSinh, $nguyenQuan, $danToc, $quocTich, $tonGiao, $soCMT, $ngayCap, $noiCap,
								  $maHoKhau, $quanHeVoiChuHo, $soHoChieu, $noiThuongTru,  $diaChiHienNay, $ngheNghiep, $noiLamViec, $trinhDoHocVan,
								  $trinhDoChuyenMon, $trinhDoNgoaiNgu, $bietTiengDanToc, $ngayChuyenDen, $lyDoChuyenDen, $tienAn, $ghiChu, $ID);
			$i++;
		}
		echo json_encode($return_arr);
	}else
		echo "0";
	
	mysqli_close($db);
	exit();
}

if(isset($_POST["edit"]))
{
	$d = json_decode($_POST['data']);
	
	$len = sizeof($d);
	$i = 0;
	
	$key_NK = '';
	$key_CMT = '';
	$val_CMT = '';
	$DUP = '';
	for($i; $i < $len - 1; $i++)
	{
		if($d[$i][0] == 'ngayCap' || $d[$i][0] == 'namSinh' || $d[$i][0] == 'ngayChuyenDi' || $d[$i][0] == 'ngayChuyenDen')
		{
			$arr = explode('/', $d[$i][1]);
			$d[$i][1] = $arr[2].'-'.$arr[1].'-'.$arr[0];
		}
		
		if($d[$i][0] == 'soCMT' || $d[$i][0] == 'ngayCap' || $d[$i][0] == 'noiCap')
		{
			if($key_CMT == '')
			{
				$key_CMT = "(".$d[$i][0];
				$val_CMT = "( '".$d[$i][1]."'";
				$DUP = $d[$i][0]." = '".$d[$i][1]."'";
			}else{
				$key_CMT .= ", ".$d[$i][0];
				$val_CMT .= ", '".$d[$i][1]."'";
				$DUP .= ", ".$d[$i][0]." = '".$d[$i][1]."'";
			}
		}else
		{
			if($key_NK == '')
			{
				$key_NK = $d[$i][0]." = '".$d[$i][1]."'";
			}else{
				$key_NK .= ", ".$d[$i][0]." = '".$d[$i][1]."'";
			}
		}
	}
	
	$id = $d[$len - 1];
	
	if($key_CMT != '')
	{
		$select = mysqli_query($db, "(SELECT ID FROM chung_minh_thu WHERE idNhanKhau = '".$id."')") or die(mysqli_error($db));
		if(!$select)
		{
			echo "Lỗi kết nối với cơ sở dữ liệu";
			mysqli_close($db);
			exit();
		}
		$ID_CMT = mysqli_fetch_array($select);
		$ID_CMT = $ID_CMT['ID'];
		
		$key_CMT .= ", ID)";
		$val_CMT .= ", '".$ID_CMT."')";
		$sql = "INSERT INTO chung_minh_thu".$key_CMT." VALUES".$val_CMT." ON DUPLICATE KEY UPDATE ".$DUP;
//		echo $sql."\n";
		$select = mysqli_query($db, $sql) or die(mysqli_error($db));
		if(!$select)
		{
			echo "Lỗi kết nối với cơ sở dữ liệu";
			mysqli_close($db);
			exit();
		}
	}
	
	if($key_NK != '')
	{
		$sql = "UPDATE `nhan_khau` SET ".$key_NK." WHERE ID = '".$id."'";
//		echo $sql;
		$select = mysqli_query($db, $sql) or die(mysqli_error($db));
		if(!$select)
		{
			echo "Lỗi kết nối với cơ sở dữ liệu";
			mysqli_close($db);
			exit();
		}
	}
	
	echo 1;
	mysqli_close($db);
	exit();
}


if(isset($_POST["xoaNK"]))
{
	$ID = $_POST['xoaNK'];
	$lydo = $_POST['data'];
	
	$sql = "UPDATE `nhan_khau` SET `ngayXoa` = NOW(), `lyDoXoa` = '".$lydo."', `idNguoiXoa` = (SELECT ID FROM users WHERE username = '".$_SESSION['user']."') WHERE ID = '".$ID."';";
	$select = mysqli_query($db, $sql) or die(mysqli_error($db));
	if(!$select)
    {
        echo "Lỗi kết nối với cơ sở dữ liệu";
        mysqli_close($db);
        exit();
    }else{
		$sql = "DELETE FROM `thanh_vien_cua_ho` WHERE idNhanKhau = '$ID' AND EXISTS (SELECT 1 FROM `thanh_vien_cua_ho` WHERE idNhanKhau = '$ID');";
//		$sql .= "DELETE FROM `chung_minh_thu` WHERE idNhanKhau = '$ID' AND EXISTS (SELECT 1 FROM `chung_minh_thu` WHERE idNhanKhau = '$ID');";
		mysqli_query($db, $sql) or die(mysqli_error($db));
        
		$sql = "DELETE FROM `chung_minh_thu` WHERE idNhanKhau = '$ID' AND EXISTS (SELECT 1 FROM `chung_minh_thu` WHERE idNhanKhau = '$ID');";
		mysqli_query($db, $sql) or die(mysqli_error($db));
        
		echo 1;
	}	
	
	mysqli_close($db);
	exit();
}

?>