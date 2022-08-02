//----------------------------peticiones---------------------------//

//se guardan los usuarios
const postUserAccount = async (user) =>{
    return await axios.post('http://localhost:3000/api/registrar-usuario', user);
}

//se obtienen los usuarios de la bd
const  getUserAccount = async () =>{
    return await axios.get('http://localhost:3000/api/obtener-usuarios');
}

//se obtienen los usuarios de la bd
const  delUserAccount = async (user) =>{
    return await axios.delete(`http://localhost:3000/api/eliminar-usuarios/${user}`);
}

const updateUserFond = async (user) =>{
    return await axios.put('http://localhost:3000/api/actualizar-fondos', user);
}


//funcion que haga la resta de mensualidad a fondos
function calcularResta(par1,par2){
    let resta = par1 - par2
    return resta
}

//funcion que actualiza tabla de users
function tableUpdate(userData){
    $(".rows").append(`
    <tr>
        <td>${userData.dataUser.nombre}</td>
        <td>${userData.dataUser.apellido}</td>
        <td>${userData.dataUser.email}</td>
        <td>${userData.dataUser.mensualidad}</td>
        <td id="fondo_${userData.dataUser._id}">${userData.dataUser.fondos}</td>
        <td id="eliminar" data-id="${userData.dataUser._id}">Eliminar</td>
        <td id="cobrar" data-id="${userData.dataUser._id}" data-fondos="${userData.dataUser.fondos}"  data-mensualidad="${userData.dataUser.mensualidad}">Cobrar</td>
    </tr>`);
}

//funcion que reciba dos parametros y elimine el usuario que tenga esos datos

const validacionEventos = async(type, value, event) =>{
    if(type == "eliminar"){
        
        $(`#${value}`).remove();
         console.log(await delUserAccount(value))

    }else if(type == "cobrar"){

        let resultado = calcularResta(event.target.dataset.fondos, event.target.dataset.mensualidad);

        console.log(resultado)

        if(resultado >= 0){
            
            updateUserFond({_id:value, fondos: resultado});
            $(`#fondo_${value}`).text(resultado)

            event.target.dataset.fondos = resultado

        }else{
            $(`#fondo_${value}`).addClass("errorCobro")
        }

    }
};




//-------------------------ejecuciones--------------------------------//


//funcion que registra usuarios
function registrarUser(){
    //object user data info from inputs
    let obj = {
        nombre: $("#nombre").val(),
        apellido: $("#apellido").val(),
        email:$("#email").val(),
        mensualidad:$("#mensualidad").val(),
        fondos: $("#fondos").val()
    }

    //post request and table update 
    postUserAccount(obj).then((response)=>{
        tableUpdate(response.data);
    })
}


//se accede al array y se obtiene la infomacion de cada usuario
getUserAccount().then((response)=>{
    response.data.usuarios.map((user)=>{
        $( ".rows" ).append(`
        <tr id="${user._id}">
            <td>${user.nombre}</td>
            <td>${user.apellido}</td>
            <td>${user.email}</td>
            <td>${user.mensualidad}</td>
            <td id="fondo_${user._id}">${user.fondos}</td>
            <td id="eliminar" data-id="${user._id}">Eliminar</td>
            <td id="cobrar" data-id="${user._id}" data-fondos="${user.fondos}"  data-mensualidad="${user.mensualidad}">Cobrar</td>
        </tr>`);
    })
})



//------------------eventListeners-----------------------------

$(document).on('click', (e)=>{
    e.preventDefault();
    validacionEventos(e.target.id, e.target.dataset.id,e);
})

