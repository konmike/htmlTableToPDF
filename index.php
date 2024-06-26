<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML to PDF parser</title>
    <link rel="stylesheet" href="css\main.css">
    <link rel="stylesheet" href="node_modules\@fortawesome\fontawesome-free\css\all.min.css">
    <link href="node_modules\select2\dist\css\select2.min.css" rel="stylesheet" />
    <link href="node_modules\viewerjs\dist\viewer.min.css" rel="stylesheet" />
    
</head>
<body>
    <main role="main" class="main">
        <form action="makepdf.php" method="post" class="form" enctype="multipart/form-data">
        
            <div class="help help--upload">
                <span>Stáhněte si odevzdané práce studentů na webu moodle.prf.cuni.cz ve formátu HTML tabulka.</span>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M88.6,79c-29.2-8.5-59.2-24.6-69-55.2c3.7,1.6,7.4,3.2,11.2,4.8c2.3,1,4.3-2.4,2-3.4c-6.1-2.6-12.2-5.2-18.4-7.9  c-2.2-1-4.2,2.2-2.2,3.3c-0.2,0.3-0.4,0.6-0.4,1.1c-0.3,4.8-0.7,9.6-1,14.3c-0.7,2.9-1,5.8-0.6,8.9c0.3,2.5,3.8,2.6,3.9,0  c0.2-2.7,0.4-5.5,0.6-8.2c0.1-0.5,0.2-1,0.4-1.5c0.2-0.6,0.1-1.2-0.2-1.6c0.2-3.2,0.4-6.4,0.7-9.6c9.9,32.4,41.2,49.7,72,58.7  C90,83.5,91,79.7,88.6,79z"/></svg>
            </div>

            <div class="upload">
                <div class="file-infos">
                    <input class="input" id="js-file-input" name="myfile" type="file">
                    <p class="file-icon">
                        <i class="fas fa-file-upload fa-3x"></i>
                        <label class="label">Klikni/<span class="has-drag">přetáhni soubor</span></label>
                    </p>
                </div>
                <span class="file-name" id="js-file-name">Žádný soubor nebyl vybrán...</span>
            </div>
                
            <div class="number">
                <label class="label">Počet prací</label>
                <button class="btn sub" disabled></button>
                    <input class="input" readonly type="text" pattern="[0-9]+" value="0" name="pocetStudentu" >
                <button class="btn add" disabled></button>
            </div>
                     
            <div class="help help--pocet-uloh">
                <span>Počet úloh k vypracování (bez čestného prohlášení).</span>
            </div>

            <div class="number">
                <label class="label">Počet úloh</label>
                <button class="btn sub"></button>
                    <input class="input" type="text" pattern="[0-9]+" value="0" name="pocetUloh">
                <button class="btn add"></button>
            </div>
                
            <div class="checkbox">
                <span class="pseudo-label">Je součástí čestné prohlášení?</span>
                <input class="input" type="checkbox" id="isThereProhlaseni" name="isThereProhlaseni">
                <label class="label" for="isThereProhlaseni">
                    <a class="positive">Ano</a>
                    <a class="active negative">Ne</a>
                </label>
            </div>
        
            <div class="checkbox">
                <span class="pseudo-label">Chci tisknout prohlášení?</span>
                <input class="input" type="checkbox" id="printProhlaseni" name="printProhlaseni">
                <label class="label" for="printProhlaseni">
                    <a class="positive">Ano</a>
                    <a class="active negative">Ne</a>
                </label>
            </div>
        
            <div class="checkbox">
                <span class="pseudo-label">Chci tisknout zadání úloh?</span>
                <input class="input" type="checkbox" id="task" name="task">
                <label class="label" for="task">
                    <a class="active positive">Ano</a>
                    <a class="negative">Ne</a>
                </label>
            </div>

            <div class="checkbox">
                <span class="pseudo-label">Zahrnout všechny studenty</span>
                <input class="input" type="checkbox" id="include-all-students" name="include-all-students">
                <label class="label" for="include-all-students">
                    <a class="active positive">Ano</a>
                    <a class="negative">Ne</a>
                </label>
            </div>

            <div class="help help--jmena-studentu">
                <span>Jména jsou bez diakritiky, řazena abecedně.</span>
            </div>

            <div id="students-name" class="select">
                <label class="label">Jména vybraných studentů:</label>
            </div>

            <div class="radio">
                <legend class="legend">Způsob generování PDF</legend>
                <label class="label">
                    <input class="input" type="radio" name="resultOption" value="0" checked/>
                    <span>Každá práce do samostatného PDF</span>
                </label>
                <label class="label">
                    <input class="input" type="radio" name="resultOption" value="1" />
                    <span>Všechny práce v rámci jednoho PDF</span>
                </label>
                <label class="label">
                    <input class="input" type="radio" name="resultOption" value="2"/>
                    <span>Rozdělení prací do více PDF</span>
                </label>
            </div>

            <div class="number">
                <label class="label">Počet souborů:</label>
                <button class="btn sub"></button>
                    <input class="input" type="text" pattern="[0-9]+" value="2" min="2" name="pocetSouboru">
                <button class="btn add"></button>
            </div>

            <div class="help help--generated">
                <span id="rest"></span>
            </div>

            <div id="generated" class="generated">
            </div>                
            
            <input class="btn btn--submit btn--bg-fill" type="submit" value="Stáhnout">
            
        </form>

        <div id="images" class="moodle--images">
            <img src="./src/img/navod/1.png" alt="Jedna">
            <img src="./src/img/navod/2.png" alt="Dva">
            <img src="./src/img/navod/3.png" alt="Tři">
            <img src="./src/img/navod/4.png" alt="Čtyři">
        </div>
    </main>
    
    <div class="file"></div>
    <!-- <script src="node_modules/babel-polyfill/dist/polyfill.min.js" defer=""></script> -->
    <script src="./node_modules/jquery/dist/jquery.min.js"></script>
    <script src="./src/js/app.js" type="module"></script>
    
</body>
</html>