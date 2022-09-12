<?php

include("../conexao.php");

header('Content-Type: application/json');

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$sql = "SELECT e.id, l.titulo, l.volume, u.nome, e.data_retirada, e.data_devolucao FROM emprestimos AS e INNER JOIN livros AS l ON l.id = e.id_livro INNER JOIN usuarios AS u ON u.id = e.id_usuario WHERE e.data_devolucao IS NULL ORDER BY e.id";

$fetch = mysqli_query($conexao, $sql);

$rows = mysqli_fetch_all($fetch, MYSQLI_ASSOC);

foreach ($rows as $row) {
    $result[] = $row;
}

echo (json_encode($result));