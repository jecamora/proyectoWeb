$(document).ready(function() {
    var table = $('#tableHere').append("<table>");
});

function añadirFila() {
    var nuevoTr = "<tr></tr>";
    table.append(nuevoTr);
}
$("#agregar").click(function() {
    addRow();
});