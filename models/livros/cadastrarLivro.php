<?php

include("../conexao.php");

header('Content-Type: application/json');

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$sql = "insert into livros"
    . " (titulo, subtitulo, volume, qtd_paginas, isbn, id_editora)"
    . " VALUES ('{$decoded["titulo"]}', '{$decoded["subtitulo"]}', '{$decoded["volume"]}', '{$decoded["paginas"]}', '{$decoded["isbn"]}', '{$decoded["id_editora"]}')";

$row = mysqli_query($conexao, $sql);

if ($row) {
    echo "ok";
} else {
    $erro = mysqli_error($conexao);
    echo $erro;
}