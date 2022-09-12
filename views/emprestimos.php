<?php

include("header.php");
include("menu.php");
include("footer.php");

?>


<div class="container">

    <br>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEmprestimos">Emprestar</button>

    <div class="space"> </div>

    <div class="card">
        <div class="card-body">

            <table class="table table-hover" id="listaEmprestimos">
                <thead>
                    <tr>
                        <th scope="col">Livro</th>
                        <th scope="col">Usuário</th>
                        <th scope="col">Data Retirada</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            
            <div class="modal fade" id="modalEmprestimos" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitle">Emprestar Livro</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form>
                            <div class="modal-body">

                                <input type="hidden" id="emprestimoId" name="emprestimoId">

                                <div class="mb-3">
                                    <label for="usuarios" class="form-label">Usuario</label>
                                    <div class="input-group">
                                        <select class="form-control dropdown" id="usuarios" name="usuarios">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="livros" class="form-label">Livro</label>
                                    <div class="input-group">
                                        <select class="form-control dropdown" id="livros" name="livros">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="data_retirada" class="form-label">Data Retirada</label>
                                    <input type="text" class="form-control" id="data_retirada" name="data_retirada" required>
                                </div>

                                <div class="mb-3">
                                    <label for="data_devolucao" class="form-label">Data Devolução</label>
                                    <input type="text" class="form-control" id="data_devolucao" name="data_devolucao" required>
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

            <div class="modal fade" id="modalDevolverEmprestimo" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Devolver Livro</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <input type="hidden" id="devolverEmprestimoId" name="devolverEmprestimoId">

                            <div class="mb-3">
                                <label for="datadevolucao" class="form-label">Data Devolução</label>
                                <input type="text" class="form-control" id="datadevolucao" name="datadevolucao" required>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-danger" onclick="devolverEmprestimo()">Devolver</button>
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

<script type="text/javascript" src="../assets/emprestimos.js"> </script>