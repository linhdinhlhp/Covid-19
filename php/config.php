<?php
	define('DB_SERVER', 'localhost');
   	define('DB_USERNAME', 'root');
   	define('DB_PASSWORD', '');
   	define('DB_DATABASE', 'quan_ly_nhan_khau');
   	$db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
   	

	if(!$db)
		echo "Could not connect to the Server!";


	define('DB_SERV', 'localhost');
   	define('DB_USER', 'root');
   	define('DB_PASS', '');
   	define('DB_DATA', 'covid-19');
   	$db_covid = mysqli_connect(DB_SERV,DB_USER,DB_PASS,DB_DATA);
   	

	if(!$db_covid)
		echo "Could not connect to the Server!";
?>