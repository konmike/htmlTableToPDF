<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML to PDF parser</title>
    <link rel="stylesheet" href="css\old_style.css">
    <link rel="stylesheet" href="css\main.css">
    <link rel="stylesheet" href="node_modules\@fortawesome\fontawesome-free\css\all.min.css">
</head>
<body>
    <main role="main" class="main">
        <aside class="help help__left">

        </aside>

        <form action="makepdf.php" method="post" class="form" enctype="multipart/form-data">
        
            <div class="wrapper wrapper--file">
                <input class="file-input" id="js-file-input" name="myfile" type="file">
                <div class="file-content">
                <div class="file-infos">
                    <p class="file-icon"><i class="fas fa-file-upload fa-2x"></i>
                    <span class="icon-shadow"></span>
                    <span>CLICK <span class="has-drag"> OR DRAG AND DROP</span></span>
                    </p>
                </div>
                    <p class="file-name" id="js-file-name">Žádný soubor nebyl vybrán...</p>
                </div>
            </div>
                
            <div class="number" id="counter">
                <label class="label">Počet studentů</label>
                <div class="counter-minus btn btn--bg-fill">-</div>
                    <input class="input" type="text" value="1" name="pocetStudentu" >
                <div class="counter-plus btn btn--bg-fill">+</div>
            </div>
                        
            <div class="number" id="counter2">
                <label class="label">Počet úloh</label>
                <div class="counter-minus btn btn--bg-fill">-</div>
                    <input class="input" type="text" value="3" name="pocetUloh">
                <div class="counter-plus btn btn--bg-fill">+</div>
            </div>
                
            <div class="checkbox">
                <span class="pseudo-label">Je součástí prohlášení?</span>
                <input class="input" type="checkbox" id="isThereProhlaseni" name="isThereProhlaseni">
                <label class="label label--prohlaseni" for="isThereProhlaseni">
                    <div class="check"></div>
                </label>
            </div>
        
            <div class="checkbox">
                <span class="pseudo-label">Chci tisknout prohlášení?</span>
                <input class="input" type="checkbox" id="printProhlaseni" name="printProhlaseni">
                <label class="label label--prohlaseni" for="printProhlaseni">
                    <div class="check"></div>
                </label>
            </div>
        
            <div class="checkbox">
                <span class="pseudo-label">Chci tisknout i zadání úloh?</span>
                <input class="input" type="checkbox" id="zadani" name="zadani" checked>
                <label class="label label--zadani" for="zadani">
                    <div class="check"></div>
                </label>
            </div>

            <div class="checkbox">
                <span class="pseudo-label">Zahrnout všechny studenty</span>
                <input class="input" type="checkbox" id="zahrnout-vse" name="zahrnout-vse" checked>
                <label class="label label--zahrnout-vse" for="zahrnout-vse">
                    <div class="check"></div>
                </label>
            </div>

            <div id="students-name" class="wrapper wrapper--students-name">
            <span>Jména studentů:</span>
                <input type="text" name="jmenaStudentu" autocomplete="off" placeholder="Jmena studentu oddelena carkou">
            </div>

            <div class="number" id="counter3">
                <label class="label">Počet souborů:</label>
                <div id="counter3-minus" class="counter-minus btn btn--bg-fill">-</div>
                    <input class="input" type="text" value="0" name="pocetSouboru">
                <div id="counter3-plus" class="counter-plus btn btn--bg-fill">+</div>
            </div>

            <div id="generated-input" class="wrapper wrapper--generated-input">
            </div>                
            
            <input class="btn btn--submit btn--bg-fill" type="submit" value="Stáhnout">
            
        </form>

        <aside class="help help__right">

        </aside>
    </main>
    
    <div class="file"></div>

    <!-- <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script> -->
    <script src="js/jquery-1.12.4.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/handleCounter.js"></script>
    
    <script> 
        /*if (window.File && window.FileReader && window.FileList && window.Blob) {
          alert("Si esta soportado el API!");
        } else {
          alert('The File APIs are not fully supported in this browser.');
        }*/

        var lastNames = [];
        var getNames = function(e){
            let tableNames = document.querySelectorAll('.file tbody td:first-child');
            if(tableNames.length > 0)
                tableNames.forEach( function(name){
                    lastNames.push(name.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                    lastNames.sort();
                });
            else
                console.log("Zadne jmena tam nejsou, kde jsou? Nejsou...");
        }
        
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

    </script>

    <script>
        $(function ($) {
            var options = {
                minimum: 1,
                maximize: 500,
                onChange: valChanged,
                onMinimum: function(e) {
                    console.log('reached minimum: '+e)
                },
                onMaximize: function(e) {
                    console.log('reached maximize'+e)
                }
            }
            $('#counter').handleCounter(options)
            $('#counter2').handleCounter(options)
			$('#counter3').handleCounter({minimum: 0})
        })
        function valChanged(d) {
//            console.log(d)
        }
    </script>
    <script src="js/formUpdate.js"></script>
    <script>
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
                document.querySelectorAll('.file-input')[0].classList.remove('file-input--active');
                
            }, false);
        
            if(supportDrag){   
                input.addEventListener("dragenter", function(e) {
                    document.querySelectorAll('.file-input')[0].classList.add('file-input--active');
                });

                input.addEventListener("dragleave", function(e) {
                    document.querySelectorAll('.file-input')[0].classList.remove('file-input--active');
                });
            }
        })();
    

    </script>
</body>
</html>