<?php

class CTask{
    public $i = 1;
    public $printProhlaseni = "";

    public function createTask($text)
    {
        $this->{'task' . $this->i} = $text;
        $this->i++;
    }

    public function test() {
        var_dump(get_object_vars($this));
    }
}