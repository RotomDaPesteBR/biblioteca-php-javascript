<?php

include("../conexao.php");

header('Content-Type: application/json');

$livroId = $_GET['livroId'];

$sql = "SELECT * from livros where id = $livroId";

$fetch = mysqli_query($conexao, $sql);

$row = mysqli_fetch_row($fetch);

echo (json_encode($row));