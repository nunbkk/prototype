<?php
$tspccBase = rtrim(str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME']))), '/') . '/';
require dirname(__DIR__) . '/_site.php';
