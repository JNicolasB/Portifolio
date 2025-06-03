<?php
// Configurações do banco de dados
$host = 'localhost';
$nome = 'root';
$avaliacao = '';
$comentario = '';
$banco = 'sugestões-clientes';

// Conexão com o banco de dados
$conn = new mysqli($host, $nome, $avaliacao, $comentario, $banco);

// Verifica se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Verifica se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Captura os dados do formulário
    $nome = $conn->real_escape_string($_POST['nome']);
    $avaliacao = $conn->real_escape_string($_POST['avaliacao']);
    $comentario = $conn->real_escape_string($_POST['comentario']);

    // Insere os dados na tabela
    $sql = "INSERT INTO `comentários` (`id`, `nome`, `comentario`, `avaliacao`) VALUES (NULL, '$nome', '$comentario', '$avaliacao');";
    if ($conn->query($sql) === TRUE) {
        echo "Avaliação enviada com sucesso!";
    } else {
        echo "Erro ao enviar a avaliação: " . $conn->error;
    }
}

// Fecha a conexão com o banco
$conn->close();
?>