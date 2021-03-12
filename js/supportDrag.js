(function () {
    window.supportDrag = function() {
        let div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();

    let input =  document.getElementById('js-file-input');

    if(!supportDrag){
        document.querySelectorAll('.has-drag')[0].classList.remove('has-drag');
    }
    
    input.addEventListener("change", function(e){      
        document.getElementById('js-file-name').innerHTML = this.files[0].name;     
        document.querySelectorAll('.upload .input')[0].classList.remove('file-input--active');
        
    }, false);

    if(supportDrag){   
        input.addEventListener("dragenter", function(e) {
            document.querySelectorAll('.upload .input')[0].classList.add('file-input--active');
        });

        input.addEventListener("dragleave", function(e) {
            document.querySelectorAll('.upload .input')[0].classList.remove('file-input--active');
        });
    }
})();

var lastNames = [];
var getNames = function(e){
    let tableNames = document.querySelectorAll('.file tbody td:first-child');

    if(tableNames.length > 0){
        tableNames.forEach( function(name){
            lastNames.push(name.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            lastNames.sort(); 
        });
        // console.log(lastNames);
    }
    else
        console.log("Zadne jmena tam nejsou, kde jsou? Nejsou...");
}