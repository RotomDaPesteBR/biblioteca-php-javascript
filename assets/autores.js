function saveUser() {
  var data = {
    nome: document.getElementById("nome").value,
    dataNasc: document.getElementById("dataNasc").value,
  };

  var userId = document.getElementById("userId").value;

  if (userId) {
    data.userId = userId;

    fetch("../models/autores/editarAutor.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((data) => {
        if (data.status === 200) {
          var modalElement = document.getElementById("modalAutores");
          var modalAutores = bootstrap.Modal.getInstance(modalElement);
          modalAutores.hide();

          var modalSuccess = new bootstrap.Modal(
            document.getElementById("modalSuccess")
          );
          modalSuccess.show();
          document.getElementById("userId").value = "";
          getAutores();
        }
      })
      .catch((err) => console.log(err));
  } else {
    fetch("../models/autores/cadastrarAutor.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((data) => {
        if (data.status === 200) {
          var modalElement = document.getElementById("modalAutores");
          var modalAutores = bootstrap.Modal.getInstance(modalElement);
          modalAutores.hide();

          var modalSuccess = new bootstrap.Modal(
            document.getElementById("modalSuccess")
          );
          modalSuccess.show();

          getAutores();
        }
      })
      .catch((err) => console.log(err));
  }
}

function getAutores() {
  fetch("../models/autores/listarAutores.php")
    .then(function (response) {
      response.json().then(function (data) {
        $("#listaAutores>tbody").html("");

        data.forEach((element) => {
          $("#listaAutores>tbody").append("<tr>");

          $("#listaAutores>tbody").append("<td>" + element.id + "</td>");
          $("#listaAutores>tbody").append("<td>" + element.nome + "</td>");
          $("#listaAutores>tbody").append(
            "<td>" + element.data_nascimento + "</td>"
          );
          $("#listaAutores>tbody").append(
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
          $("#listaAutores>tbody").append("</tr>");
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function consultar(userId) {
  fetch(`../models/autores/consultarAutor.php?userId=${userId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalAutores");
        var modalAutores = bootstrap.Modal.getInstance(modalElement);
        modalAutores.show();

        document.getElementById("userId").value = data[0];
        document.getElementById("nome").value = data[1];
        document.getElementById("dataNasc").value = data[2];

        document.getElementById("nome").setAttribute("disabled", true);
        document.getElementById("dataNasc").setAttribute("disabled", true);
        document.getElementById("btnSave").setAttribute("disabled", true);

        document.getElementById("modalTitle").textContent = "Consultar Autor";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function editar(userId) {
  fetch(`../models/autores/consultarAutor.php?userId=${userId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalAutores");
        var modalAutores = bootstrap.Modal.getInstance(modalElement);
        modalAutores.show();

        document.getElementById("userId").value = data[0];
        document.getElementById("nome").value = data[1];
        document.getElementById("dataNasc").value = data[2];

        document.getElementById("nome").disabled = false;
        document.getElementById("dataNasc").disabled = false;
        document.getElementById("btnSave").disabled = false;

        document.getElementById("modalTitle").textContent = "Editar Autor";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function excluir(userId) {
  var modalElementDelete = document.getElementById("modalExcluirAutor");
  var modalExcluirAutor = bootstrap.Modal.getInstance(modalElementDelete);
  modalExcluirAutor.show();

  document.getElementById("deleteUserId").value = userId;
}

function realDeleteAutor() {
  var deleteUserId = document.getElementById("deleteUserId").value;

  fetch(`../models/autores/excluirAutor.php?userId=${deleteUserId}`, {
    method: "DELETE",
  })
    .then(function (response) {
      $("#modalExcluirAutor").modal("hide");

      var modalSuccess = new bootstrap.Modal(
        document.getElementById("modalSuccess")
      );
      modalSuccess.show();

      getAutores();
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

window.onload = () => {
  // inicializa o modal escondido na tela
  $("#modalAutores").modal("hide");
  $("#modalExcluirAutor").modal("hide");
  getAutores();
  clearModal()
};

function clearModal () {
  $('#modalAutores').on('show.bs.modal', function (e) {
    document.getElementById("userId").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("dataNasc").value = "";

    document.getElementById("userId").disabled = false;
    document.getElementById("nome").disabled = false;
    document.getElementById("dataNasc").disabled = false;
    document.getElementById("btnSave").disabled = false;

    document.getElementById("modalTitle").textContent = "Adicionar Autor";
  })
}
