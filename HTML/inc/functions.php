<?php


function myUrlEncode($string) {
    $entities = array('%21', '%2A', '%27', '%28', '%29', '%3B', '%3A', '%40', '%26', '%3D', '%2B', '%24', '%2C', '%2F', '%3F', '%25', '%23', '%5B', '%5D');
    $replacements = array('!', '*', "'", "(", ")", ";", ":", "@", "&", "=", "+", "$", ",", "/", "?", "%", "#", "[", "]");
    return str_replace($entities, $replacements, urlencode($string));
}

function processXML($lead_id, $status, $lead_admin_link, $partners, &$error)
{
	header("Content-type: text/xml");
	$outputXML = '<?xml version="1.0" encoding="ISO-8859-1" ?><response><responsecode>'.$lead_id.'</responsecode><errormsg>'.$error.'</errormsg><datetime>'.$status.'</datetime></response>';
	print $outputXML;
	return false;
}

function processXML2($lead_id, $status, $lead_admin_link, $partners, $error)
{
	header("Content-type: text/xml");
	$outputXML = '<?xml version="1.0" encoding="ISO-8859-1" ?><response><responsecode>'.$lead_id.'</responsecode><errormsg>'.$error.'</errormsg><datetime>'.$status.'</datetime></response>';
	print $outputXML;
	return false;
}

function maximizeUtilityCompany($state, &$Utility_Company, $allowedProviders)
{
	$allowed = json_decode($allowedProviders, true);
    $allowedLength = count($allowed[$state]) - 1;
    $allowedRandom = rand(0,$allowedLength);
	if (!in_array($Utility_Company, $allowed[$state])) $Utility_Company = $allowed[$state][$allowedRandom];
	return $Utility_Company;
}


function myProxy($get, $param, $urlToGoTo, &$error)
{
	$postArray = array();
	$post = '';
	//$getArray = json_decode($get);
	//parse_str($get, $getArray);
	//foreach($getArray as $a => $b)
	//{
	//	$post .= $a."=".$b."&";
	//	$postArray[$a] = $b;
	//}
	$getParms = 'csurl='.$urlToGoTo.'&'.$get;
	$posturl = 'https://www.solarmoneyexperts.com/proxy.php';
	$curl = curl_init($posturl);
		//PC::debug($get,'myProxy.get');
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);      // Listen for a response.
	curl_setopt($curl, CURLOPT_POST, false);                // Send data over POST.
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $getParms);      // Attach the list of fields to the request.
	curl_setopt($curl, CURLOPT_HTTPHEADER, Array("X-Proxy-URL: https://www.solarmoneyexperts.com/LG2/postmiddle.php"));
	curl_setopt($curl, CURLOPT_HTTPHEADER, Array("Content-Type: application/x-www-form-urlencoded"));
	$response = curl_exec($curl);
		//PC::debug($response,'myProxy.response');
	if ($response === false)
	{
		$error[] = 'Curl Error: ' . curl_errno($curl).'-'.curl_error($curl);
		//PC::debug($error,'myProxy.error');
	}
	else
	{
		curl_close ($curl);
		return $response;
	}
}
function getLeadidCookie()
{
	$i = 0;
	while(!isset($_COOKIE["leadid_token-990889DB-7E7F-7D5F-2353-D0FB66D3F047-9672904C-405D-0BB5-9CC7-8EE99507A4A6"]) && $i < 1000)
	{
		$i++;
	}
		if (isset($_COOKIE["leadid_token-990889DB-7E7F-7D5F-2353-D0FB66D3F047-9672904C-405D-0BB5-9CC7-8EE99507A4A6"]))
			$leadidCookie = $_COOKIE["leadid_token-990889DB-7E7F-7D5F-2353-D0FB66D3F047-9672904C-405D-0BB5-9CC7-8EE99507A4A6"];
		else
			$leadidCookie = "";
		//PC::debug($leadidCookie,$i);
	return $leadidCookie;
}
function print_xml_data_file($localfile)
{
	//PC::debug($localfile,'includefile');
    include($localfile);
}
function get_xml_data($loadfile)
{
    ob_start();
    print_xml_data_file($loadfile);
    $xml_file = ob_get_contents();
    ob_end_clean();
    //PC::debug($xml_file,'xmlfile');
    return $xml_file;
}
?>