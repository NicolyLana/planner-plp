$(document).ready(function() {
    "use strict";

    // Adiciona 'has-val' aos campos que já devem iniciar preenchidos
    $('#meta_data_inicio, #meta_data_fim, #meta_status_id, #meta_categoria_id').addClass('has-val');


    // Verifica os demais campos de metas
    $('.inputnew').not('#meta_data, #meta_categoria_id, #meta_turno').each(function(){
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

    // Validação no submit
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

    // Remove alerta ao focar no campo
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

});
