<?php
	//session_start();
	include('globals.php');
	include('functions.php');

	//$access_token = "ed9edaac605318eeb6c2ee521bc442090944bad9ae6a962969b93b766d58a170"; //demo
	$access_token = "25d8680f0238e109d556a5fadcc681e17998806779a63f4aa8e36c431f7adbbe"; //live

	$OCI = 9127;
	$PCID = 7110;
	$baseHref = "https://savingsstorecentral.enjoymydeals.com/home";
	//$posturl = "http://amt-demo.accessdevelopment.com/api/v1/imports"; //demo
	$posturl = "http://amt.accessdevelopment.com/api/v1/imports"; //live

	//date_default_timezone_set('UTC');
	$datetime = date("Y-m-d H:m:s");

	$memberid = $_REQUEST["memberid"];
	$first_name = $_REQUEST["firstname"];
	$last_name = $_REQUEST["lastname"];
	$street_line1 = $_REQUEST["address"];
	$city = $_REQUEST["city"];
	$state = $_REQUEST["state"];
	$postal_code = $_REQUEST["zip"];
	$country = $_REQUEST["country"];
	$email_address = $_REQUEST["email"];

	$post_item = '{"import":{"members":[{"record_type":"MEM_SYN", "organization_customer_identifier":"'.$OCI.'", "program_customer_identifier":"'.$PCID.'", "first_name":"'.$first_name.'", "last_name":"'.$last_name.'", "postal_code":"'.$postal_code.'", "state":"'.$state.'", "country":"'.$country.'", "street_line1":"'.$street_line1.'", "city":"'.$city.'", "email_address":"'.$email_address.'", "member_customer_identifier":"'.$memberid.'", "member_status":"OPEN", "record_identifier":"'.$memberid.'"} ]}}';

	$ch1 = curl_init();

	$headers    = array();
	$headers[]  = 'Accept: application/json';
	$headers[]  = 'Content-Type: application/json';
	$headers[]  = 'Access-Token: '.$access_token;
	$headers[]  = 'Content-Length: '.strlen($post_item);

	curl_setopt($ch1, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch1, CURLOPT_URL, $posturl.'?access_token='.$access_token);
	curl_setopt($ch1, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch1, CURLOPT_POSTFIELDS, $post_item);
	curl_setopt($ch1, CURLOPT_POSTREDIR, 3);
	curl_setopt($ch1, CURLOPT_HEADER, 0);
	curl_setopt($ch1, CURLOPT_ENCODING, '');
	curl_setopt($ch1, CURLOPT_RETURNTRANSFER, 1);
	//curl_setopt($ch1, CURLOPT_COOKIESESSION, 0);
	//curl_setopt($ch1, CURLOPT_COOKIEFILE, '');
	////curl_setopt($ch1, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch1, CURLOPT_FOLLOWLOCATION, 0);
	//curl_setopt($ch1, CURLOPT_CAPATH, '/-accessdevelopmentcom.crt');
	//curl_setopt($ch1, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
	//curl_setopt($ch1, CURLOPT_SSLVERSION, 3);
	//curl_setopt($ch1, CURLOPT_TIMEOUT, 0); //Wait forever
	//curl_setopt($ch1, CURLOPT_SSLVERSION, 'CURL_SSLVERSION_SSLv3' );
	//curl_setopt($ch1, CURLOPT_SSL_VERIFYHOST, 0);


	$response = curl_exec($ch1);
	$jsonresponse = json_decode($response, true);
	$info = curl_getinfo($ch1);
	//d($jsonresponse,'jsonresponse');
	//d($response,'response');
	if (curl_errno($ch1))
	{
		$error_code = curl_errno($ch1);
		$error_string = curl_error($ch1);
		$error = 'Curl Error: ' . $error_code.'-'.$error_string;
		processXML($error_code, $datetime, '', '', $error_string);
	}
	else
	{
		if ($jsonresponse["data"][0]["status"] == "imported") {
			$cleanString = strtoupper($OCI."-".$PCID."-".$memberid);
			$cvt=sha1($cleanString);
			$url = 'https://www.memberweb.com/activate/activate.asp?a=1&SC_FID=RealTimeActivation&cvt='.$cvt.'&email='.$email_address.'&sc_events=event2&GroupID='.$PCID.'&MemberID='.$memberid.'&zip='.$postal_code.'&location='.$postal_code.'&country='.$country.'&postal_code='.$postal_code.'&FName='.$first_name.'&LName='.$last_name.'&Address='.$street_line1.'&City='.$city;
			//d($url,'url');
			header('Location: '.$url);
		}
		else {
			processXML(2, $datetime, '', '', $jsonresponse["data"][0]["status"]);
		}
	}
	curl_close($ch1);
?>
