function saveUser() {
  var data = {
    nome: document.getElementById("nome").value,
    endereco: document.getElementById("endereco").value
  };

  var userId = document.getElementById("userId").value;

  if (userId) {
    data.userId = userId;

    fetch("../models/editoras/editarEditora.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((data) => {
        if (data.status === 200) {
          var modalElement = document.getElementById("modalEditoras");
          var modalEditoras = bootstrap.Modal.getInstance(modalElement);
          modalEditoras.hide();

          var modalSuccess = new bootstrap.Modal(
            document.getElementById("modalSuccess")
          );
          modalSuccess.show();
          document.getElementById("userId").value = "";
          getEditoras();
        }
      })
      .catch((err) => console.log(err));
  } else {
    fetch("../models/editoras/cadastrarEditora.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((data) => {
        if (data.status === 200) {
          var modalElement = document.getElementById("modalEditoras");
          var modalEditoras = bootstrap.Modal.getInstance(modalElement);
          modalEditoras.hide();

          var modalSuccess = new bootstrap.Modal(
            document.getElementById("modalSuccess")
          );
          modalSuccess.show();

          getEditoras();
        }
      })
      .catch((err) => console.log(err));
  }
}

function getEditoras() {
  fetch("../models/editoras/listarEditoras.php")
    .then(function (response) {
      response.json().then(function (data) {
        $("#listaEditoras>tbody").html("");

        data.forEach((element) => {
          $("#listaEditoras>tbody").append("<tr>");

          $("#listaEditoras>tbody").append("<td>" + element.id + "</td>");
          $("#listaEditoras>tbody").append("<td>" + element.nome + "</td>");
          $("#listaEditoras>tbody").append("<td>" + element.endereco + "</td>");
          $("#listaEditoras>tbody").append(
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
          $("#listaEditoras>tbody").append("</tr>");
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function consultar(userId) {
  fetch(`../models/editoras/consultarEditora.php?userId=${userId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalEditoras");
        var modalEditoras = bootstrap.Modal.getInstance(modalElement);
        modalEditoras.show();

        document.getElementById("userId").value = data[0];
        document.getElementById("nome").value = data[1];
        document.getElementById("endereco").value = data[2];

        document.getElementById("nome").setAttribute("disabled", true);
        document.getElementById("endereco").setAttribute("disabled", true);
        document.getElementById("btnSave").setAttribute("disabled", true);

        document.getElementById("modalTitle").textContent = "Consultar Editora";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function editar(userId) {
  fetch(`../models/editoras/consultarEditora.php?userId=${userId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalEditoras");
        var modalEditoras = bootstrap.Modal.getInstance(modalElement);
        modalEditoras.show();

        document.getElementById("userId").value = data[0];
        document.getElementById("nome").value = data[1];
        document.getElementById("endereco").value = data[2];

        document.getElementById("nome").disabled = false;
        document.getElementById("endereco").disabled = false;
        document.getElementById("btnSave").disabled = false;

        document.getElementById("modalTitle").textContent = "Editar Editora";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function excluir(userId) {
  var modalElementDelete = document.getElementById("modalExcluirEditora");
  var modalExcluirEditora = bootstrap.Modal.getInstance(modalElementDelete);
  modalExcluirEditora.show();

  document.getElementById("deleteUserId").value = userId;
}

function realDeleteEditora() {
  var deleteUserId = document.getElementById("deleteUserId").value;

  fetch(`../models/editoras/excluirEditora.php?userId=${deleteUserId}`, {
    method: "DELETE",
  })
    .then(function (response) {
      $("#modalExcluirEditora").modal("hide");

      var modalSuccess = new bootstrap.Modal(
        document.getElementById("modalSuccess")
      );
      modalSuccess.show();

      getEditoras();
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

window.onload = () => {
  // inicializa o modal escondido na tela
  $("#modalEditoras").modal("hide");
  $("#modalExcluirEditora").modal("hide");
  getEditoras();
  clearModal()
};

function clearModal () {
  $('#modalEditoras').on('show.bs.modal', function (e) {
    document.getElementById("userId").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("endereco").value = "";

    document.getElementById("userId").disabled = false;
    document.getElementById("nome").disabled = false;
    document.getElementById("endereco").disabled = false;
    document.getElementById("btnSave").disabled = false;

    document.getElementById("modalTitle").textContent = "Adicionar Editora";
  })
}
