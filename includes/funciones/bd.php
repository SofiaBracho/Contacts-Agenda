<?php
    define('BD_USUARIO', 'root');
    define('BD_PASSWORD', '');
    define('BD_HOST', 'localhost');
    define('BD_NOMBRE', 'agendaphp');
    
    $conn = new mysqli(BD_HOST, BD_USUARIO, BD_PASSWORD, BD_NOMBRE);

    // echo $conn->ping();