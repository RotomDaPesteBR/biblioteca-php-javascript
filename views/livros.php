<?php

include("header.php");
include("menu.php");
include("footer.php");

?>

<script type="text/javascript" src="../assets/livros.js"> </script>

<div class="container">

    <br>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalLivros">Adicionar</button>

    <div class="space"> </div>

    <div class="card">
        <div class="card-body">

            <table class="table table-striped table-hover" id="listaLivros">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Subtítulo</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Páginas</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Editora</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            
            <div class="modal fade" id="modalLivros" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitle">Adicionar Livro</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form>
                            <div class="modal-body">

                                <input type="hidden" id="userId" name="userId">

                                <div class="mb-3">
                                    <label for="titulo" class="form-label">Titulo</label>
                                    <input type="text" class="form-control" id="titulo" name="titulo" required>
                                </div>

                                <div class="mb-3">
                                    <label for="subtitulo" class="form-label">Subtitulo</label>
                                    <input type="text" class="form-control" id="subtitulo" name="subtitulo" required>
                                </div>

                                <div class="mb-3">
                                    <label for="volume" class="form-label">Volume</label>
                                    <input type="text" class="form-control" id="volume" name="volume" required>
                                </div>

                                <div class="mb-3">
                                    <label for="paginas" class="form-label">Páginas</label>
                                    <input type="text" class="form-control" id="paginas" name="paginas" required>
                                </div>

                                <div class="mb-3">
                                    <label for="isbn" class="form-label">ISBN</label>
                                    <input type="text" class="form-control" id="isbn" name="isbn" required>
                                </div>

                                <div class="mb-3">
                                    <label for="editoras" class="form-label">Editora</label>
                                    <div class="input-group">
                                        <select class="form-control editoras" id="editoras" name="editoras">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" class="btn btn-primary" id="btnSave" onclick="saveUser()">Salvar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="modalExcluirLivro" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Excluir Livro</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <input type="hidden" id="deleteUserId" name="deleteUserId">

                            <p>Tem certeza que deseja excluir este livro?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-danger" onclick="realDeleteLivro()">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>

<style type="text/css">
    .space {
        padding: 15px;
    }

    .table>tbody {
        vertical-align: baseline;
    }
</style>