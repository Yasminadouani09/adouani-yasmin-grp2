<?php

try
{
    $bd=new PDO("mysql:host=localhost;dbname=jeux", "root", "");
    echo("connexion etablie avec succes <br>");
}
catch(PDOexeption $e)
{
    die("erreur".$e->getmessage());
}

	$username=$_POST['username'];
	$password=$_POST['password'];
	
	$req= "INSERT INTO joueur VALUES('$username','$password');";
	$res=$bd->exec($req);
	if($res)
		echo "insertion effectuee avec succes";
	else 
		echo "echec d'insertion";
        $servername ='localhost';
        $username ='root';
        $pass='';
        $db='jeux';
        $conn = new mysqli($servername,$username,$pass,$db);
        $sql = "SELECT * FROM joueur";
        if ($result=mysqli_query($conn,$sql)) {
            $rowcount=mysqli_num_rows($result);
            echo "The total number of rows are: ".$rowcount; 
        }
?>