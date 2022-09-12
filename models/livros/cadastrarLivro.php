<?php

include("../conexao.php");

header('Content-Type: application/json');

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);
$id_autores = $decoded["id_autores"];

$sql = "INSERT INTO livros"
    . " (titulo, subtitulo, volume, qtd_paginas, isbn, id_editora)"
    . " VALUES ('{$decoded["titulo"]}', '{$decoded["subtitulo"]}', '{$decoded["volume"]}', '{$decoded["paginas"]}', '{$decoded["isbn"]}', '{$decoded["id_editora"]}');"
    . " SET @idlivro = @@IDENTITY;"
    . " INSERT INTO livros_autores"
    . " (id_livro, id_autor)"
    . " VALUES ";

foreach ($id_autores as $id_autor) {
    $sql = $sql . "(@idlivro, '{$id_autor}'),";
}

$sql = substr_replace($sql ,"", -1) . ";";

$row = mysqli_multi_query($conexao, $sql);

if ($row) {
    echo "ok";
} else {
    $erro = mysqli_error($conexao);
    echo $erro;
}