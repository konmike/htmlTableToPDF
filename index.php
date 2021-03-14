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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus repellendus odio deserunt. Adipisci, alias vero? Molestias magnam hic, recusandae nostrum quam odio iure ipsa consequuntur! Delectus porro facilis exercitationem officiis?
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