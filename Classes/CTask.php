<?php

class CTask
{
    public $i = 0;
    public $tasks = array();

    public function createTask($text)
    {
        $this->tasks[$this->i] = $text;
        $this->i++;
    }

    public function test()
    {
        var_dump($this->tasks);
    }
}