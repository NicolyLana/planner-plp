// login.js
$(document).ready(function() {
    "use strict";

    /*==================================================================
    [ Focus Input ]*/
    $('.input-field, .inputnew').each(function(){
        // Se já tem valor ao carregar a página
        if($(this).val().trim().length > 0) {
            $(this).addClass('has-val');
        }

        // Ao sair do campo
        $(this).on('blur', function(){
            if($(this).val().trim().length > 0) {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        });
    });

    /*==================================================================
    [ Validate Form ]*/
    var input = $('.validate-input .input-field, .validate-input .inputnew');

    $('.validate-form').on('submit', function(){
        var check = true;

        for(var i = 0; i < input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check = false;
            }
        }
        return check;
    });

    $('.validate-form .input-field, .validate-form .inputnew').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    /*==================================================================
    [ Validate Input Function ]*/
    function validate(input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
        return true;
    }

    /*==================================================================
    [ Show / Hide Validate ]*/
    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
});


