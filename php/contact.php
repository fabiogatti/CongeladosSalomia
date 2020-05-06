<?php
//phpinfo();

$to = "alessandro@congeladossalomia.com";
$from = $_POST['email'];
$subject = $_POST['subject'];
$msg = $_POST['message'];
$name = $_POST['name'];
$headers = "Enviado por: ". $from . " (" . $name . ")" . "\r\n";
//$msg = "Enviado por: ". $from . " (" . $name . ")\n" . $msg;
/*$from = "fabio.gatti@hotmail.com";
$subject = "Prueba";
$msg = "Esto es una prueba";
$name = "Fabio";
$headers = "From: ". $from . " (" . $name . ")" . "\r\n";*/

mail($to,$subject,$msg,$headers);
echo "Success";
?>