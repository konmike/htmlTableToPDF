(function( $ ){
   // var pocetStudentu = $('input[name=pocetStudentu]').val(); 
   //var pocetUloh = $('input[name=pocetUloh]').val(); 
   
   //Generated Inputs Counter
   var gICounter = 0;
   
   // function sumStudents(){
   //    var sum = 0;
   //    $('input[name="gI[]"]').each(function() { 
   //       console.log($(this).val()); 
   //       sum += $(this).val();
   //       return sum;
   //    });
   // }

   function changeInputs($newValue, $inputs) {
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

   // $('input[name^="gI"]').on('input',function() {
   //    console.log("Hello");
      
   //    $('input[name="gI[]"]').each(function() { 
   //       console.log($(this).val()); 
   //    });
   // });

   $('input[name=zadani]').on("input", function() {
      var pocetUloh = parseInt($('input[name=pocetUloh]').val());
      
      if($('#zadani:checkbox:checked').length > 0){
         $('input[name=pocetUloh]').val(pocetUloh/2);
         // console.log("Varianta dva");
      }
      else{
         $('input[name=pocetUloh]').val(pocetUloh*2);   
         // console.log("Varianta ctyri");
      }
   });

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

   $( "input[name=jmenaStudentu]" ).on("keydown",function search(e) {
      if(e.keyCode == 13) {
          console.log($(this).val());
      }
   });
   

})( jQuery );