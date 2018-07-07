<?php
define('DEBUG', true); 
$post = "";
$success = false;
$result = true;
$lead_id = null;
$lead_admin_link = '';
$partners = array();
$error=array();
$status = 0;
$password = "Zepp6901";
$postrequiredFields = '{"Receiving_Agent_ID":{},"lead_type":{},"TYPE":{},"IP_Address":{},"SRC":{},"U_LeadiD":{}}';

$receiveRequiredFields = '{"First_Name":{},"Last_Name":{},"Phone":{},"Email":{},"Address":{},"City":{},"State":{},"Zip":{},"Roof_Shade":{},"Are_You_A_Homeowner":{},"Utility_Company":{},"Credit_Score":{},"Average_Utility_Bill_2":{},"Landing_Page":{},"Lead_Originator_Company":{},"Sub_ID":{}}';