<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML to PDF parser</title>
    <link rel="stylesheet" href="css\main.css">
    <link rel="stylesheet" href="node_modules\@fortawesome\fontawesome-free\css\all.min.css">
    <link href="node_modules\select2\dist\css\select2.min.css" rel="stylesheet" />
    
</head>
<body>
    <main role="main" class="main">
        <aside class="help help__left">
            <ul>
                <li>
                    Stáhněte si odevzdané práce studentů na webu moodle.prf.cuni.cz ve formátu HTML tabulka.
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M88.6,79c-29.2-8.5-59.2-24.6-69-55.2c3.7,1.6,7.4,3.2,11.2,4.8c2.3,1,4.3-2.4,2-3.4c-6.1-2.6-12.2-5.2-18.4-7.9  c-2.2-1-4.2,2.2-2.2,3.3c-0.2,0.3-0.4,0.6-0.4,1.1c-0.3,4.8-0.7,9.6-1,14.3c-0.7,2.9-1,5.8-0.6,8.9c0.3,2.5,3.8,2.6,3.9,0  c0.2-2.7,0.4-5.5,0.6-8.2c0.1-0.5,0.2-1,0.4-1.5c0.2-0.6,0.1-1.2-0.2-1.6c0.2-3.2,0.4-6.4,0.7-9.6c9.9,32.4,41.2,49.7,72,58.7  C90,83.5,91,79.7,88.6,79z"/></svg>
                </li>
            </ul>
        </aside>

        <form action="makepdf.php" method="post" class="form" enctype="multipart/form-data">
        
            <div class="upload">
                <div class="file-infos">
                    <input class="input" id="js-file-input" name="myfile" type="file">
                    <p class="file-icon">
                        <i class="fas fa-file-upload fa-3x"></i>
                        <label class="label">Zde klikni/<span class="has-drag">přetáhni soubor</span></label>
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
                        
            <div class="number">
                <label class="label">Počet úloh</label>
                <button class="btn sub"></button>
                    <input class="input" type="text" pattern="[0-9]+" value="0" name="pocetUloh">
                <button class="btn add"></button>
            </div>
                
            <div class="checkbox">
                <span class="pseudo-label">Je součástí čestné prohlášení?</span>
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
                <span class="pseudo-label">Chci tisknout zadání úloh?</span>
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

            <div id="students-name" class="select">
            <label class="label">Jména vybraných studentů:</label>
            </div>

            <div class="radio">
                <legend class="legend">Způsob generování PDF</legend>
                <label class="label">
                    <input class="input" type="radio" name="resultOption" value="0" checked/>
                    <span>Každá práce do samostaného PDF</span>
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

            <div id="generated" class="generated">
            </div>                
            
            <input class="btn btn--submit btn--bg-fill" type="submit" value="Stáhnout">
            
        </form>

        <aside class="help help__right">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit provident nobis ratione nemo animi, illum fugit quo veniam ad quam exercitationem possimus, maxime asperiores sint aspernatur iusto libero? Delectus, eaque.
        </aside>
    </main>
    
    <div class="file"></div>
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="js/app.js" type="module"></script>
    
</body>
</html>