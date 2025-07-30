<?php
session_start();
ob_start();

$agora = time();
if (isset($_SESSION['ultimo_envio']) && ($agora - $_SESSION['ultimo_envio']) < 5) {
    http_response_code(204);
    exit;
}
$_SESSION['ultimo_envio'] = $agora;

require_once("vendor/PHPMailer/PHPMailer.php");
require_once("vendor/PHPMailer/SMTP.php");

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer();

$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Host = "smtp.gmail.com";
$mail->Port = 465;
$mail->Username = "lymoriastudio@gmail.com";
$mail->Password = ""; // Colocar senha de app gerada do gmail
$mail->IsHTML(true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');
    ob_clean();

    $nome      = $_POST['nome'] ?? '';
    $sobrenome = $_POST['sobrenome'] ?? '';
    $email     = $_POST['email'] ?? '';
    $empresa   = $_POST['empresa'] ?? '';
    $cidade    = $_POST['cidade'] ?? '';
    $estado    = $_POST['estado'] ?? '';
    $telefone  = $_POST['telefone'] ?? '';
    $mensagem  = $_POST['mensagem'] ?? '';

    $corpo = "
        <strong>Mensagem:</strong><br> {$mensagem} <br><br>
        <hr style='border: none; border-top: 1px solid #ccc; margin: 20px 0;'>
        <strong>Nome:</strong> {$nome} {$sobrenome} <br>
        <strong>Email:</strong> {$email} <br>
        <strong>Telefone:</strong> {$telefone} <br>
        <strong>Empresa:</strong> {$empresa} <br>
        <strong>Cidade:</strong> {$cidade} <br>
        <strong>Estado:</strong> {$estado}
    ";

    $mensagem_resumo = mb_substr(trim($mensagem), 0, 7) . '...';

    $mail->SetFrom("lymoriastudio@gmail.com", "Contato do Site");
    $mail->addReplyTo($email, "$nome $sobrenome");
    $mail->Subject = "$nome $sobrenome - $mensagem_resumo";
    $mail->Body = $corpo;
    $mail->AddAddress("lymoriastudio@gmail.com");

    if (!$mail->Send()) {
        echo json_encode([
            'success' => false,
            'message' => "Erro ao enviar: " . $mail->ErrorInfo
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'message' => "Mensagem enviada com sucesso!"
        ]);
    }
    exit;
} else {
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => "Requisição inválida."
    ]);
    exit;
}
