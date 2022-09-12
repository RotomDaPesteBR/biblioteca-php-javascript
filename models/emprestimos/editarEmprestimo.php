<?php

include("../conexao.php");

header('Content-Type: application/json');

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$sql = "UPDATE livros SET"
    . " titulo = '{$decoded["titulo"]}', "
    . " subtitulo = '{$decoded["subtitulo"]}', "
    . " volume = '{$decoded["volume"]}', "
    . " qtd_paginas = '{$decoded["paginas"]}', "
    . " isbn = '{$decoded["isbn"]}', "
    . " id_editora = '{$decoded["id_editora"]}' "
    . " WHERE id = '{$decoded["userId"]}'";

$row = mysqli_query($conexao, $sql);

if ($row) {
    echo "ok";
} else {
    $erro = mysqli_error($conexao);
    echo $erro;
}
