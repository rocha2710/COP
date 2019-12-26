/*
** SICAGE - CONTROLE OPERACIONAL DE PÁTIO - [ COP ] 
** DESENVOLVIDO POR IGOR R ROSA
** E-MAIL: IGOR.ROSA1@VALE.COM
** CELULAR: +55 98 9 8730-7435
*/

//VARIÁVEIS GLOBAIS DO SCRIPT
var v = 1.0;
var objcId = 0;
var logItem = "";
var dotId = 0;

var segundos = new Number();
segundos = 60;
var minutos = new Number();
minutos = 14;
var contagem;





//FUNÇÃO INICIAR COM FUNCIONALIDADES BÁSICAS
function init() 
{
    alert("Bem vindo ao Sicage versão "+v);
    //CROQUI
    createCroqui();
     //TIMELINE
   createTimeline();
    //VMA
    vmaReg();
    //AMV
    amvAction();
    //BOTÕES
    btnActions();
} //init();
init();









//CROQUI
function createCroqui () 
{
    $("#croqui")
    .append("<div id='amv001' class='amv'></div>")
/*
    .append("<div id='vma_l001' class='L001 vma' contenteditable='true''>30km/h</div>")
    .append("<div id='nota_btn_l001' class='L001 nota_btn'></div>")
    .append("<div id='nota_l001' class='L001 nota' contenteditable='true''><b>Linha 001 - notas</b></br><p>Escreva aqui...</p></div>")
    .append("<div id='l001_btn_add' class='btn_add'></div>")

    .append("<div id='vma_l002' class='L002 vma' contenteditable='true''>30km/h</div>")
    .append("<div id='nota_btn_l002' class='L002 nota_btn'></div>")
    .append("<div id='nota_l002' class='L002 nota' contenteditable='true''><b>Linha 002 - notas</b></br><p>Escreva aqui...</p></div>")
    .append("<div id='l002_btn_add' class='btn_add'></div>")
    */
     .append("<div id='menu_add_obj'><ul><li class='btn_add_loco'>Locomotiva</li><li class='btn_add_vag'>Vagões</li><li class='btn_add_interv'>15 min</li><ul></div>");
    criaLinha("l001", 168, 352);
     criaLinha("l002", 249, 509);
    //criaLinha("l002", 250, 352);
}//createCroqui
function criaLinha(nLinha, posx, posy, tamanho) 
{
    //FUNÇÃO FUNCIONANDO. BASTA POSICIONAR OS DEMAIS ELEMENTOS
    $("#croqui")
    .append("<div id='"+nLinha+"_btn_add' class='btn_add'></div>")
    .append("<div id='vma_"+nLinha+"' class='"+nLinha+" vma' contenteditable='true''>30km/h</div>")
    .append("<div id='nota_btn_"+nLinha+"' class='"+nLinha+" nota_btn'></div>")
    .append("<div id='nota_"+nLinha+"' class='"+nLinha+" nota' contenteditable='true''><b>"+nLinha+" - notas</b></br><p>Escreva aqui...</p></div>")
    .append("<div id='"+nLinha+"' class='linha_g'>a</div>");
    
    $("#"+nLinha+"_btn_add").css("top", posy).css("left", posx);
    var pos = $("#"+nLinha+"_btn_add").position();
    let posX = pos.left;
    let posY = pos.top;
    
    //POSICIONAR TODOS OS OBJETOS DA LINHA BASEADOS NO BOTÃO ADD (ESSE SERÁ NO CSS)
    $("#vma_"+nLinha).css("top", posY-61).css("left", posX-18);
    $("#nota_btn_"+nLinha).css("top", posY+40).css("left", posX+70);
    $("#nota_"+nLinha).css("top", posY+40).css("left", posX+110);
    $("#"+nLinha).css("top", posY-100).css("left", posX-18);
    
    //se linha g coloca linha grande, caso contrario  p imprimir linha pequena
    
}
//TIMELINE
function createTimeline() 
{
    $(".del_laurindo").on("click", function(){
    $(".dot").on("dblclick", function () {
    $(this).remove();
    });
    });

    $(".add_laurindo").on("click", function() 
    {
    var nLaurindo = prompt("Digite o prefixo");
    var posX = "";
    var posY = "";
    var cor = $("#dotColor").val();
    alert("Novo Laurindo "+nLaurindo+" criado. Clique na Time-line para marcar o horário de partida.");

    $("#time-line").on("dblclick", function(event) {
    //pegar posição do click
    posX =  event.pageX-25;//subtrair metade do tamanho do obj
    posY = event.pageY-25;
    alert("pageX: "+ posX + " e pageY: "+ posY);
    $(this).append("<div id='L"+nLaurindo+"' class='dot'>"+nLaurindo+"</div>");
    $(this).unbind("dblclick");
    $("#L"+nLaurindo).css("left", posX).css("top", posY).css("background-color", cor)
    .on("dblclick", function() {
    $(this).clone().appendTo("#time-line").draggable(); 
    });
    })
    }); // add_laurindo
} //create_timeline
//VMA
function vmaReg() 
{
    //criando a interatividade da alteração de VMA
    $(".vma").on("focusout", function () {
    if($(this).text() == "20km/h") {
    $(this).css("background-color", "yellow");
    } else if ($(this).text() == "30km/h") {
    $(this).css("background-color", "#6fc14a");
    } else {
    $(this).css("background-color", "red");
    }

    //criar uma expressão regular para retirar só o numero da linha
    alert($(this).attr("class") +" alterada para "+ $(this).text()); //registrar no log usando append
    });
}//vmaReg
//AMV'S
function amvAction() 
{
    //ativando bandeirola que muda de cor
    $(".amv").on("click", function () { 
    $(this).toggleClass("amv_amarelo");
    if ($(this).attr("class") == "amv amv_amarelo") {
    logItem = "O amv "+$(this).attr("id")+" está amarelo na reversa";
    alert (logItem); //registrar no log usando append
    } else {
    logItem = "O amv "+$(this).attr("id")+" está verde na reta";
    alert (logItem); //registrar no log usando append
    }
    });
}//amvAction
//BOTÕES 
function btnActions() 
{
     //Criando a interatividade das notas
    $("#nota_btn_l001").on("click", function () {
        $("#nota_l001").fadeToggle("complete", function() {
         //add ao registro o conteudo da nota e a linha
            if( $(this).attr("style") == "display: none;") { 
              alert($(this).text());
            }
        });
    });
    
    $("#nota_btn_l002").on("click", function () {
        $("#nota_l002").fadeToggle("complete", function() {
         //add ao registro o conteudo da nota e a linha
            if( $(this).attr("style") == "display: none;") { 
              alert($(this).text());
            }
        }); 
    });
    
    //BOTÃO ADD
    $(".btn_add").on("click", function() {
        var pos = $(this).position();
        alert("top: "+ pos.top + " left: "+pos.left);
        $('#menu_add_obj')
        .css("top", pos.top+5)
        .css("left", pos.left+30)
        .show(); 
    });
    
    //ADD LOCOMOTIVA
    $(".btn_add_loco").on("click", function() {
        objcId++;
    	var pos2 = $(this).parent().position();
    	alert(pos2.top);
    	$("#croqui")
    	.append("<div id='loco-"+objcId+"' class='loco_obj loco_cm'></div>");
    	alert(2);
    	$("#loco-"+objcId)
    	.css("top", pos2.top + 50)
    	.css("left", pos2.left + 50)
    	.draggable()
        .on("dblclick", function() {
        $(this).toggleClass("loco_bx");
        });
        $('#menu_add_obj').hide();
    	alert(3);
    	//loco obj double click gira a loco toggle class
    });
    //ADD VAGÃO
    $(".btn_add_vag").on("click", function(){ 
        objcId++;
    	var pos2 = $(this).parent().position();
    	alert(pos2.top);
    	$("#croqui")
    	.append("<div id='vag-"+objcId+"' class='vag_obj'>vagão</div>");
    	alert(2);
    	$("#vag-"+objcId)
    	.css("top", pos2.top + 50)
    	.css("left", pos2.left + 50)
    	.draggable()
        .on("dblclick", function() {
        });
        $('#menu_add_obj').hide();
        
    });
    
    //ADD 15 MIN
    $(".btn_add_interv").on("click", function() {
        objcId++;
        equipe = prompt("Digite o nome da Equipe que pegará o intervalo.");
        var pos = $(this).parent().position();
        $("#croqui")
        .append("<div id='balao15' class='balao-"+objcId+"'></div>");
        $(".balao-"+objcId)
        .css("top", pos.top + 100)
        .css("left", pos.left + 200)
        .draggable()
        .append("<span class='equipe'>"+equipe+"</span><br/>")
        .append("<span id='minuto'></span>:<span id='segundo'></span>");
        int15min();
    });
    
}//btnActions
function int15min()
{
    minuto.innerText = minutos;
    if((segundos -1) >= 0) {
    segundos = segundos -1;
    segundo.innerText = segundos;


    if(segundos < 1) {
    segundos = 59;
    minutos = minutos - 1;
    $("#minuto").innerText = minutos;
    $("#segundo").innerText = segundos;

    }

    contagem = setTimeout('int15min();' , 1000);
    if(minutos <= 1) {
    clearTimeout(contagem);
    alert("O intervalo da equipe acabou!");
    segundos = 60;
    minutos = 14;

    }
    }
}