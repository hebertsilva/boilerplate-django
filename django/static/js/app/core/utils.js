app.extend({

    ajaxForm: function( form ) {
        form = $(form);
        return $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize()
        });
    },

    scrollTo: function(y, options) {
        var setup = $.extend({}, {
            duration: 400
        }, options);

        return $.when($('html, body').animate({ 'scrollTop' : y }, setup));
    },

    scrollToElement: function( el, offset, options ) {
        if ( !el.length ) {
            return;
        }

        offset = offset || 0;
        var pos = el.position().top + offset;
        this.scrollTo( pos, options );
    },

    applyMasks: function() {

        if ( !$.fn.mask ) {
            console.error('jQuery.mask plugin not found!');
            return;
        }

        var nineDigitPhoneMask = function(phone){
            return phone.match(/^(\(?[0-9]{2}\)? ?9(5[0-9]|6[0-9]|7[01234569]|8[0-9]|9[0-9])[0-9]{1})/g) ?
            '(00) 00000-0000' : '(00) 0000-0000';
        };

        var checklenghtPhone = function(input) {
            if ( input.val().length <= 14 ) {
                setTimeout(function(){
                    input.data('mask').remove();
                    input.mask('(99) 9999-9999');
                }, 100);
            }
        };

        $('.mask-date input').mask('11/11/1111');
        $('.mask-cpf input').mask('999.999.999-99');
        $('.mask-phone input').mask('(99) 9999-9999');

        var mobileInputs = $(".mask-mobile input");
        mobileInputs.each(function() {
            var input = $(this);
            input.val(input.val().replace(/-/g, ''));
            input.mask( nineDigitPhoneMask ).on('keypress', function(){
                input.mask( nineDigitPhoneMask( input.val() ) );
            }).on('blur', function(){
                checklenghtPhone(input);
            });

            checklenghtPhone(input);
        });

        // zipcode masks
        $('.mask-zipcode input').mask('99999-999', {
            onComplete: function(value, event, el) {
                el.trigger('maskcomplete');
            }
        });
    }
});
