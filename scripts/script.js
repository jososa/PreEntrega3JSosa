class Prestamo{
    constructor(importe, tasa, cuotas, montoCuota, montoTotal, fechaVencimiento){
        this.importe = importe;
        this.tasa = tasa;
        this.cuotas = cuotas;
        this.montoCuota = montoCuota;
        this.montoTotal = montoTotal;
        this.fechaVencimiento = fechaVencimiento;
    }
}
const prestamos = [];

function calcularPrestamo(){

    //Obtengo los datos solicitados: importe, tasa, cantidad de cuotas
    const ahora = new Date();
    let importe = prestamos[0].capital;
    let tasa = prestamos[0].tasa;
    let cuotas = prestamos[0].cuotas;

        //calculo interes para obtener cuota mensual y total a pagar
        let interes = tasa/1200;
        let tasaInteres = calcularPotencia(interes + 1, cuotas);
        let montoCuota = importe * interes * tasaInteres / (tasaInteres - 1);
        let montoTotal = montoCuota * cuotas;

        //muestro el resultado
        prestamos.push(new Prestamo(importe, tasa, cuotas, montoCuota.toFixed(2), montoTotal.toFixed(2)));
        let mensaje = document.createElement('div');
        prestamos.forEach((prestamo) => {
        mensaje.innerHTML = `<p>La cuota mensual de su préstamo es de $${prestamo.montoCuota} y el monto total a pagar es $${prestamo.montoTotal}</p>`;
        });

        //Muestro grilla de cuotas
        const  listaCuotas = [];
        for(let i = 0; i < cuotas; i++)
        {
         ahora.setMonth(ahora.getMonth() + 1)
         listaCuotas.push({ nroCuota:i+1, montoCuota:montoCuota.toFixed(2), fechaVencimiento:ahora.toLocaleDateString() });
        }

        let tabla = document.createElement("table");
         listaCuotas.map((lstCuota)=>{
            tabla.innerHTML += (`
            <tr>
                <th>NroCuota:</th>
                <th>Monto:</th>
                <th>Vto proxima cuota:</th>
            </tr>
    
            <tr>
                <td>${lstCuota.nroCuota}</td>
                <td>${lstCuota.montoCuota}</td>
                <td>${lstCuota.fechaVencimiento}</td>
            </tr>
            `)

         });        
        document.body.append(mensaje);
        document.body.append(tabla);
}

//Valido ingreso de datos
function validarDatos(dato){
    if(isNaN(dato) || dato === 0){
        return false;
    }
    else{
        return true;
    }
}

//Calculo la potencia
function calcularPotencia(base, exponente){
    let resultado=1;
    for(let i=0; i < exponente; i++){
        resultado *= base;
    }
    return resultado;
}

//Genero todo el html del formulario dinámico para solicitar los datos
const App = () => {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
    <form action="" class="form-container-body" id="form">
    <div class="container-header">
        <h2>Ingrese los datos solicitados:</h2>
    </div>
    <div class="usuario">
    
    </div>
    <div id="form-container-inputs">
    <div>
        <label for="nombre">Ingrese su nombre:</label>
        <input id="nombre" placeholder="Nombre" type"text required">
    </div>
    <div>
        <label for="apellido">Ingrese su apellido:</label>
        <input id="apellido" placeholder="Apellido" type"text required">
    </div>
    <div>
        <label for="capital">Ingrese capital solicitado:</label>
        <input id="capital" placeholder="Capital solicitado" type"text required">
    </div>
    <div>
        <label for="tasa">Ingrese tasa de interes:</label>
        <input id="tasa" placeholder="Tasa de interes" type"text required">
    </div>
    <div>
        <label for="cuotas">Ingrese cantidad de cuotas:</label>
        <input id="cuotas" placeholder="Cantidad de cuotas" type"text required">
    </div>
    
    <div class="error">
    <p id="mensajeError"></p>
    </div>
        
    </div>
    <button class="save-button" id="save-button">Calcular</button>
    </form>
    `;
    document.body.append(contenedor);
    
    const form = document.querySelector('#form');
    form.addEventListener('submit',agregarPrestamo);    
}

App();


//obtengo y valido los datos ingresados en el formulario para guardar en el localStorage y llamar la funcion calcularPrestamo()
function agregarPrestamo(e){
    e.preventDefault();

    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const capital = parseInt(form.capital.value);
    const tasa = parseInt(form.tasa.value);
    const cuotas = parseInt(form.cuotas.value);
    
    const warning = document.querySelector('#mensajeError');

    if(nombre.length > 0 && apellido.length > 0 && validarDatos(capital) && validarDatos(tasa) && validarDatos(cuotas)){
        warning.style.display="none";
        const prestamo = {
            nombre,
            apellido,
            capital,
            tasa,
            cuotas
        }
        prestamos.push(prestamo);
        
        localStorage.setItem('datosPrestamo',JSON.stringify(prestamos));
        saludar();
        calcularPrestamo();
    }
    else{
        warning.innerHTML = `
            <div>
                <h3>Por favor verifique los datos ingresados sean correctos</h3>
            </div>
            `;
        document.body.append(warning);
    }
}

    //Muestro el nombre y apellido del del ususario desde localStorage
    function saludar(){
        const user = document.createElement('div');
        user.innerHTML='';
        const hola = JSON.parse(localStorage.getItem('datosPrestamo'));
        if(hola){
            hola.forEach((item) => {
            user.innerHTML=`<span>Bienvenida/o ${item.nombre} ${item.apellido}!</span>`;
            })
        document.body.append(user);
        }
        else{
            user.innerHTML='';
        }
    }

    saludar();