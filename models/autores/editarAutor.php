<?php

include("../conexao.php");

header('Content-Type: application/json');

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$sql = "UPDATE autores SET"
    . " nome = '{$decoded["nome"]}', "
    . " data_nascimento = '{$decoded["dataNasc"]}' "
    . " WHERE id = '{$decoded["userId"]}'";

$row = mysqli_query($conexao, $sql);

if ($row) {
    echo "ok";
} else {
    $erro = mysqli_error($conexao);
    echo $erro;
}
