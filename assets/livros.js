function saveUser() {
  var data = {
    titulo: document.getElementById("titulo").value,
    subtitulo: document.getElementById("subtitulo").value,
    volume: document.getElementById("volume").value,
    paginas: document.getElementById("paginas").value,
    isbn: document.getElementById("isbn").value,
    id_editora: document.getElementById("editoras").value,
  };

  var userId = document.getElementById("userId").value;

  if (userId) {
    data.userId = userId;

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
          document.getElementById("userId").value = "";
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
          $("#listaLivros>tbody").append("<tr>");

          $("#listaLivros>tbody").append("<td>" + element.id + "</td>");
          $("#listaLivros>tbody").append("<td>" + element.titulo + "</td>");
          $("#listaLivros>tbody").append("<td>" + element.subtitulo + "</td>");
          $("#listaLivros>tbody").append("<td>" + element.volume + "</td>");
          $("#listaLivros>tbody").append("<td>" + element.qtd_paginas + "</td>");
          $("#listaLivros>tbody").append("<td>" + element.isbn + "</td>");
          $("#listaLivros>tbody").append("<td>" + element.nome + "</td>");
          $("#listaLivros>tbody").append(
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
              "</div></td>"
          );
          $("#listaLivros>tbody").append("</tr>");
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function consultar(userId) {
  fetch(`../models/livros/consultarLivro.php?userId=${userId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalLivros");
        var modalLivros = bootstrap.Modal.getInstance(modalElement);
        modalLivros.show();

        document.getElementById("userId").value = data[0];
        document.getElementById("titulo").value = data[1];
        document.getElementById("subtitulo").value = data[2];
        document.getElementById("volume").value = data[3];
        document.getElementById("paginas").value = data[4];
        document.getElementById("isbn").value = data[5];
        document.getElementById("editoras").value = data[6];

        document.getElementById("userId").setAttribute("disabled", true);
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

function editar(userId) {
  fetch(`../models/livros/consultarLivro.php?userId=${userId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalLivros");
        var modalLivros = bootstrap.Modal.getInstance(modalElement);
        modalLivros.show();

        document.getElementById("userId").value = data[0];
        document.getElementById("titulo").value = data[1];
        document.getElementById("subtitulo").value = data[2];
        document.getElementById("volume").value = data[3];
        document.getElementById("paginas").value = data[4];
        document.getElementById("isbn").value = data[5];
        document.getElementById("editoras").value = data[6];

        document.getElementById("userId").disabled = false;
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

function excluir(userId) {
  var modalElementDelete = document.getElementById("modalExcluirLivro");
  var modalExcluirLivro = bootstrap.Modal.getInstance(modalElementDelete);
  modalExcluirLivro.show();

  document.getElementById("deleteUserId").value = userId;
}

function realDeleteLivro() {
  var deleteUserId = document.getElementById("deleteUserId").value;

  fetch(`../models/livros/excluirLivro.php?userId=${deleteUserId}`, {
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

window.onload = () => {
  // inicializa o modal escondido na tela
  $("#modalLivros").modal("hide");
  $("#modalExcluirLivro").modal("hide");
  populateEditoras();
  getLivros();
  clearModal()
};

function clearModal () {
  $('#modalLivros').on('show.bs.modal', function (e) {
    document.getElementById("userId").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("subtitulo").value = "";
    document.getElementById("volume").value = "";
    document.getElementById("paginas").value = "";
    document.getElementById("isbn").value = "";
    document.getElementById("editoras").value = "";

    document.getElementById("userId").disabled = false;
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


//<option value="1" label="Panini"></option>

//"<option value='" + element.id + "' label='" + element.nome + "'>"+ "</option>"