<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/Classes/Student.php';
require_once __DIR__ . '/Classes/CTask.php';
require_once __DIR__ . '/Classes/CMakePdf.php';
// function __autoload($class_name) {
//     require_once "Classes" . $class_name . '.php';
// }

$pocetStudentu = $_POST['pocetStudentu'];
$pocetUloh = $_POST['pocetUloh'];

$isThereProhlaseni = (isset($_POST['isThereProhlaseni'])) ? 'Ano' : 'Ne';
$printProhlaseni = (isset($_POST['printProhlaseni'])) ? 'Ano' : 'Ne';
$zadani = (isset($_POST['task'])) ? 'Ano' : 'Ne';
$zahrnoutVse = (isset($_POST['include-all-students'])) ? 'Ano' : 'Ne';

$resultOption = $_POST['resultOption'];

if ($resultOption == 2) {
    $pocetSouboru = $_POST['pocetSouboru'];
    $generatedInputs = $_POST['gI'];

    // echo count($generatedInputs) . '<br>';
}

if ($zahrnoutVse == 'Ne') {
    $jmenaStudentu = $_POST['names'];
    // foreach ($jmenaStudentu as $student) {
    //     echo $student;
    //     echo '<br>';
    // }
}

//Zprovozněno přes nahrávací tlačítko
$oldPath = $_FILES['myfile']['tmp_name'];
$newPath = './tmp/' . basename($_FILES['myfile']['name']);
move_uploaded_file($oldPath, $newPath);
$fileContent = file_get_contents($newPath);

$dom = new DOMDocument();
libxml_use_internal_errors(true);

//--- pouze pro testovací účely - nejak prestalo fungovat
// $dom->loadHTMLFile('h:\Downloads\19bHP1000x01-odpovědi.html');

// zapnout pro běžný provoz
$dom->loadHTML($fileContent);


$data = $dom->getElementsByTagName("td");
//echo $data[3]->nodeValue;
$i = 0;
$j = 0;



$task = new CTask();

$z = ($isThereProhlaseni == 'Ano') ? (10) : (8);
if ($printProhlaseni == 'Ano')
    $task->printProhlaseni = $data[8]->nodeValue;

// echo $data[8]->nodeValue . '<br>';

if ($zadani == 'Ano') {
    for ($q = 0; $q < $pocetUloh; $q++) {
        $task->createTask($data[$z]->nodeValue);
        // echo $data[$z]->nodeValue . '<br>';
        $z += 2;
    }
}

$count = 0;
$students = [];
while (true) {
    // echo $td->nodeValue;
    $student = new Student();
    $student->lastname = $data[$i]->nodeValue;
    // echo $data[$i]->nodeValue. ' - '. $i . '<br>';
    $i++;

    $student->firstname = $data[$i]->nodeValue;
    // echo $data[$i]->nodeValue. ' - '. $i . '<br>';
    $i++;

    $student->email = $data[$i]->nodeValue;
    // echo $data[$i]->nodeValue. ' - '. $i . '<br>';
    //$student->toString();
    $i += 2;

    $student->start = $data[$i]->nodeValue;
    // echo $data[$i]->nodeValue. ' - '. $i . '<br>';
    $i++;

    $student->konec = $data[$i]->nodeValue;
    // echo $data[$i]->nodeValue. ' - '. $i . '<br>';
    $i += 3;

    if ($isThereProhlaseni == 'Ano') {
        $i++;
        if ($printProhlaseni == 'Ano')
            $student->prohlaseni = $data[$i]->nodeValue;
        //echo $data[$i]->nodeValue. ' - '. $i . '<br><br>';
        $i++;
    }
    //!!! if($zadani == 'Ano')

    for ($w = 0; $w < $pocetUloh; $w++) {
        $student->saveQuestion($data[$i]->nodeValue);
        // echo $data[$i]->nodeValue. ' - '. $i . '<br>';
        $i++;
        $student->saveAnswer($data[$i]->nodeValue);
        // echo $data[$i]->nodeValue. ' - '. $i . '<br>';
        //!!! if($w+1 != $pocetUloh && $zadani == 'Ano')
        $i++;
        //!!! else if($w+1 != $pocetUloh && $zadani == 'Ne')
        //!!!     $i++;
    }

    // echo 'Jdeme na dalsiho - '.$i.'<br>';
    //$i++;
    $count++;
    //echo $count.'<br>';
    array_push($students, $student);

    if ($count == $pocetStudentu) {

        // foreach ($students as $element) {
        //     $element->toString();
        // }
        break;
    }
}

