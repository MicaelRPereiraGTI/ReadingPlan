//CAPTURANDO ELEMENTOS
const btnLogar = document.getElementById("btn-logar");
const btnCadastrar = document.getElementById("btn-cadastrar");

//CRIANDO E SALVANDO USUÁRIO
document.querySelector("#btn-salvar").addEventListener("click", (event) => {
  event.preventDefault();

  let email = document.querySelector("#email-cadastrar").value;
  let senha = document.querySelector("#senha-cadastrar").value;
  let confirmaSenha = document.querySelector("#confirma-senha").value;

  if (email.length > 5 && validaEmail(email) == true) {
    if (senha === confirmaSenha) {
      salvar(email, senha);
      alert("Cadastro realizado com sucesso!");
    } else {
      alert("As senhas digitadas devem ser iguais!");
    }
  } else {
    alert("O E-mail digitado é inválido! \nExemplo: texto@texto.com");
  }
});

//VALIDANDO E-MAIL
function validaEmail(validaE) {
  let re = /\S+@\S+\.\S+/;
  return re.test(validaE);
}

function salvar(e, s) {
  let db = JSON.parse(localStorage.getItem("usuarios") || "[]");

  let usuario = {
    id: db.length + 1,
    login: e,
    senha: s,
  };

  if (usuario) db.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(db));
  location.href = "index.html";
}

//LOGANDO NO SISTEMA
document.querySelector("#btn-logar").addEventListener("click", (e) => {
  e.preventDefault();
  entrar();
});

function entrar() {
  let email = document.querySelector("#email-logar").value;
  let senha = document.querySelector("#senha-logar").value;

  /* let listaUser = '[]'; */

  let usuarioValido = {
    login: "",
    senha: "",
  };

  listaUser = JSON.parse(localStorage.getItem("usuarios") || "[]");

  listaUser.forEach((item) => {
    if (email === item.login && senha === item.senha) {
      usuarioValido = {
        id: item.id,
        login: item.login,
        senha: item.senha,
      };
    }
  });

  if (email === usuarioValido.login && senha === usuarioValido.senha) {
    alert("Bem-vindo so sitema Notes!");
    saveSession(usuarioValido.id);
    window.location.href = "home.html";
  } else {
    alert(
      "Algo deu errado, verifique o e-mail e a senha digitado \nOu clique em Criar conta!"
    );
  }
}

function saveSession(data) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logado", JSON.stringify(data));
}
