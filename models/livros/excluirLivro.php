<?php

include("../conexao.php");

$livroId = $_GET['livroId'];

$sql = "DELETE from livros WHERE id='{$livroId}' ";

$row = mysqli_query($conexao, $sql);

$erro = mysqli_error($conexao);

