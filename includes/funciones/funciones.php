<?php

    function obtenerContactos() {
        include 'bd.php';
        try{
            return $conn->query("SELECT id_contacto, nombre, empresa, telefono FROM contactos ");
        } catch(Exception $e){
            echo 'Error!' . $e->getMessage() . '<br>';
            return false;
        }
    }

    function obtenerContacto($id) {
        include 'bd.php';
        try{
            return $conn->query("SELECT id_contacto, nombre, empresa, telefono FROM contactos WHERE id_contacto = $id ");
        } catch(Exception $e){
            echo 'Error!' . $e->getMessage() . '<br>';
            return false;
        }
    }