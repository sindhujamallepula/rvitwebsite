<?php

require("/home3/realvalu/public_html/php/PHPMailer.php");
 
if(isset($_POST['email'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED

    $email_from = "sindhuja.mallepula@realvalueit.com";
    $email_subject = "Requested white paper";

    function returnSuccess() {
        $return_array = array('success' => true, 'error' => '');
        header('Content-type: application/json; charset=UTF-8');
        echo json_encode($return_array);
        die();
    }
 
    function died($error) {
 
        // your error code can go here
        $return_array = array('success' => false, 'error' => $error);
        header('Content-type: application/json; charset=UTF-8');
        echo json_encode($return_array);
        die();
    }
 
    // validation expected data exists
 
    if(!isset($_POST['name']) ||
 
        !isset($_POST['email']) ||
 
        !isset($_POST['company_name'])) {
 
        died('Please enter all required fields');      
 
    }
 
    $name = $_POST['name']; // required
    $email_to = $_POST['email']; // required
    $company_name = $_POST['company_name']; // not required
 
    //$comments = $_POST['comments']; 
 
    $error_message = "";
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
    if(!preg_match($email_exp,$email_to)) {
        $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
    }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
    if(!preg_match($string_exp,$name)) {
        $error_message .= 'The name you entered does not appear to be valid.<br />';
    }
 
    if(!preg_match($string_exp,$company_name)) {
        $error_message .= 'The Company Name you entered does not appear to be valid.<br />';
    }
 
 
    if(strlen($error_message) > 0) {
        died($error_message);
    }
 
    $email_message = "Form details below.\n\n";
 
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
    $email_message .= "First Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_to)."\n";
    $email_message .= "Comments: ".clean_string($company_name)."\n";
    
    $mail = new PHPMailer();

    $mail->AddAddress($email_to);

    $mail->From         = $email_from;
    $mail->FromName     = "Real Value IT";
    $mail->Subject      = $email_subject;
    $mail->Body         = $email_message;

    //public function AddAttachment($path, $name = '', $encoding = 'base64', $type = 'application/octet-stream') {
    $mail->AddAttachment("/home3/realvalu/public_html/whitepapers/RealValueWhitePaper1.pdf", "Real Value White Paper", "base64", "application/pdf");
    $mail->Send();

    returnSuccess();
    }
?>

