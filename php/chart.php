<?php
include("config.php");
session_start();

//SELECT (SELECT COUNT(*) FROM nhan_khau WHERE FLOOR(DATEDIFF(CURDATE(), namSinh) / 365) < 18) AS "duoi18", (SELECT COUNT(*) FROM nhan_khau WHERE FLOOR(DATEDIFF(CURDATE(), namSinh) / 365) >= 65) AS "tren65", ((SELECT COUNT(*) FROM nhan_khau) - "duoi18" - "tren65")
if(isset($_POST["tuoi"]))
{
	
	$sql = "SELECT (SELECT COUNT(*) FROM nhan_khau WHERE FLOOR(DATEDIFF(CURDATE(), namSinh) / 365) < 15) AS 'a', "
			."(SELECT COUNT(*) FROM nhan_khau WHERE FLOOR(DATEDIFF(CURDATE(), namSinh) / 365) >= 60) AS 'b', "
			."((SELECT COUNT(*) FROM nhan_khau) - 'a' - 'b') 'c'";
	
	$select = mysqli_query($db, $sql) or die(mysqli_error($db));
    if(!$select)
    {
        echo "Lỗi kết nối với cơ sở dữ liệu";
        mysqli_close($db);
        exit();
    }
	
	if(mysqli_num_rows($select) > 0)
	{
		$row = mysqli_fetch_array($select);
		$result = array($row['a'], $row['c'], $row['b']);
		echo json_encode($result);	
	}
	else
		echo 0;
	
	
	mysqli_close($db);
	exit();
}

if(isset($_POST["count"]))
{
	$sql = "SELECT (SELECT COUNT(*) FROM nhan_khau WHERE ngayChuyenDi IS NULL AND ngayXoa IS NULL) a, "
			."(SELECT COUNT(*) FROM tam_tru WHERE denNgay >= NOW()) b, "
			."(SELECT COUNT(*) FROM tam_vang WHERE denNgay >= NOW()) c";
	
	$select = mysqli_query($db, $sql) or die(mysqli_error($db));
    if(!$select)
    {
        echo "Lỗi kết nối với cơ sở dữ liệu";
        mysqli_close($db);
        exit();
    }
	
	if(mysqli_num_rows($select) >= 0)
	{
		$row = mysqli_fetch_array($select);
		$result = array($row['a'], $row['c'], $row['b']);
	}else
		echo 0;
	
	$sql = "SELECT COUNT(*) d FROM mac_covid";
	
	$select = mysqli_query($db_covid, $sql) or die(mysqli_error($db_covid));
    if(!$select)
    {
        echo "Lỗi kết nối với cơ sở dữ liệu";
        mysqli_close($db_covid);
        exit();
    }
	
	if(mysqli_num_rows($select) >= 0)
	{
		$row = mysqli_fetch_array($select);
		$result[] = $row['d'];
		echo json_encode($result);
	}else
		echo 0;
	
	mysqli_close($db);
	mysqli_close($db_covid);
	exit();
}

?>