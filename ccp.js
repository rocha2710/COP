//GLOBAIS
var mats = ['01785188', '00000000'];
var user;
var logado = 0;
function init () {
    //login
    login();
    //montar croqui
    //habilitar funções
}init();

function login () {
    //adicionando a div de dialog
    $(".croqui").append("<div id='dialog-login' title='Faça o Login'><form><label for='mat'>Digite sua Matrícula</label><input type='text' size=30 name='mat' id='mat'/></form></div>");
    $("#mat").on("onmouseout", function() {
       /// var matValor = $("#mat").value();
      //  alert(matValor);
        
    });
    //verificando se não está logado
    if (logado == 0) {
    //modal bloqueando a tela com form de login
        $( "#dialog-login" ).dialog({
        modal: true,
        buttons: {
            Entrar: function() {
                let matriculas = mats.slice();
                var pos = mats.indexOf($("#mat").value);
                alert("user "+pos);
                if(pos =="-1") {
                    alert("usuário não encontrado");
                } else{
                logado = 1;
                    alert(pos);
                $( this ).dialog( "close" );
                }
            },
            Cadastro: function () {
                logado = 0;
                alert("Entre em contato com o administrador do sistema para cadastrar-se.");
            }
        }
    });
    alert("Usuário não está logado");
    } else {
    alert("você está logado como "+user);
    }
}
function logout() {
    
}

//FUNÇÃO PARA EXIBIR DETALHES DA LINHA
function addDoubt(nLinha, metragem) {
    var linha = nLinha;
    m = metragem;
    var lPos = $('#'+linha).position();
    var x = lPos.left;
    var y = lPos.top;
    alert(x);
    //if(p==0) {
     //   y-=30;
      // alert(x);
   // } else {
     //   y+=30;
   // }
    $(".croqui").append(
        "<div id='doubt-"+linha+"' class='doubt'><div class='db'>?</div><div class='vma' contenteditable='true'>30km</div><div class='lsize'>"+m+"m</div></div>"
    );
    $("#doubt-"+linha).css({top:y, left:x});
    
    $("#doubt-"+linha).on("click", function() {
        $(".lsize").toggle();
        $(".vma").toggle();
        if($(".doubt").css("width")=="10px") {
        $(".doubt").css("width", "80px");    
        } else {
        $(".doubt").css("width", "10px");
        }
    });
}

addDoubt('L032', 1);
addDoubt('L029', 2);
addDoubt('L030', 3);
addDoubt('L01A-TG', 1000);
addDoubt('L01B-TG', 1000);
addDoubt('L02A-TG', 1000);
addDoubt('L02B-TG', 1000);

// PRÓXIMO PASSO: FAZER COM QUEAPAREÇAM AS MUDANÇAS NO REGISTRO


//$(".box").draggable();

var regcount = 00;
//RECEBENDO VALORES VIA GET
var query = location.search.slice(1);
var partes = query.split('&');
var data = {};
partes.forEach(function (parte) {
  var chaveValor = parte.split('=');
  var chave = chaveValor[0];
  var valor = chaveValor[1];
  data[chave] = valor;
});
//console.log(data);

//CRIANDO COOKIES
setCookie("matricula", data["mat"], 365);
//IMPRIMINDO COOKE NA TELA
checkCookie();

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {//tornar variável o cookie que quero pesquisar
  var user = getCookie("matricula");
  if (user != "") {
    alert("Seja bem vindo " + user);//aqui posso registrar no topo da página a matricula
    $(".links").prepend("<li>Seja bem vindo(a): "+user+"</li>")
  } else {
    user = prompt("Please enter your name:", "");//redirecionar a página de login
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

//RECUPERA DADOS DA LINHA ATUAL
function registrar() {
  $(".linha").focusout(function () {
    // alert($(this).html());
    var nl = $(this).attr("id");
    var info = $(this).html();
    regcount++;
    $(".registro").prepend(regcount + " 22/05/2019 - 12:45" + ": " + nl + " " + info + "<br/>");
    getCroqui();
    //setCroqui();
  });

}registrar();

//copiar registro
$(".registro").click(function(){

  // Seleciona o conteúdo do input
  $(this).select();

  document.execCommand('copy');

});


//zoom na janela
$( window ).resize(function() {
  alert("Por favor, não dê zoom na janela!");
});

//MODELO DE FUNCTION PARA PERCORRER AS LINHAS
/*
function getCroqui () {
  $(".linha").each(function( index ) {
    console.log($( this ).attr("id") + "+" + $( this ).html()+"/");
  });
}
getCroqui();
*/
//COPIA CROQUI COMPLETO

function getCroqui () {
  var backup = $(".croqui").html();
  $(".bkup").text(backup);
}


//MONTA CROQUI
function setCroqui() {
  var backup = $('.bkup').text();
  $(".croqui").html(backup);
}
$(".bkup").on("focusout", function(){
  setCroqui();
});


//centralizar obj na tela
function centralizar() {
  $(".popup").css("position","absolute");
  $(".popup").css("top", Math.max(0, (($(window).height() - $(".popup").outerHeight()) / 2) + $(window).scrollTop()) + "px");
  $(".popup").css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");

} centralizar();
