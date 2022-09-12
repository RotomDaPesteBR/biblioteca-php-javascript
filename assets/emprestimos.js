function saveEmprestimo() {
  var data = {
    titulo: document.getElementById("titulo").value,
    subtitulo: document.getElementById("subtitulo").value,
    volume: document.getElementById("volume").value,
    paginas: document.getElementById("paginas").value,
    isbn: document.getElementById("isbn").value,
    id_editora: document.getElementById("editoras").value,
  };

  var emprestimoId = document.getElementById("emprestimoId").value;

  if (emprestimoId) {
    data.emprestimoId = emprestimoId;

    fetch("../models/emprestimos/editarEmprestimo.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((data) => {
        if (data.status === 200) {
          var modalElement = document.getElementById("modalEmprestimos");
          var modalEmprestimos = bootstrap.Modal.getInstance(modalElement);
          modalEmprestimos.hide();

          var modalSuccess = new bootstrap.Modal(
            document.getElementById("modalSuccess")
          );
          modalSuccess.show();
          document.getElementById("emprestimoId").value = "";
          getEmprestimos();
        }
      })
      .catch((err) => console.log(err));
  } else {
    fetch("../models/emprestimos/cadastrarEmprestimo.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((data) => {
        if (data.status === 200) {
          var modalElement = document.getElementById("modalEmprestimos");
          var modalEmprestimos = bootstrap.Modal.getInstance(modalElement);
          modalEmprestimos.hide();

          var modalSuccess = new bootstrap.Modal(
            document.getElementById("modalSuccess")
          );
          modalSuccess.show();

          getEmprestimos();
        }
      })
      .catch((err) => console.log(err));
  }
}

