//Constructires
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() {}

//Llena las opciones de los años
UI.prototype.llenaOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');
    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Mostrar mensajes
UI.prototype.mostrarMensaje = (msj, tipo) => {
    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error');
    } else { 
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = msj;

    //Insertar en el formulario
    const frm = document.querySelector('#cotizar-seguro');
    frm.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
}

//Instanciar UI
const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
    ui.llenaOpciones(); //Llena el señect con los años
})


eventListeners();
function eventListeners() {
    const frm = document.querySelector('#cotizar-seguro');
    frm.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    //Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    //Leer el año seleccionado
    const year = document.querySelector('#year').value;

    //Leer el tipo de cobertura del seguro
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        return ui.mostrarMensaje('Todos los campos son onligatorios', 'error');
    }

    ui.mostrarMensaje('Cotizando...', 'exito');
}