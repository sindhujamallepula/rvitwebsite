<?php

require("/home3/realvalu/public_html/php/PHPMailer.php");
 
if(isset($_POST['email'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED

    $email_from = "inquiries@realvalueit.com";
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
 
        !isset($_POST['company_name']) ||

        !isset($_POST['whitepaper'])
        ) {
 
        died('Please enter all required fields');      
 
    }
 
    $name = $_POST['name']; // required
    $email_to = $_POST['email']; // required
    $company_name = $_POST['company_name']; // not required
    $whitepaper = $_POST['whitepaper'];

    $send_email_to = "inquiries@realvalueit.com";

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
    $email_message .= "Whitepaper Requested: ".clean_string($whitepaper)."\n";

    $mail = new PHPMailer();

    $mail->AddAddress($send_email_to);

    $mail->From         = $email_from;
    $mail->FromName     = "Real Value IT";
    $mail->Subject      = $email_subject;
    $mail->Body         = $email_message;

    //public function AddAttachment($path, $name = '', $encoding = 'base64', $type = 'application/octet-stream') {
    //$mail->AddAttachment("/home3/realvalu/public_html/whitepapers/RealValueWhitePaper1.pdf", "Real Value White Paper", "base64", "application/pdf");
    $mail->Send();

    $email_message_to_prospect = "Thank you for your interest in Real Value IT's whitepapers. ";
    $email_message_to_prospect .= "We acknowledge the receipt of your request for the white paper titled ". "\"".$whitepaper."\"" .".";
    $email_message_to_prospect .= "A pdf copy of the white paper will be emailed to you."."\n\n";
    $email_message_to_prospect .= "Regards,"."\n";
    $email_message_to_prospect .= "Corporate Communications Division,"."\n";
    $email_message_to_prospect .= "Real Value IT LLC.";

    $mail_to_prospect = new PHPMailer();
    $mail_to_prospect->AddAddress($email_to);
    $mail_to_prospect->From = $email_from;
    $mail_to_prospect->FromName = "Real Value IT";
    $mail_to_prospect->Subject = "Real Value IT - white paper request acknowledgement";
    $mail_to_prospect->Body = $email_message_to_prospect;

    $mail_to_prospect->Send();
 

    returnSuccess();
    }
?>

