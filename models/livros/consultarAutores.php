<?php

include("../conexao.php");

header('Content-Type: application/json');

$livroId = $_GET['livroId'];

$sql = "SELECT a.nome FROM livros_autores AS la INNER JOIN autores AS a ON a.id = la.id_autor WHERE id_livro = $livroId";

$fetch = mysqli_query($conexao, $sql);

$rows = mysqli_fetch_all($fetch, MYSQLI_ASSOC);

foreach ($rows as $row) {
    $result[] = $row;
}

echo (json_encode($result));