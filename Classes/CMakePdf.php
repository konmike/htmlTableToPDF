<?php

class CMakePdf{

    /*
    * varianta vsichni studenti = jedno pdf
    */
    public function onePdfAllStudents($students,$pocetUloh,$zadani,$task,$prohlaseni){
        $mpdf = new \Mpdf\Mpdf();
        foreach ($students as $item) {
            $mpdf->SetHeader($item->lastname . ' ' . $item->firstname);
            $mpdf->SetFooter('{PAGENO}');
            $nextItem = next($students);
            
            $mpdf->WriteHTML($item->email . '<br>'); 
            $mpdf->WriteHTML('<i><u>Začátek testu: </u></i>' . $item->start . '<br>');
            $mpdf->WriteHTML('<i><u>Konec testu: </u></i>' . $item->konec . '<br><br>');
        
            if($prohlaseni == 'Ano'){
                $mpdf->WriteHTML('<b><u>Prohlášení:</u></b>');
                $mpdf->WriteHTML($task->printProhlaseni);
                $mpdf->WriteHTML('<br>');
                
                $mpdf->WriteHTML($item->prohlaseni);
                $mpdf->WriteHTML('<br>');
            }

            for ($t=1; $t <= $pocetUloh; $t++) {
        
                if($zadani == 'Ano'){
                    $mpdf->WriteHTML('<b><u>Úloha ' . $t . ':</u></b>');
                    $mpdf->WriteHTML($item->{'question' . $t});
                    $mpdf->WriteHTML('<br>');
                }
        
                $mpdf->WriteHTML('<b><u>Odpověď ' . $t . ':</u></b>');
                $mpdf->WriteHTML($item->{'answer' . $t});
                $mpdf->WriteHTML('<br>');
            }
            $mpdf->SetHeader($nextItem->lastname . ' ' . $nextItem->firstname);
            $mpdf->WriteHTML('<pagebreak resetpagenum="1"/>');
        }

        $mpdf->Output("vsichni_studenti.pdf", D);
    }

    /*
    * Varianta jeden student = jedno pdf
    */
    public function onePdfPerStudent($students,$pocetUloh,$zadani,$task,$prohlaseni){
        $zip = new ZipArchive();
        $zipFile = tempnam('./tmp', 'zip');
        $zip->open($zipFile, ZipArchive::CREATE);

        foreach ($students as $item) {
            $mpdf = new \Mpdf\Mpdf();
            $mpdf->SetHeader($item->lastname . ' ' . $item->firstname);
            $mpdf->SetFooter('{PAGENO}');
            $mpdf->WriteHTML($item->email . '<br>'); 
            $mpdf->WriteHTML('<i><u>Začátek testu: </u></i>' . $item->start . '<br>');
            $mpdf->WriteHTML('<i><u>Konec testu: </u></i>' . $item->konec . '<br><br>');

            if($prohlaseni == 'Ano'){
                $mpdf->WriteHTML('<b><u>Prohlášení:</u></b>');
                $mpdf->WriteHTML($task->printProhlaseni);
                $mpdf->WriteHTML('<br>');
                
                $mpdf->WriteHTML($item->prohlaseni);
                $mpdf->WriteHTML('<br>');
            }

            for ($t=1; $t <= $pocetUloh; $t++) {

                if($zadani == 'Ano'){
                    $mpdf->WriteHTML('<b><u>Úloha ' . $t . ':</u></b>');
                    $mpdf->WriteHTML($item->{'question' . $t});
                    $mpdf->WriteHTML('<br>');
                }

                $mpdf->WriteHTML('<b><u>Odpověď ' . $t . ':</u></b>');
                $mpdf->WriteHTML($item->{'answer' . $t});
                $mpdf->WriteHTML('<br>');
            }
            $pdfData = $mpdf->Output("", \Mpdf\Output\Destination::STRING_RETURN);
            $zip->addFromString("{$item->lastname}-{$item->firstname}.pdf", $pdfData);
        }
        
        $zip->close();

        header("Content-type: application/zip");
        header('Content-Disposition: attachment; filename=Documents.zip'); 
        readfile($zipFile);

        unlink($zipFile);
    }

    /*
    * Varianta rozdělit studenty do souborů po skupinách
    * předem dané počty
    */
    public function groupStudentsToPdf($from, $to, $students,$pocetUloh,$zadani,$task,$prohlaseni){
        $mpdf = new \Mpdf\Mpdf();
    
        for ($x=$from; $x < $to; $x++) { 
            $next = $x + 1;
            $mpdf->SetHeader($students[$x]->lastname . ' ' . $students[$x]->firstname);
            $mpdf->SetFooter('{PAGENO}');
            
            $mpdf->WriteHTML($students[$x]->email . '<br>'); 
            $mpdf->WriteHTML('<i><u>Začátek testu: </u></i>' . $students[$x]->start . '<br>');
            $mpdf->WriteHTML('<i><u>Konec testu: </u></i>' . $students[$x]->konec . '<br><br>');
        
            if($prohlaseni == 'Ano'){
                $mpdf->WriteHTML('<b><u>Prohlášení:</u></b>');
                $mpdf->WriteHTML($task->printProhlaseni);
                $mpdf->WriteHTML('<br>');
                
                $mpdf->WriteHTML($students[$x]->prohlaseni);
                $mpdf->WriteHTML('<br>');
            }

            for ($t=1; $t <= $pocetUloh; $t++) {
        
                if($zadani == 'Ano'){
                    $mpdf->WriteHTML('<b><u>Úloha ' . $t . ':</u></b>');
                    $mpdf->WriteHTML($students[$x]->{'question' . $t});
                    $mpdf->WriteHTML('<br>');
                }
        
                $mpdf->WriteHTML('<b><u>Odpověď ' . $t . ':</u></b>');
                $mpdf->WriteHTML($students[$x]->{'answer' . $t});
                $mpdf->WriteHTML('<br>');
            }
            
            if($x + 1 != $to){
                $mpdf->SetHeader($students[$next]->lastname . ' ' . $students[$next]->firstname);
                $mpdf->WriteHTML('<pagebreak resetpagenum="1"/>');
            }
        }
    
        $pdfData = $mpdf->Output("", \Mpdf\Output\Destination::STRING_RETURN);
        return $pdfData;
    }

}