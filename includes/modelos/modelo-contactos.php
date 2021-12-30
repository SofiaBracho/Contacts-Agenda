<?php

    if($_POST) {
        if($_POST['accion'] == 'crear') {
            //Crear un nuevo registro en la base de datos
    
            require_once('../funciones/bd.php');
    
            //Validar las variables
            $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
            $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
            $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
    
            try {
                $stmt = $conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?, ?, ?)");
                $stmt->bind_param("sss", $nombre, $empresa, $telefono);
                $stmt->execute();
    
                if($stmt->affected_rows == 1) {
                    $respuesta = array(
                        'respuesta' => 'exito',
                        'datos' => array(
                            'nombre' => $nombre,
                            'empresa' => $empresa,
                            'telefono' => $telefono,
                            'id_insertado' => $stmt->insert_id
                        )
                    );
                }
    
                $stmt->close();
                $conn->close();
            } catch(Exception $e) {
                $respuesta = array(
                    'error' => $e->getMessage()
                );
            }
            
            echo json_encode($respuesta);
        }

        if($_POST['accion'] == 'editar') {
            require_once('../funciones/bd.php');
    
            $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
            $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
            $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
            $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);

            try {
                $stmt = $conn->prepare("UPDATE contactos SET nombre = ?, empresa = ?, telefono = ? WHERE id_contacto = ? ");
                $stmt->bind_param("sssi", $nombre, $empresa, $telefono, $id);
                $stmt->execute();

                if($stmt->affected_rows == 1) {
                    $respuesta = array(
                        'respuesta' => 'exito'
                    );
                } else {
                    $respuesta = array(
                        'respuesta' => 'error'
                    );
                }
    
                $stmt->close();
                $conn->close();
            } catch(Exception $e) {
                $respuesta = array(
                    'error' => $e->getMessage()
                );
            }
            
            echo json_encode($respuesta);
    
        }
    }

    if($_GET) {
        if($_GET['accion'] == 'borrar') {
            require_once('../funciones/bd.php');

            $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

            try {
                $stmt = $conn->prepare("DELETE FROM contactos WHERE id_contacto = ? ");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                if($stmt->affected_rows == 1) {
                    $respuesta = array(
                        'resultado' => 'exito'
                    );
                }
                
                $stmt->close();
                $conn->close();
            } catch(Exception $e) {
                $respuesta = array(
                    'error' => $e->getMessage()
                );
            }
            echo json_encode($respuesta);
        }
    }
?>