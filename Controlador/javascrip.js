var starCountRef = firebase.database().ref("Propietarios").orderByKey();


$(".show").on("click", function(){
  $(".mask").addClass("active");
});

// Function for close the Modal

function closeModal(){
  $(".mask").removeClass("active");
}

// Call the closeModal function on the clicks/keyboard

$(".close, .mask").on("click", function(){
  closeModal();
});

$(".show2").on("click", function(){
  $(".mask2").addClass("active2");
});

// Function for close the Modal

function closeModal2(){
  $(".mask2").removeClass("active2");
}

// Call the closeModal function on the clicks/keyboard

$(".close2, .mask2").on("click", function(){
  closeModal2();
});


function mostrarPropietario(argument) {
  // body...
    starCountRef.once('value').then(function(snapshot) {
    snapshot.forEach(function(doc) {
      // key will be "ada" the first time and "alan" the second time
     
   var texto = '<tr>'+
               '<td>'+doc.val().nombre+'</td>'+
               '<td>'+doc.val().apellido+'</td>'+
               '<td>'+doc.val().dirreccion+'</td>'+
               '<td>'+doc.val().telefono+'</td>'+
               '<td><button  class="show btn btn-enlace" id="btn6  '+'+'+doc.val().nombre+'+'+doc.val().apellido+'+'+doc.val().telefono+'"  aria-haspopup="true" onclick="datos(this.id)">agregar mascota</button></td>'+
               '</tr>';

$('#tablaPro').append(texto);

  console.log(texto);

  });
});
}


mostrarPropietario();

function datos(argument) {
  // body...
  var res = argument.split("+");
  $('#ApeDueño').val(res[1]);
  $('#NomDueño').val(res[2]);
    $(".mask").addClass("active");
    console.log(res[3]);

let usersRe = firebase.database().ref('Mascotas'); 
usersRe.orderByChild('apellidop').equalTo(res[1]).on("value", function(snapshot) { 
    snapshot.forEach(function(doc) { 

         var textox = '<tr>'+
               '<td>'+doc.val().nombre+'</td>'+
               '<td>'+doc.val().tipo+'</td>'+
               '<td>'+doc.val().fecha+'</td>'+
               '</tr>';

          $('#TablaMascotas').append(textox);


    
    }); 

}); 
  console.log(argument);
}

function agregarmascota() {

  var id = new Date(); 
  var nombre = $('#nombrecan').val();
  var tipo = $('#tipocan').val();
  var fecha = $('#datepicker').val();
  var nombrep = $('#NomDueño').val();
  var apellidop = $('#ApeDueño').val();

  firebase.database().ref().child('Mascotas/'+id).set({
  nombre: nombre,
  tipo: tipo,
  fecha: fecha,
  nombrep:nombrep,
  apellidop:apellidop

  });
  closeModal();
}

function agregarpropietario() {
	// body...
  var nombre = $('#nombreus').val();
  var apellido = $('#apellidous').val();
  var dirreccion = $('#dirus').val();
  var telefono = $('#telus').val();

  firebase.database().ref().child('Propietarios/'+telefono).set({
  telefono: telefono,
  apellido: apellido,
  dirreccion: dirreccion,
  nombre: nombre

  });
	
	  closeModal2();
    mostrarPropietario();
}


