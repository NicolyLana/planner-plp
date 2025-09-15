$(document).ready(function() {
    "use strict";

    $('#tarefa_data, #tarefa_categoria_id, #tarefa_turno').addClass('has-val');

    $('.inputnew').not('#tarefa_data, #tarefa_categoria_id, #tarefa_turno').each(function(){
        var $this = $(this);

        if($this.val().trim().length > 0){
            $this.addClass('has-val');
        }

        $this.on('blur change', function(){
            if($this.val().trim().length > 0){
                $this.addClass('has-val');
            } else {
                $this.removeClass('has-val');
            }
        });
    });

    var input = $('.validate-input .inputnew');

    $('.validate-form').on('submit', function(){
        var check = true;
        for(var i=0; i<input.length; i++){
            if(validate(input[i])==false){
                showValidate(input[i]);
                check=false;
            }
        }
        return check;
    });

    $('.validate-form .inputnew').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function validate(input){
        if($(input).attr('type')=='email'||$(input).attr('name')=='email'){
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)==null){
                return false;
            }
        } else {
            if($(input).val().trim()==''){
                return false;
            }
        }
        return true;
    }

    function showValidate(input){
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input){
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

    // Funcionalidade de tarefas
    let tarefas = [];
    function criarTarefa() {
        const data = document.querySelector('#data').value;
        const descricao = document.querySelector('#descricao').value;
        const bloco = document.querySelector('#bloco').value;
        const atividade = document.querySelector('#atividade').value;
        const categoria = document.querySelector('#categoria').value;

        const tarefa = { data, descricao, bloco, atividade, categoria };
        tarefas.push(tarefa);
    }

    function marcarDiaComTarefa(data) {
        const calendario = document.querySelectorAll('.dia');
        calendario.forEach(dia => {
            const diaData = dia.getAttribute('data-date');
            if (diaData === data) {
                dia.classList.add('tem-tarefa');
            }
        });
    }

    function carregarTarefasNoCalendario() {
        tarefas.forEach(tarefa => {
            marcarDiaComTarefa(tarefa.data);
        });
    }

    carregarTarefasNoCalendario();
    document.querySelector('#criarTarefaBtn').addEventListener('click', criarTarefa);
});
