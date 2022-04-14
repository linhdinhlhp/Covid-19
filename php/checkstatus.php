<?php
include("config.php");
session_start();
if (!(isset($_SESSION['user']))) 
{
	echo "failed";
}
else
{
	$user = $_SESSION['user'];
	$select = mysqli_query($db, "SELECT * FROM users WHERE username = '$user'");
	if(mysqli_num_rows($select) > 0)
	{
		$row = mysqli_fetch_array($select, MYSQLI_ASSOC);
		if($row["level"] > 0)
		{
			echo $row["username"];
		}
		else
			echo "failed";
	}
	else
		echo "failed";
}

?>