<?php

include("../conexao.php");

header('Content-Type: application/json');

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$sql = "SELECT l.id, l.titulo, l.subtitulo, l.volume, l.qtd_paginas, l.isbn, e.nome FROM livros AS l INNER JOIN editoras AS e ON e.id = l.id_editora ORDER BY l.id"; 

$fetch = mysqli_query($conexao, $sql);

$rows = mysqli_fetch_all($fetch, MYSQLI_ASSOC);

foreach ($rows as $row) {
    $result[] = $row;
}

echo (json_encode($result));