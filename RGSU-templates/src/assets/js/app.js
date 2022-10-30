import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = window.$ = $;
//require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';
import './lib/hideMaxListItem.js';
import './lib/showTotalListItem.js';
import './lib/foundation-datepicker.min.js';
import './lib/foundation-datepicker.min.ru.js';
import './lib/jquery.form.js';
import './lib/perfect-scrollbar.jquery.min.js';
import './lib/tableHeadFixer.js';

//import Swiper from 'swiper';
//import tippy from 'tippy.js';
import 'jgrowl';
import 'magnific-popup';
import 'tooltipster';
import Inputmask from 'inputmask';

Foundation.Accordion.defaults.slideSpeed = 250;
Foundation.Accordion.defaults.multiExpand = true;
Foundation.Accordion.defaults.allowAllClosed = true;
Foundation.SmoothScroll.defaults.threshold = 0;
Foundation.SmoothScroll.defaults.animationDuration = '350';
Foundation.SmoothScroll.defaults.animationEasing = 'swing';
Foundation.Drilldown.defaults.backButton = '<li class="js-drilldown-back"><a tabindex="0"><i class="fal fa-chevron-left"></i></a></li>';



$(document).foundation();
$(document).ready(function(){

  ;(function($, window, document, undefined) {
    $('input[type="file"]').each(function() {
      var $input = $(this),
        $label = $input.next('.file-upload__title'),
        labelVal = $label.html();

      $input.on('change', function(e) {
        var fileName = '';

        if (this.files && this.files.length > 1)
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        else if (e.target.value)
          fileName = e.target.value.split('\\').pop();

        if (fileName)
          $label.find('.caption').html(fileName).addClass('has-file');
        else
          $label.html(labelVal);
      });

      // Firefox bug fix
      $input
        .on('focus', function() { $input.addClass('has-focus'); })
        .on('blur', function() { $input.removeClass('has-focus'); });
    });
  })(jQuery, window, document);

  $.jGrowl.defaults.closerTemplate = '<div>закрыть все</div>';

  var body = document.body,
      timer;

  window.addEventListener('scroll', function() {
    clearTimeout(timer);
    if(!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover')
    }
    
    timer = setTimeout(function(){
      body.classList.remove('disable-hover')
    }, 500);
  }, false);

  var mySwiper = new Swiper ('.swiper-container', {
    allowTouchMove: true,
    loop: true,
    //direction: 'vertical',

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    //scrollbar: {
    //  el: '.swiper-scrollbar',
    //},
  });
  var events_booking = new Swiper ('.events_carousel', {
    allowTouchMove: true,
    loop: true,
    slidesPerView: 1,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    //navigation: {
    //  nextEl: '.swiper-button-next',
    //  prevEl: '.swiper-button-prev',
    //},

    // And if we need scrollbar
    //scrollbar: {
    //  el: '.swiper-scrollbar',
    //},
  });

  $('[data-tooltip]').tooltipster({
    theme: 'corp',
  });
  
  $('.section-title__toggler').on('click', function(e){
    var toggler = $(this),
        parent = $(this).parent(),
        fold = parent.next('.section-fold');
    e.preventDefault();
    toggler.toggleClass('is-active');
    fold.slideToggle('fast').toggleClass('is-open');

    //if( fold.hasClass('is-closed') ) {
    //  toggler.removeClass('is-active');
    //  fold.slideDown().addClass('is-closed');
    //} else if (fold.hasClass('is-open')) {
    //  toggler.addClass('is-active')
    //  fold.slideUp().addClass('is-open');
    //}
  });
  
  $.extend(true, $.magnificPopup.defaults, {
    mainClass: 'mfp-with-anim mfp-zoom-in',
    tClose: 'Закрыть',
    tLoading: 'Загрузка...',
    removalDelay: 300,
    gallery: {
      tPrev: 'Назад',
      tNext: 'Вперед', 
      tCounter: '%curr% из %total%'
    },
    image: {
      Error: 'Невозможно загрузить <a href="%url%">изображение</a>'
    },
    ajax: {
      tError: 'Невозможно загрузить <a href="%url%">содержимое</a>',
      //settings: null, // Ajax settings object that will extend default one - http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings
      // For example:
      // settings: {cache:false, async:false}
      //cursor: 'mfp-ajax-cur', // CSS class that will be added to body during the loading (adds "progress" cursor)
    },
    callbacks: {
      open: function() { 
        $('[data-close]').on('click',function(event){
          event.preventDefault();
          $.magnificPopup.close();
        }); 
      }
    }
  });

  $('.inline-popup').magnificPopup({
    type: 'inline',
    focus: '[autofocus]',
    callbacks: {
      //open: function() {
      //  $(this).find('[data-equalizer]').foundation(); // реинит эквалайзера после открытия окна
      //}
    }
  });
  $('.ajax-popup').magnificPopup({
    type: 'ajax',
    closeBtnInside: true,
    closeOnContentClick: false,
    focus: '[autofocus]',
    /*
    callbacks: {
      parseAjax: function(mfpResponse) {
        // mfpResponse.data is a "data" object from ajax "success" callback
        // for simple HTML file, it will be just String
        // You may modify it to change contents of the popup
        // For example, to show just #some-element:
        // mfpResponse.data = $(mfpResponse.data).find('#some-element');
        // mfpResponse.data must be a String or a DOM (jQuery) element
        console.log('Ajax content loaded:', mfpResponse);
      },
      ajaxContentAdded: function() {
        // Ajax content is loaded and appended to DOM
        console.log(this.content);
      }
    }
    */
  });
  //$('.popup-close').on('click', function(e){
  //  e.preventDefault();
  //  $.magnificPopup.close();
  //});
  $('body').on('click', '.ajax-popup', function(){
    $(this).magnificPopup({
      type: 'ajax',
      closeBtnInside: true,
      closeOnContentClick: false,
      focus: '[autofocus]'
    })
  });

  $('.field .field-clear').on('click', function(){
    $(this).parent().find('input, textarea, select').val('').trigger('change');
  });

  $('[data-date-picker]').fdatepicker({
    weekStart: 1,
    //startDate: 'today',
    language: 'ru',
    format: "dd.mm.yyyy",
    autoclose: "true",
    assumeNearbyYear: "20",
    todayHighlight: "true",
    leftArrow:'<i class="far fa-chevron-left"></i>',
    rightArrow:'<i class="far fa-chevron-right"></i>',
  });

  $('.number-only').on({
    keydown: function(e){
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+V
        (e.keyCode == 86 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
         // let it happen, don't do anything
         return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    },
    'change': function(){
      var max = parseInt($(this).attr('max'));
      var min = parseInt($(this).attr('min'));
      //var maxlength = parseInt($(this).attr('maxlength'));
      if ($(this).val() > max) {
        $(this).val(max);
      } else if ( ($(this).val() < min) && ($(this).val() != '')) {
        $(this).val(min);
      }
    },
  });
   
  $('.show-rest').hideMaxListItems({
    'max': 7,
    'speed': 300,
    'moreText': 'Показать еще [COUNT]',
    'lessText': 'Показать меньше',
    'moreHTML': '<p class="maxlist-more"><a href="#"></a></p>'
  });

  $('.show-total').showTotalListItems({
    'max': 7,
    'speed': 300,
    'moreText': 'Показать все [TOTAL]',
    'lessText': 'Показать меньше',
    'moreHTML': '<p class="maxlist-total"><a href="#"></a></p>'
  });

  $('.v-scroll').perfectScrollbar({
		suppressScrollX: true
	});
  $('.h-scroll, .tabs').perfectScrollbar({
		suppressScrollY: true
	});

  $(".vacation-grid-data").tableHeadFixer({
    head: false, // fix table header
    foot: false, // fix table footer
    left: 1, // fix x left columns
    right: 0, // fix x right columns
    'z-index': 1 // z-index
  });


  Inputmask().mask(document.querySelectorAll("input"));

  expromptum();
  function xp_init_uncompleted_fields(){
    xP('.uncompleted_fields .fields').each(function(){
      var fields = this,
        $parent = fields.$container.parent(),
        list = new xP.list(),
        label_id = '$' + fields.uncompleted_type + '_label';
      fields.root().change(function(){
        var show = false;
        list.each(function(){
          this._[label_id].hide();
        });
        this._param(fields.uncompleted_type).each(function(){
          if(!this.$label){
            return;
          }
          if(list.index(this) < 0){
            var field = this;
            list.append(this);
            this._[label_id] = $(
              '<a href="#' + this.$element.attr('id') + '" class="pseudo-link">'
              + this.$label.text() + '</a>'
            ).appendTo(fields.$element).on('click', function(){
              //console.log(field.$element);
              //setTimeout(console.log('трололо'), 2500);
              field.$label.trigger('click'); //Тут был field.focus(), но фокус может попасть на скрытые элементы типа селекта, ведь он заменен на select2;
            });
          }
          this._[label_id].show();
          show = true;
        });
        if(show){
          $parent.show();
        }else{
          $parent.hide();
        }
      });
    });
  };
  xp_init_uncompleted_fields();
  
});