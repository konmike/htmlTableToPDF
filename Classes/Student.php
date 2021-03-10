<?php

class Student{
    //Properties
    public $lastname;
    public $firstname;
    public $email;
    // public $stav;
    public $start;
    public $konec;

    public $prohlaseni;

    public $answer1;
    public $answer2;
    public $answer3;
    // public $delkapokusu;
    // public $znamka;

    public $i = 1;
    public $j = 1;

    public function saveQuestion($text)
    {
        $this->{'question' . $this->j} = $text;
        $this->j++;
    }
    public function saveAnswer($text)
    {
        $this->{'answer' . $this->i} = $text;
        $this->i++;
    }

    public function toString(){
        echo $this->lastname . " " . $this->firstname . " " . $this->email;
        echo '</br>';
    }
}