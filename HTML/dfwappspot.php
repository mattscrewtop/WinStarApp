<?php

$curl = curl_init("https://www.dfwsportsbeat.com/home");
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_HEADER, 0);              // Do not set any custom headers.
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);      // Listen for a response.
//curl_setopt($curl, CURLOPT_POST, 1);                // Send data over POST.
//curl_setopt($curl, CURLOPT_POSTFIELDS, $post);      // Attach the list of fields to the request.
//curl_setopt($curl, CURLOPT_HTTPHEADER, Array("Content-Type: application/x-www-form-urlencoded"));
$resp = curl_exec($curl);
curl_close ($curl);	
if (count($resp) > 0) {
	//echo $resp;
	echo 'dfwsportsbeat loaded<br/>';
}


?>
<script>
open(location, '_self').close();
</script>