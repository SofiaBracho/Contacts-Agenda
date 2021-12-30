<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
            type="text" 
            id="nombre" 
            placeholder="Nombre contacto"
            value="<?php echo (isset($contacto['nombre'])) ? $contacto['nombre'] : '';?>"
        >
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input 
            type="text" 
            id="empresa" 
            placeholder="Empresa contacto"
            value="<?php echo (isset($contacto['empresa'])) ? $contacto['empresa'] : ''; ?>"
        >
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input 
            type="tel" 
            id="telefono" 
            placeholder="Teléfono contacto"
            value="<?php echo (isset($contacto['telefono'])) ? $contacto['telefono'] : ''; ?>"
        >
    </div>
</div>
<div class="campo enviar">
    <?php 
        $textoBtn = (isset($contacto['nombre'])) ? 'Guardar' : 'Añadir';
        $accion = (isset($contacto['nombre'])) ? 'editar' : 'crear';
    ?>
    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if(isset($contacto['id_contacto'])) { ?>
        <input type="hidden" id="id" value="<?php echo $contacto['id_contacto']; ?>"> 
    <?php } ?> 
    <input type="submit" value="<?php echo $textoBtn; ?>">
</div>