if ($zahrnoutVse == 'Ne') {
    $transliterator = Transliterator::createFromRules(':: Any-Latin; :: Latin-ASCII; :: NFD; :: [:Nonspacing Mark:] Remove; :: NFC;', Transliterator::FORWARD);

    $vyvoleni = [];
    foreach ($students as $student) {
        // echo 'Pocet: ' . count($jmenaStudentu) . '<br>';
        // echo 'Porovnej: ' . $transliterator->transliterate($student->lastname) . '<br>';
        foreach ($jmenaStudentu as $jmeno) {
            // echo $jmeno . '<br>';

            if ($jmeno == $transliterator->transliterate($student->lastname)) {
                // echo $student->lastname . ' ' . $student->email . '<br>';
                array_push($vyvoleni, $student);
                continue;
            }
            // echo count($vyvoleni) . '<br>';
        }
        if (count($jmenaStudentu) == count($vyvoleni)) {
            // echo count($jmenaStudentu) . '<br>';        
            // echo count($vyvoleni) . '<br>';
            // echo 'hello' . '<br>';
            break;
        }
    }
}

// foreach ($vyvoleni as $student) {
//     echo $student->lastname . ' ' . $student->email . '<br>';
// }



// usort($students, function($a, $b) {
//     $collator = new Collator('cs');
//     $arr = array($a['lastname'], $b['lastname']);
//     collator_sort($collator, $arr, Collator::SORT_STRING);

//     return array_pop($arr) == $a['lastname'];
// });



$makepdf = new CMakePdf();

if ($resultOption == 0) {
    if ($zahrnoutVse == 'Ano')
        $makepdf->onePdfPerStudent($students, $pocetUloh, $zadani, $task, $printProhlaseni);
    else
        $makepdf->onePdfPerStudent($vyvoleni, $pocetUloh, $zadani, $task, $printProhlaseni);
} else if ($resultOption == 1) {
    if ($zahrnoutVse == 'Ano')
        $makepdf->onePdfAllStudents($students, $pocetUloh, $zadani, $task, $printProhlaseni);
    else
        $makepdf->onePdfAllStudents($vyvoleni, $pocetUloh, $zadani, $task, $printProhlaseni);
} else {
    $zip = new ZipArchive();
    $zipFile = tempnam('./tmp', 'zip');
    $zip->open($zipFile, ZipArchive::CREATE);

    $index = 0;
    for ($a = 0; $a < count($generatedInputs); $a++) {
        $curr = $a;

        if ($a == 0) {
            if ($zahrnoutVse == 'Ano')
                $t_pdfData = $makepdf->groupStudentsToPdf($a, $generatedInputs[$curr], $students, $pocetUloh, $zadani, $task, $printProhlaseni);
            else
                $t_pdfData = $makepdf->groupStudentsToPdf($a, $generatedInputs[$curr], $vyvoleni, $pocetUloh, $zadani, $task, $printProhlaseni);
        } else {
            if ($zahrnoutVse == 'Ano')
                $t_pdfData = $makepdf->groupStudentsToPdf($index, ($index + $generatedInputs[$curr]), $students, $pocetUloh, $zadani, $task, $printProhlaseni);
            else
                $t_pdfData = $makepdf->groupStudentsToPdf($index, ($index + $generatedInputs[$curr]), $vyvoleni, $pocetUloh, $zadani, $task, $printProhlaseni);
        }

        ($zahrnoutVse == 'Ano') ? ($zip->addFromString("{$students[$index]->lastname}-{$students[$index + $generatedInputs[$curr] - 1]->lastname}.pdf", $t_pdfData)) : ($zip->addFromString("{$vyvoleni[$index]->lastname}-{$vyvoleni[$index + $generatedInputs[$curr] - 1]->lastname}.pdf", $t_pdfData));

        $index += $generatedInputs[$curr];
    }

    $zip->close();
    ob_end_clean();

    header("Content-type: application/zip");
    header('Content-Disposition: attachment; filename=Documents.zip');
    readfile($zipFile);

    unlink($zipFile);
}

// pro delete dočasně uloženého souboru
unlink($newPath);
