function saveUser() {
  var data = {
    titulo: document.getElementById("titulo").value,
    subtitulo: document.getElementById("subtitulo").value,
    volume: document.getElementById("volume").value,
    paginas: document.getElementById("paginas").value,
    isbn: document.getElementById("isbn").value,
    id_editora: document.getElementById("editoras").value,
    id_autores: [],
  };

  data.id_autores.push($("#autores :selected").map(
    function(i, el) {
      return $(el).val();
    }).get()
  );

  var livroId = document.getElementById("livroId").value;

  if (livroId) {
    data.livroId = livroId;

    fetch("../models/livros/editarLivro.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((data) => {
        if (data.status === 200) {
          var modalElement = document.getElementById("modalLivros");
          var modalLivros = bootstrap.Modal.getInstance(modalElement);
          modalLivros.hide();

          var modalSuccess = new bootstrap.Modal(
            document.getElementById("modalSuccess")
          );
          modalSuccess.show();
          document.getElementById("livroId").value = "";
          getLivros();
        }
      })
      .catch((err) => console.log(err));
  } else {
    fetch("../models/livros/cadastrarLivro.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((data) => {
        if (data.status === 200) {
          var modalElement = document.getElementById("modalLivros");
          var modalLivros = bootstrap.Modal.getInstance(modalElement);
          modalLivros.hide();

          var modalSuccess = new bootstrap.Modal(
            document.getElementById("modalSuccess")
          );
          modalSuccess.show();

          getLivros();
        }
      })
      .catch((err) => console.log(err));
  }
}

