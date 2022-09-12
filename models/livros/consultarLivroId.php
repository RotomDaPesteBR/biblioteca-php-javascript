<?php

include("../conexao.php");

header('Content-Type: application/json');

$isbn = $_GET['isbn'];

$sql = "SELECT id from livros where isbn = '$isbn'";

$fetch = mysqli_query($conexao, $sql);

$row = mysqli_fetch_row($fetch);

echo (json_encode($row));