function getEmprestimos() {
  fetch("../models/emprestimos/listarEmprestimos.php")
    .then(function (response) {
      response.json().then(function (data) {
        $("#listaEmprestimos>tbody").html("");

        data.forEach((element) => {
          regex = new RegExp(/([0-9]{2}).+([0-9]{2}).+([0-9]{4})/);
          dataRegex = regex.exec(element.data_retirada);
          dataFormatada = dataRegex[3] + "-" + dataRegex[2] + "-" + dataRegex[1]
          let date = new Date();
	        let dataAtual = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()
          let diferencaMS = new Date(dataAtual) - new Date(dataFormatada)
          let diferencaDias = diferencaMS / (1000 * 60 * 60 * 24);

          let valido = "";

          if (diferencaDias > 7){
              valido = "vencido";
          }

          let row = "<tr class="+ valido +">" + 
                        "<td>" + element.titulo + " Vol. " + element.volume + "</td>" +
                        "<td>" + element.nome + "</td>" +
                        "<td>" + element.data_retirada + "</td>" +
                        "<td>" + 
                            "<div class='btn-group' role='group'>" +
                                "<a type='button' class='btn btn-outline-primary btn"+ valido +"' onclick='devolver(" + element.id + ")'>Devolver</a>" +
                            "</div>" + 
                        "</td>" +
                    "</tr>"

          $("#listaEmprestimos>tbody").append(row);
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function consultar(emprestimoId) {
  fetch(`../models/emprestimos/consultarEmprestimo.php?emprestimoId=${emprestimoId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalEmprestimos");
        var modalEmprestimos = bootstrap.Modal.getInstance(modalElement);
        modalEmprestimos.show();

        document.getElementById("emprestimoId").value = data[0];
        document.getElementById("titulo").value = data[1];
        document.getElementById("subtitulo").value = data[2];
        document.getElementById("volume").value = data[3];
        document.getElementById("paginas").value = data[4];
        document.getElementById("isbn").value = data[5];
        document.getElementById("editoras").value = data[6];

        document.getElementById("emprestimoId").setAttribute("disabled", true);
        document.getElementById("titulo").setAttribute("disabled", true);
        document.getElementById("subtitulo").setAttribute("disabled", true);
        document.getElementById("volume").setAttribute("disabled", true);
        document.getElementById("paginas").setAttribute("disabled", true);
        document.getElementById("isbn").setAttribute("disabled", true);
        document.getElementById("editoras").setAttribute("disabled", true);
        document.getElementById("btnSave").setAttribute("disabled", true);

        document.getElementById("modalTitle").textContent = "Consultar Emprestimo";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function editar(emprestimoId) {
  fetch(`../models/emprestimos/consultarEmprestimo.php?emprestimoId=${emprestimoId}`)
    .then(function (response) {
      response.json().then(function (data) {
        var modalElement = document.getElementById("modalEmprestimos");
        var modalEmprestimos = bootstrap.Modal.getInstance(modalElement);
        modalEmprestimos.show();

        document.getElementById("emprestimoId").value = data[0];
        document.getElementById("titulo").value = data[1];
        document.getElementById("subtitulo").value = data[2];
        document.getElementById("volume").value = data[3];
        document.getElementById("paginas").value = data[4];
        document.getElementById("isbn").value = data[5];
        document.getElementById("editoras").value = data[6];

        document.getElementById("emprestimoId").disabled = false;
        document.getElementById("titulo").disabled = false;
        document.getElementById("subtitulo").disabled = false;
        document.getElementById("volume").disabled = false;
        document.getElementById("paginas").disabled = false;
        document.getElementById("isbn").disabled = false;
        document.getElementById("editoras").disabled = false;
        document.getElementById("btnSave").disabled = false;

        document.getElementById("modalTitle").textContent = "Editar Emprestimo";
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function devolver(emprestimoId) {
  var modalElement = document.getElementById("modalDevolverEmprestimo");
  var modalDevolverEmprestimo = bootstrap.Modal.getInstance(modalElement);
  modalDevolverEmprestimo.show();

  document.getElementById("devolverEmprestimoId").value = emprestimoId;
}

function devolverEmprestimo() {
  var data = {
    data_devolucao: document.getElementById("datadevolucao").value,
    devolverEmprestimoId: document.getElementById("devolverEmprestimoId").value,
  };

  fetch("../models/emprestimos/devolverEmprestimo.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((data) => {
      if (data.status === 200) {
        var modalElement = document.getElementById("modalDevolverEmprestimo");
        var modalEmprestimos = bootstrap.Modal.getInstance(modalElement);
        modalEmprestimos.hide();
        document.getElementById("devolverEmprestimoId").value = "";
        getEmprestimos();
      }
    })
    .catch((err) => console.log(err));
}

function populateUsuarios() {
  fetch("../models/emprestimos/populateUsuarios.php")
    .then(function (response) {
      response.json().then(function (data) {
        $("#usuarios>tbody").html("");
        data.forEach((element) => {
          option = document.createElement("option");
          option.value = element.id;
          option.label = element.nome;
          usuarios = document.getElementById("usuarios");
          usuarios.append(option);
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

function populateLivros() {
  fetch("../models/emprestimos/populateLivros.php")
    .then(function (response) {
      response.json().then(function (data) {
        $("#livros>tbody").html("");
        data.forEach((element) => {
          option = document.createElement("option");
          option.value = element.id;
          option.label = element.titulo + " Vol. " + element.volume;
          livros = document.getElementById("livros");
          livros.append(option);
        });
      });
    })
    .catch(function (err) {
      console.error("Erro", err);
    });
}

window.onload = () => {
  // inicializa o modal escondido na tela
  $("#modalEmprestimos").modal("hide");
  $("#modalDevolverEmprestimo").modal("hide");
  populateUsuarios();
  populateLivros();
  getEmprestimos();
  clearModal()
};

function clearModal () {
  $('#modalEmprestimos').on('show.bs.modal', function (e) {
    document.getElementById("emprestimoId").value = "";
    document.getElementById("usuarios").value = "";
    document.getElementById("livros").value = "";
    document.getElementById("data_retirada").value = "";
    document.getElementById("data_devolucao").value = "";

    document.getElementById("emprestimoId").disabled = false;
    document.getElementById("usuarios").disabled = false;
    document.getElementById("livros").disabled = false;
    document.getElementById("data_retirada").disabled = false;
    document.getElementById("data_devolucao").disabled = false;
    document.getElementById("btnSave").disabled = false;

    document.getElementById("modalTitle").textContent = "Emprestar";
  })
}


//<option value="1" label="Panini"></option>

//"<option value='" + element.id + "' label='" + element.nome + "'>"+ "</option>"