function getLivros() {
  fetch("../models/livros/listarLivros.php")
    .then(function (response) {
      response.json().then(function (data) {
        $("#listaLivros>tbody").html("");

        data.forEach((element) => {
          let row = "<tr>" + "<td>" + element.id + "</td>" +
          "<td>" + element.titulo + "</td>" +
          "<td>" + element.subtitulo + "</td>" +
          "<td>" + element.volume + "</td>" +
          "<td>" + element.qtd_paginas + "</td>" +
          "<td>" + element.isbn + "</td>" +
          "<td>" + element.nome + "</td>" +
          "<td><div class='btn-group' role='group'>" +
          "<a type='button' class='btn btn-outline-primary' onclick='consultarAutores(" + element.id + ")'>Autores</a>" +
          "</div></td>" + 
          "<td><div class='btn-group' role='group'>" +
          "<a type='button' class='btn btn-outline-primary' onclick='consultar(" +
          element.id +
          ")'>Consultar</a>" +
          "<a type='button' class='btn btn-outline-primary' onclick='editar(" +
          element.id +
          ")'>Editar</a>" +
          "<a type='button' class='btn btn-outline-danger' onclick='excluir(" +
          element.id +
          ")'>Excluir</a>" +
          "</div></td>" +
          "</tr>";

          $("#listaLivros>tbody").append(row);
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function consultar(livroId) {
  fetch(`../models/livros/consultarLivro.php?livroId=${livroId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalLivros");
        var modalLivros = bootstrap.Modal.getInstance(modalElement);
        modalLivros.show();

        document.getElementById("livroId").value = data[0];
        document.getElementById("titulo").value = data[1];
        document.getElementById("subtitulo").value = data[2];
        document.getElementById("volume").value = data[3];
        document.getElementById("paginas").value = data[4];
        document.getElementById("isbn").value = data[5];
        document.getElementById("editoras").value = data[6];

        document.getElementById("livroId").setAttribute("disabled", true);
        document.getElementById("titulo").setAttribute("disabled", true);
        document.getElementById("subtitulo").setAttribute("disabled", true);
        document.getElementById("volume").setAttribute("disabled", true);
        document.getElementById("paginas").setAttribute("disabled", true);
        document.getElementById("isbn").setAttribute("disabled", true);
        document.getElementById("editoras").setAttribute("disabled", true);
        document.getElementById("btnSave").setAttribute("disabled", true);

        document.getElementById("modalTitle").textContent = "Consultar Livro";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function editar(livroId) {
  fetch(`../models/livros/consultarLivro.php?livroId=${livroId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalLivros");
        var modalLivros = bootstrap.Modal.getInstance(modalElement);
        modalLivros.show();

        document.getElementById("livroId").value = data[0];
        document.getElementById("titulo").value = data[1];
        document.getElementById("subtitulo").value = data[2];
        document.getElementById("volume").value = data[3];
        document.getElementById("paginas").value = data[4];
        document.getElementById("isbn").value = data[5];
        document.getElementById("editoras").value = data[6];

        document.getElementById("livroId").disabled = false;
        document.getElementById("titulo").disabled = false;
        document.getElementById("subtitulo").disabled = false;
        document.getElementById("volume").disabled = false;
        document.getElementById("paginas").disabled = false;
        document.getElementById("isbn").disabled = false;
        document.getElementById("editoras").disabled = false;
        document.getElementById("btnSave").disabled = false;

        document.getElementById("modalTitle").textContent = "Editar Livro";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function excluir(livroId) {
  var modalElementDelete = document.getElementById("modalExcluirLivro");
  var modalExcluirLivro = bootstrap.Modal.getInstance(modalElementDelete);
  modalExcluirLivro.show();

  document.getElementById("deleteLivroId").value = livroId;
}

function realDeleteLivro() {
  var deleteLivroId = document.getElementById("deleteLivroId").value;

  fetch(`../models/livros/excluirLivro.php?livroId=${deleteLivroId}`, {
    method: "DELETE",
  })
    .then(function (response) {
      $("#modalExcluirLivro").modal("hide");

      var modalSuccess = new bootstrap.Modal(
        document.getElementById("modalSuccess")
      );
      modalSuccess.show();

      getLivros();
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function populateEditoras() {
  fetch("../models/livros/populateEditoras.php")
    .then(function (response) {
      response.json().then(function (data) {
        $("#editoras>tbody").html("");
        data.forEach((element) => {
          option = document.createElement("option");
          option.value = element.id;
          option.label = element.nome;
          editoras = document.getElementById("editoras");
          editoras.append(option);
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function populateAutores() {
  fetch("../models/livros/populateAutores.php")
    .then(function (response) {
      response.json().then(function (data) {
        $("#autores>tbody").html("");
        data.forEach((element) => {
          option = document.createElement("option");
          option.value = element.id;
          option.label = element.nome;
          autores = document.getElementById("autores");
          autores.append(option);
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function consultarAutores(livroId){
  var modalElementAutores = document.getElementById("modalAutores");
  var modalAutores = bootstrap.Modal.getInstance(modalElementAutores);
  
  fetch(`../models/livros/consultarAutores.php?livroId=${livroId}`)
    .then(function (response) {
      response.json().then(function (data) {
        $("#listaAutores>tbody").html("");
        data.forEach((element) => {
          $("#listaAutores>tbody").append("<tr><td>" + element.nome + "</td></tr>");
          modalAutores.show();
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

window.onload = () => {
  // inicializa o modal escondido na tela
  $("#modalLivros").modal("hide");
  $("#modalAutores").modal("hide");
  $("#modalExcluirLivro").modal("hide");
  populateEditoras();
  populateAutores();
  getLivros();
  clearModal()
};

function clearModal () {
  $('#modalLivros').on('show.bs.modal', function (e) {
    document.getElementById("livroId").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("subtitulo").value = "";
    document.getElementById("volume").value = "";
    document.getElementById("paginas").value = "";
    document.getElementById("isbn").value = "";
    document.getElementById("editoras").value = "";

    document.getElementById("livroId").disabled = false;
    document.getElementById("titulo").disabled = false;
    document.getElementById("subtitulo").disabled = false;
    document.getElementById("volume").disabled = false;
    document.getElementById("paginas").disabled = false;
    document.getElementById("isbn").disabled = false;
    document.getElementById("editoras").disabled = false;
    document.getElementById("btnSave").disabled = false;

    document.getElementById("modalTitle").textContent = "Adicionar Livro";
  })
}