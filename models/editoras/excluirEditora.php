<?php

include("../conexao.php");

$userId = $_GET['userId'];

$sql = "DELETE from editoras WHERE id='{$userId}' ";

$row = mysqli_query($conexao, $sql);

$erro = mysqli_error($conexao);

