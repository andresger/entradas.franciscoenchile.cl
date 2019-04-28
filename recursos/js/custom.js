var dataWidth;
    var dataHeight;
    var hMenu;
    var wWidth;
    var dataEvent;
    var mainBan;
    var coefBan;
    var coefPad;

    function nav(){
        hMenu = $('.menu').outerHeight();
        $("#header").sticky({ topSpacing: 0, zIndex: 999 });
        $('a.page-scroll').not('.off a.page-scroll').smoothScroll({offset: - hMenu - 22});
        $('.off a.page-scroll').removeAttr('href');
      };

      function gradient(){
        $('.img-event-wrapper').find('*').not('.img-event').remove();
        $('.img-event-wrapper').prepend('<div class="gradient-wrapper"></div>');
        dataWidth = $('.img-event').outerWidth();
        $('.gradient-wrapper').css('width', dataWidth+'px');
      };

      function dataH(){
        //Height images
        dataHeight = $('.data-wrapper').outerHeight();
        $('.img-event, .gradient-wrapper').css('min-height', dataHeight+'px');
      };

      function resize(){
        wWidth = $(window).width();
        if (wWidth <= 1200) {
          $('#top, #bar').removeClass('container').addClass('container-fluid');
        }else if (wWidth > 1200){
          $('#top, #bar').removeClass('container-fluid').addClass('container');
        };
        mainBan = $('.main-ban').width();
        coefBan = 0.46069;
        coefPad = 0.34189;
        if (mainBan <= 1170) {
          $('.main-ban').css('min-height', mainBan * coefBan+'px');
          $('.main-ban').css('padding-top', mainBan * coefPad+'px');
        }
      };

      function btnSolicita(){
        $('.btn-solicita').not('.off .btn-solicita').click(function() {
          dataEvent = $(this).attr('data-event');
          if (dataEvent == 'event2' || dataEvent == 'event4') {
            $('article#'+dataEvent).css('float', 'right');  
          } else{}
          $('article').not('article#'+dataEvent).fadeOut('fast');
          $('.tit-form').fadeOut('fast');
          setTimeout(function() {
            $('article#'+dataEvent).removeClass('col-md-6').addClass('col-md-12');
            $('article .btn-wrapper').fadeOut('fast');
            $('#volver').fadeIn('fast');
          }, 200)
          setTimeout(function() {
            $(".form-wrapper" ).slideDown( "slow", function() {});
          }, 400)
          if (dataEvent == 'event3') {
            $('.jovenes').show();
          }else if (dataEvent != 'event3') {
            $('.jovenes').hide();
          }
          console.log(dataEvent);
        });
      };

      function btnVolver(){
      	$('.volver').click(function() {
      		$('#volver').fadeOut('fast');
          $(".form-wrapper" ).slideUp( "slow", function() {});
      		setTimeout(function() {
            $('article#'+dataEvent).removeClass('col-md-12').addClass('col-md-6');
            $('article .btn-wrapper').fadeIn('fast');
      		}, 600)
          setTimeout(function() {
            $('article').fadeIn('fast');
            $('.tit-form').fadeIn('fast');
          }, 900)
      	});
      };

      var statData;
      var statArrive;

      function stat(){
        if (statData == 'show' && statArrive == 'show') {
          $('.data-block').fadeIn();
          $('.arrive-block').fadeIn();
          $('.btn-block').fadeIn();
        }
        else if (statData == 'show' && statArrive == 'hide') {
          $('.data-block').fadeIn();
          $('.arrive-block').fadeOut();
          $('.btn-block').fadeIn();
        }
      }

      function start(){
        $("#country_selector, #from_selector").countrySelect({
          //defaultCountry: "ar",
          //onlyCountries: ['ar', 'gb', 'ch', 'ca', 'do'],
          excludeCountries: ['cl'],
          preferredCountries: ['ar', 'pe', 'bo', 'py', 'uy', 'br', 'ec', 'co', 've']
        });

        $('input:radio[name=country], input:radio[name=from]').change(function() {
            if (this.value == 'chile') {
              $('.form-item.country').fadeOut();
              statData = 'show';
              statArrive = 'hide';
              stat();
            }
            else if (this.value == 'afuera') {
              $('.form-item.country').fadeIn();
              statData = 'show';
              statArrive = 'show';
              stat();
            }
            else if (this.value == 'nacional') {
              $('.form-item.nacionalidad').fadeOut();
            }
            else if (this.value == 'extranjero') {
              $('.form-item.nacionalidad').fadeIn();
            }
        });

        $('input:radio[name=movilidad]').change(function() {
            if (this.value == 'si') {
              $('.btn-wrapper.solicitar').fadeOut();
              $('.arrive-block').fadeOut();
              $('.form-group.adicionales').fadeOut();
              $('.guest-block').fadeOut();
              setTimeout(function() {
                $('.txt-movilidad, .form-group.limit, .btn-wrapper.msg').fadeIn();
              }, 300)
            }
            else if (this.value == 'no') {
              $('.txt-movilidad, .form-group.limit, .btn-wrapper.msg').fadeOut();
              if (statArrive == 'show') {
                $('.arrive-block').fadeIn();
              }
              setTimeout(function() {
                $('.form-group.adicionales').fadeIn();
                $('.btn-wrapper.solicitar').fadeIn();
              }, 300)
            }
        });
        $('.adicionales select').change(function() {
          var cant = $(this).val();
          $('.guest-container').empty();
          if (cant != 'no') {
            for(var i = 0; i< cant; i++)
              $(".guest-container").append("<div class='row'><div class='col-md-4'><div class='form-group'> <label for=''>Nombre Completo</label> <input tabindex='1' type='text' class='form-control' id='' placeholder='Ingrésalo como aparece en tu identificación'></div></div><div class='col-md-4'><div class='form-group'> <label for=''>Nacionalidad</label><div class='form-item country guest'> <input class='form-control nacionality_selector' type='text'></div></div></div><div class='col-md-4'><div class='form-group'> <label for=''>RUT / Pasaporte / DNI</label> <input tabindex='2' type='text' class='form-control' id='' placeholder='Ingrésalo sin puntos ni guiones'></div></div></div>");
            $(".nacionality_selector").countrySelect({
              preferredCountries: ['cl', 'ar', 'pe', 'bo', 'py', 'uy', 'br', 'ec', 'co', 've']
            });
            $('.guest-block').fadeIn();
          }
          else if (cant == 'no') {
            $('.guest-block').fadeOut();
          }
          
        });
        $('.off .btn-solicita').text('Proximamente');
      };

      //DATEPICKER
      $(function () {
         var bindDatePicker = function() {
          $(".input-group.arrive.date").datetimepicker({
              format:'DD/MM/YYYY',
              language: 'es',
            icons: {
              time: "fa fa-clock-o",
              date: "fa fa-calendar",
              up: "fa fa-arrow-up",
              down: "fa fa-arrow-down"
            },
          }).find('input:first').on("blur",function () {
            // check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
            // update the format if it's yyyy-mm-dd
            var date = parseDate($(this).val());

            if (! isValidDate(date)) {
              //create date based on momentjs (we have that)
              date = moment().format('DD/MM/YYYY');
            }

            $(this).val(date);
          });
        }
         
         var isValidDate = function(value, format) {
          format = format || false;
          // lets parse the date to the best of our knowledge
          if (format) {
            value = parseDate(value);
          }

          var timestamp = Date.parse(value);

          return isNaN(timestamp) == false;
         }
         
         var parseDate = function(value) {
          var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
          if (m)
            value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

          return value;
         }
         
         bindDatePicker();
       });
      //FIN DATEPICKER

      $(document).ready(function() {
        gradient();
        dataH();
        nav();
        resize();
        btnSolicita();
        btnVolver();
        start();
        stat();
      });

      $(window).resize(function() {
        gradient();
        dataH();
        resize();
      });