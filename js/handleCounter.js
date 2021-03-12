/**
 * handle counter
 */
;(function () {
    'use strict';
    $.fn.handleCounter = function (options) {
        var $input,
            $btnMinus,
            $btnPlugs,
            minimum,
            maximize,
            writable,
            onChange,
            onMinimum,
            onMaximize;
        var $handleCounter = this
        $btnMinus = $handleCounter.find('.counter-minus')
        $input = $handleCounter.find('input')
        $btnPlugs = $handleCounter.find('.counter-plus')
        var defaultOpts = {
            writable: true,
            minimum: 1,
            maximize: null,
            onChange: function(){},
            onMinimum: function(){},
            onMaximize: function(){}
        }
        var settings = $.extend({}, defaultOpts, options)
        minimum = settings.minimum
        maximize = settings.maximize
        writable = settings.writable
        onChange = settings.onChange
        onMinimum = settings.onMinimum
        onMaximize = settings.onMaximize
        if (!$.isNumeric(minimum)) {
            minimum = defaultOpts.minimum
        }
        if (!$.isNumeric(maximize)) {
            maximize = defaultOpts.maximize
        }
        var inputVal = $input.val()
        if (isNaN(parseInt(inputVal))) {
            inputVal = $input.val(0).val()
        }
        if (!writable) {
            $input.prop('disabled', true)
        }

        changeVal(inputVal)
        $input.val(inputVal)
        $btnMinus.click(function () {
            var num = parseInt($input.val())
            if (num > minimum) {
                $input.val(num - 1)
                changeVal(num - 1)
            }
        })
        $btnPlugs.click(function () {
            var num = parseInt($input.val())
            if (maximize==null||num < maximize) {
                $input.val(num + 1)
                changeVal(num + 1)
            }
        })
        var keyUpTime
        $input.keyup(function () {
            clearTimeout(keyUpTime)
            keyUpTime = setTimeout(function() {
                var num = $input.val()
                if (num == ''){
                    num = minimum
                    $input.val(minimum)
                }
                var reg = new RegExp("^[\\d]*$")
                if (isNaN(parseInt(num)) || !reg.test(num)) {
                    $input.val($input.data('num'))
                    changeVal($input.data('num'))
                } else if (num < minimum) {
                    $input.val(minimum)
                    changeVal(minimum)
                }else if (maximize!=null&&num > maximize) {
                    $input.val(maximize)
                    changeVal(maximize)
                } else {
                    changeVal(num)
                }
            },300)
        })
        $input.focus(function () {
            var num = $input.val()
            if (num == 0) $input.select()
        })

        function changeVal(num) {
            $input.data('num', num)
            $btnMinus.prop('disabled', false)
            $btnPlugs.prop('disabled', false)
            if (num <= minimum) {
                $btnMinus.prop('disabled', true)
                onMinimum.call(this, num)
            } else if (maximize!=null&&num >= maximize) {
                $btnPlugs.prop('disabled', true)
                onMaximize.call(this, num)
            }
            onChange.call(this, num)
        }
        return $handleCounter
    };

    $(function ($) {
        var options = {
            minimum: 1,
            maximize: 1000
        }
        $('#counter').handleCounter(options)
        $('#counter2').handleCounter(options)
        $('#counter3').handleCounter({minimum: 0})
    });

   function changeInputs($newValue, $inputs) {
       let gICounter = 0;

      if($newValue === 0 || $newValue === 1){
         $('#generated-input input').remove();
         gICounter = 0;
         // console.log("Here we are2");
      }
      else if($newValue >= gICounter && ($newValue != 0 || $newValue != 1)){
         for (let i = $inputs; i < $newValue; i++) {
            $('#generated-input').append(
               '<input type="number" min="0" placeholder="Počet studentů" name="gI[]">'
            );
            gICounter++;  
         }
         
      }
      else{
         // console.log("Here we are 4");
         for (let i = $inputs; i > $newValue; i--) {
            $('#generated-input input').last().remove();
            gICounter--;
         }
      }
      //console.log($('input[name="gI[]"]').val());
   }

   $('input[name=pocetSouboru]').on("input", function() {
      let inputs = $('#generated-input input').length;
      let newValue = $(this).val();
      changeInputs(newValue,inputs);
   });
   $('#counter3-minus').click(function() {
      let inputs = $('#generated-input input').length;
      let newValue = $('input[name=pocetSouboru]').val();
      newValue--;
      // console.log(newValue);
      changeInputs(newValue,inputs);
   });
   $('#counter3-plus').click(function() {
      let inputs = $('#generated-input input').length;
      let newValue = $('input[name=pocetSouboru]').val();
      newValue++;
      // console.log(newValue);
      changeInputs(newValue,inputs);
   });



   $('input[name=zahrnout-vse]').on("input", function() {
      // var pocetUloh = parseInt($('input[name=pocetUloh]').val());
      
      if($('#zahrnout-vse:checkbox:checked').length > 0){
         // console.log("Check in");
         $('input[name=jmenaStudentu]').val('');
         $('#students-name').hide();
      }
      else{
         
         // console.log("Check out");
         $('#students-name').show();
         // var availableTags = $('table tr td:first-child').html();
         // 
         // console.log(availableTags);
         // for (let index = 0; index < availableTags.length; index++) {
         //    //const element = array[index];
         //    console.log(availableTags[index]);   
         // }

         $( function() {
            var availableTags = [];
            $('table tr:gt(0)').each(function(){
               console.log();
               availableTags.push($('td:first', $(this)).html());
            });
            
            $( "input[name=jmenaStudentu]" ).autocomplete({
               source: availableTags,
               appendTo: null,
            });
         });
      }
   });

    
    
    var getContent = function(upFile) {
        var reader = new FileReader();
        reader.onload = function(event) {
        var content = event.target.result;

        // console.log(content);
        
        $('.file').append(content);
        // console.log($('table tr').length - 1);
        // console.log( ($('table th').length - 8)/2 );
        getNames();
        $('input[name=pocetStudentu]').val($('table tr').length - 1);
        $('input[name=pocetUloh]').val(($('table th').length - 8)/2);
        $('.file style').remove();

        

        };
        reader.readAsText(upFile[0]);
    }

    try {
        $('#js-file-input').change(function() {
            getContent(this.files);
        });
    }
    catch (e) {
        alert(e);
    }

})(jQuery)