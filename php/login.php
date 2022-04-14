<?php
include("config.php");
session_start();

if(isset($_POST['do_login']))
{
	$user = $_POST['user'];
	$pass = $_POST['pass'];
	
	if(!$user || !$pass || $user == '' || $pass == '')
	{
		echo "Enter your username and password";
	}
	else
	{
		$select = mysqli_query($db, "SELECT * FROM users WHERE username = '$user'");
		if(mysqli_num_rows($select) > 0)
		{
			$row = mysqli_fetch_array($select, MYSQLI_ASSOC);
			$pass = $row["salt"] . "." . $pass;
			$pass = md5($pass);
			if($row["password"] == $pass && $row['level'] > 0)
			{
				$_SESSION['user'] = $row["username"];
				echo "success";
			}
			else
			{
				echo "Incorrect Password";
			}
		}
		else
		{
			echo "Incorrect Username";
		}
	}
	
	mysqli_close($db);
	exit();
}

if(isset($_POST['do_register']))
{
	$user = $_POST['user'];
	$pass = $_POST['pass'];
	$repass = $_POST['repass'];
	
	$select = mysqli_query($db, "SELECT * FROM users WHERE username = '$user'");
	if(mysqli_num_rows($select) == 0)
	{
		
	}
	else
	{
		echo "Incorrect Username";
	}
	
	mysqli_close($db);
	exit();
}

?>
