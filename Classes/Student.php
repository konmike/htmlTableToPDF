<?php

class Student
{
    //Properties
    public $lastname;
    public $firstname;
    public $email;
    // public $stav;
    public $start;
    public $konec;

    public $prohlaseni;

    public $i = 1;
    public $j = 1;

    public $questions = array();
    public $answers = array();

    public function saveQuestion($text)
    {
        $this->questions[$this->j] = $text;
        $this->j++;
    }

    public function saveAnswer($text)
    {
        $this->answers[$this->i] = $text;
        $this->i++;
    }

    public function toString()
    {
        echo $this->lastname . " " . $this->firstname . " " . $this->email;
        echo '</br>';
    }
}