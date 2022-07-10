import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import SelectCargo from '../Service/SelectCagos';
import SelectSexo from '../Service/SelectSexo';
import SelectProvincia from '../Service/SelectProvincia';
import SelectNivelAcademico from '../Service/SelectNivelAcademico';
import SelectMunicipio from '../Service/SelectMunicipio';
import Selectgruposanguineo from '../Service/Selectgruposanguineo';
import SelectCategoria from '../Service/SelectCategoria';
import SelectCivil from '../Service/SelectCivil';
import SelectNacionalidad from '../Service/SelectNacionalidad';
import SelectTallas from '../Service/SelectTallas';

const Formulario = () => {

    const [formulario, setFormulario] = useState([]);
    const agregarHijo = (e) => {
        e.preventDefault()
        const hijos = {
            id: "",
            nombre: ""
        }
        setFormulario([...formulario, ...[hijos]]);
        console.log(hijos)
    }

    const Eliminarhijo = (h) => {

        const hijosremovido = formulario.filter((hijo) => hijo !== h)
        console.log(hijosremovido)
        setFormulario(hijosremovido)
    }

    //peticiones de select
    const [cargo, setcargo] = useState([]);
    const [sexo, setsexo] = useState([]);
    const [nacionalidad, setnacionalidad] = useState([]);
    const [civil, setcivil] = useState([]);
    const [gruposanguineo, setgruposanguineo] = useState([]);
    const [tallas, settallas] = useState([]);
    const [municipio, setmunicipio] = useState([]);
    const [provincia, setpronvincia] = useState([]);
    const [categoria, setcategoria] = useState([]);
    const [nivelacademico, setnivelacademico] = useState([]);
    const [loading, setLoading] = useState(false);

    const [nivelSuperior, setNivelSuperior] = useState(false);

    const cambiarNivel = (e) => {
        const resultado = nivelacademico.filter((n) => n.nivelAcademicoId == e.target.value)
        if (resultado.length > 0) {
            let nivel = resultado[0]
            setNivelSuperior(nivel.requiereNombre);
        }
    }

    useEffect(() => {
        SelectCargo().then(datos => setcargo(datos));
        SelectSexo().then(data => setsexo(data));
        SelectNacionalidad().then(data => setnacionalidad(data));
        SelectCivil().then(data => setcivil(data));
        Selectgruposanguineo().then(data => setgruposanguineo(data));
        SelectTallas().then(data => settallas(data));
        SelectCategoria().then(data => setcategoria(data));
        SelectProvincia().then(data => setpronvincia(data));
        SelectMunicipio().then(data => setmunicipio(data));
        SelectNivelAcademico().then(data => setnivelacademico(data));
    }, []);

    //check input
    //const [checkpasaporte, setcheckpasaporte] = useState(false)
    const [checkcuenta, setcheckcuenta] = useState(false)
    const [checknss, setchecknss] = useState(false)
    const [checklicencia, setchecklicencia] = useState(false)
    const [checkempleado, setcheckempleado] = useState(false)
    const [checkotrainstitucion, setcheckotrainstitucion] = useState(false)
    const [checksabenadar, setchecksabenadar] = useState(false)
    const [checksabeconducir, setchecksabeconducir] = useState(false)

    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

    const Input = ({ field, form }) => (
        useEffect(() => {
            form.validateForm();
        }, [])
    )

    return (
        <>
            <div className="formulario ">
                <div className="card-body ml-5">
                    <Formik initialValues={{
                        //Datos Personales:
                        VoluntarioId: '',
                        FechaIngresoInstitucion: '',
                        CargoEnInstucionId: 0,
                        Cedula: '',
                        Nombre: '',
                        Apellido: '',
                        Apodo: '',
                        SexoID: 0,
                        FechaNacimiento: '',
                        LugarNacimiento: '',
                        NacionalidadId: 0,
                        EstadoCivilId: 0,
                        EstaturaEnPie: '',
                        PesoEnLibras: '',
                        ColorPelo: '',
                        ColorPiel: '',
                        GrupoSanguineoId: 0,
                        tallaCamisetaId: 0,
                        TienePasaporte: false,
                        PasaporteNum: '',
                        TieneCuentaReservas: false,
                        NumeroCuenta: '',
                        TieneNSS: false,  
                        Nss: '',
                        TieneLicencia: false,  
                        LicenciaCategoriaId: 0,
                        //Informacion de contacto:
                        direccion: '',
                        sector: '',
                        provinciaId:0,
                        municipioId:0,
                        correoElectronico: '',
                        telefonoCelular: '',
                        telefonoResidencial: '',
                        telefonoOficina: '',

                        //Datos familiares:
                        nombrePadre:'', 
                        nombreMadre:'', 
                        nombreConyuge:'',
                        hijos:[],

                        //Experiencia:
                        esEmpleado:'',
                        dondeTrabaja:'',
                        nivelAcademicoId:0,

                        nivelSuperior:false,
                    }}
                        validate={(valores) => {
                           let errores = {}; 

                            //Validacion Nombre:
                            if (!valores.Nombre) {
                                errores.Nombre = 'Por favor ingrese su nombre'
                            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.Nombre)) {
                                errores.Nombre = 'El nombre solo puede contener letras y espacios'
                            }
                            if (valores.Nombre.length > 27) {
                                errores.Nombre = 'El nombre no puede ser tan largo'
                            }

                            //Validacion CargoEnLaInstitucion:
                            if (valores.CargoEnInstucionId === 0) {
                                errores.CargoEnInstucionId = 'Porfavor ingrese su cargo'
                            }

                            //Validacion FechaInreso:
                            if (!valores.FechaIngresoInstitucion) {
                                errores.FechaIngresoInstitucion = 'Porfavor ingrese la fecha de ingreso'
                            }
                            
                            /*
                            else if (valores.FechaIngresoInstitucion <= '31/12/1964') {
                                errores.FechaIngresoInstitucion = 'Porfavor ingresa una fecha valida'
                            }
                            */
                            

                            //Validacion Apellido:
                            if (!valores.Apellido) {
                                errores.Apellido = 'Por favor ingrese su apellido'
                            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.Apellido)) {
                                errores.Apellido = 'El apellido solo puede contener letras y espacios'
                            }
                            if (valores.Apellido.length > 40) {
                                errores.Apellido = 'Los apellidos no pueden ser tan largos'
                            }

                            //Validacion SEXO:
                            if (valores.SexoID === 0) {
                                errores.SexoID = 'Porfavor ingrese su sexo'
                            }

                            //Validacion Cedula:
                            if (!valores.Cedula) {
                                errores.Cedula = 'Por favor ingresa tu cedula'
                            } else if (!/^\d{3}\d{7}\d{1}$/.test(valores.Cedula)) {
                                errores.Cedula = 'Seguir el formato: 000-0000000-0 (3 digitos - 7 digitos - 1 digito)'
                            }

                            //Validacion FechaNacimiento:
                            
                            if (!valores.FechaNacimiento) {
                                errores.FechaNacimiento = 'Porfavor ingrese la fecha de nacimiento'
                            }
                            /*
                            else if (valores.FechaNacimiento <= '31/12/1880') {
                                errores.FechaNacimiento = 'Porfavor ingresa una fecha valida'
                            }
                            */
                            

                            //Validacion LugarNacimieno:
                            if (!valores.LugarNacimiento) {
                                errores.LugarNacimiento = 'Porfavor ingrese el lugar de nacimiento'
                            }
                            else if (valores.LugarNacimiento.length > 50) {
                                errores.LugarNacimiento = 'No valido'
                            }

                            //Validacion EstadoCivilId:
                            if (valores.EstadoCivilId === 0) {
                                errores.EstadoCivilId = 'Porfavor ingrese su estado civil'
                            }

                            //Validacion NacionalidadId:
                            if (valores.NacionalidadId === 0) {
                                errores.NacionalidadId = 'Porfavor ingrese su nacionalidad'
                            }

                            //Validacion Estatura: (!/^[4-8]+(.[0-9]+([0-9])?)?$/
                            if (!valores.EstaturaEnPie) {
                                errores.EstaturaEnPie = 'Por favor ingresa tu Estatura en pies'
                            } else if (!/^[4-8](.\d{1,9})?$/.test(valores.EstaturaEnPie)) {
                                errores.EstaturaEnPie = 'Debe ser menor a 8.99 y mayor a 4'
                            }


                            //Validacion Peso en libras: /^[1-9](\d{1,2})?\d{1}$/
                            if (!valores.PesoEnLibras) {
                                errores.PesoEnLibras = 'Por favor ingresa tu peso en libras'
                            } else if (!/^[1-9](\d{1})(\d{1}(.\d{1,9})?)?$/.test(valores.PesoEnLibras)) {
                                errores.PesoEnLibras = 'no valido'
                            }

                            //Validacion Color de pelo:
                            if (!valores.ColorPelo) {
                                errores.ColorPelo = 'Porfavor ingrese su color de pelo'
                            }
                            else if (valores.ColorPelo.length > 45) {
                                errores.ColorPelo = 'Esta escribiendo algo muy largo'
                            }

                            //Validacion Color de Piel:
                            if (!valores.ColorPiel) {
                                errores.ColorPiel = 'Porfavor ingrese su color de piel'
                            }
                            else if (valores.ColorPiel.length > 45) {
                                errores.ColorPiel = 'Esta escribiendo texto muy largo'
                            }

                            //Validacion Grupo sanguineo:
                            if (valores.GrupoSanguineoId === 0) {
                                errores.GrupoSanguineoId = 'Porfavor seleccione su grupo sanguineo'
                            }

                            //Validacion talla camiseta:
                            if (valores.tallaCamisetaId === 0) {
                                errores.tallaCamisetaId = 'Porfavor seleccione su talla de camiseta'
                            }

                            //Validacion tiene numero de pasaporte:
                            if (valores.TienePasaporte && !valores.PasaporteNum) {
                                errores.PasaporteNum = 'Porfavor ingrese su numero de pasaporte'
                            }

                            //Validacion tiene numero de cuenta:
                            if (valores.TieneCuentaReservas && !valores.NumeroCuenta) {
                                errores.NumeroCuenta = 'Porfavor ingrese numero de cuenta'
                            }else if(valores.TieneCuentaReservas && !/^[0-9]{1,32}$/.test(valores.NumeroCuenta)){
                                errores.NumeroCuenta = 'Solo numeros (no mas de 32 digitos!)'
                            }

                            //Validacion tiene SEGURO SOCIAL SENASA: TieneNSS - Nss
                            if (valores.TieneNSS && !valores.Nss) {
                                errores.Nss = 'Porfavor ingrese su numero de Seguro Senasa'
                            }else if(valores.TieneNSS && !/^[0-9]{1,32}$/.test(valores.Nss)){
                                errores.Nss = 'Solo numeros (no mas de 32 digitos!)'
                            }

                            //Validacion TIENE LICENCIA: TieneLicencia LicenciaCategoriaId
                            if (valores.TieneLicencia && valores.LicenciaCategoriaId === 0) {
                                errores.LicenciaCategoriaId = 'Porfavor seleccione su categoria de licencia'
                            }

                            //Validacion direccion:
                            if (!valores.direccion) {
                                errores.direccion = 'Porfavor ingrese su direccion'
                            }else if(valores.direccion.length  > 48){
                                errores.direccion = 'El texto es demasiado largo'
                            }

                            //Validacion Correo:
                            if (!valores.correoElectronico) {
                                errores.correoElectronico = 'Por favor ingresa un correo'
                            }else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correoElectronico)){
                                errores.correoElectronico = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
                            }
                            else if (valores.correoElectronico > 98){
                                errores.correoElectronico = 'Correo invalido - el texto es demasiado largo'
                            }

                            //Validacion Sector:
                            if (!valores.sector) {
                                errores.sector = 'Por favor ingrese el sector donde vive'
                            }if (valores.sector.length > 48) {
                                errores.sector = 'El texto no puede ser tan largo'
                            }

                            //Validacion Provincia:
                            if (valores.provinciaId === 0) {
                                errores.provinciaId = 'Porfavor seleccione su provincia'
                            }

                            //Validacion municipioId:
                            if (valores.municipioId === 0) {
                                errores.municipioId = 'Porfavor seleccione su municipio'
                            }

                            //Validacion telefonoCelular:
                            if (!valores.telefonoCelular){
                                errores.telefonoCelular = 'Por favor ingresa tu # Telefono Celular'
                            } else if (!/^\d{3}\d{3}\d{4}$/.test(valores.telefonoCelular)) {
                                errores.telefonoCelular = 'Seguir el formato: 000-000-0000 (3 digitos - 3 digitos - 4 digitos)'
                            }

                            //Validacion telefonoResidencial:
                            if (valores.telefonoResidencial) {
                                if (!/^\d{3}\d{3}\d{4}$/.test(valores.telefonoResidencial)) {
                                    errores.telefonoResidencial = 'Seguir el formato: 000-000-0000 (3 digitos - 3 digitos - 4 digitos)'
                                }
                            } 

                            //Validacion telefonoOficina:
                            if (valores.telefonoOficina) {
                                if (!/^\d{3}\d{3}\d{4}$/.test(valores.telefonoOficina)) {
                                    errores.telefonoOficina = 'Seguir el formato: 000-000-0000 (3 digitos - 3 digitos - 4 digitos)'
                                }
                            } 

                            //Validacion Nombre PADRE:
                            if (!valores.nombrePadre) {
                                errores.nombrePadre = 'Por favor ingrese el nombre de su padre'
                            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombrePadre)) {
                                errores.nombrePadre = 'El nombre solo puede contener letras y espacios'
                            }
                            if (valores.nombrePadre.length > 48) {
                                errores.nombrePadre = 'El nombre no puede ser tan largo'
                            }

                            //Validacion Nombre PADRE:
                            if (!valores.nombreMadre) {
                                errores.nombreMadre = 'Por favor ingrese el nombre de su madre'
                            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreMadre)) {
                                errores.nombreMadre = 'El nombre solo puede contener letras y espacios'
                            }
                            if (valores.nombreMadre.length > 48) {
                                errores.nombreMadre = 'El nombre no puede ser tan largo'
                            }

                            //Validacion Nombre PADRE:
                            if (!valores.nombreConyuge) {
                                errores.nombreConyuge = 'Por favor ingrese el nombre de su conyugue'
                            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreConyuge)) {
                                errores.nombreConyuge = 'El nombre solo puede contener letras y espacios'
                            }
                            if (valores.nombreConyuge.length > 48) {
                                errores.nombreConyuge = 'El nombre no puede ser tan largo'
                            }

                            //Validacion Nombre PADRE:
                            /*
                            if (!valores.nombreHijo) {
                                errores.nombreHijo = 'Por favor ingrese el nombre de su hijo'
                            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreHijo)) {
                                errores.nombreHijo = 'El nombre solo puede contener letras y espacios'
                            }
                            if (valores.nombreHijo.length > 48) {
                                errores.nombreHijo = 'El nombre no puede ser tan largo'
                            }
                            */

                            //Validacion TRABAJA ACTUALMENTE:
                            if (valores.esEmpleado && !valores.dondeTrabaja) {
                                errores.dondeTrabaja = 'Porfavor ingrese el lugar donde trabaja'
                            }

                            //Validacion nivel academico: nivelAcademicoId:
                            if (valores.nivelAcademicoId === 0) {
                                errores.nivelAcademicoId = 'Porfavor seleccione su nivel academico'
                            }


                            //Validacion hijos:
                            errores['hijos.0.nombreHijo'] = 'error de prueba'

                            console.dir(errores)

                            return errores;
                        }}
                        onSubmit={(valores, { resetForm }) => {
                            cambiarFormularioEnviado(true)
                            setTimeout(() => cambiarFormularioEnviado(false), 5000)
                            console.log('formulario enviado')
                            resetForm();
                        }}>

                        {({ values, errors, validateForm, touched, handleBlur}) => (
                            <Form>
                                <div className='card p-4 m-5 d-flex justify-content-center ' >
                                    <img className='w-50 d-flex justify-content-center' src="https://www.defensacivil.gob.do/images/plantilla/logo_defensa_civil_ultimate.png" />
                                </div>

                                <div className="formulario">
                                    <div className=" card  m-5 xs ">
                                        <div className="card ">
                                            <h2 className=' p-4 m-4 text-info'>Formulario</h2>

                                            <h5 className="card-title text-center mt-4 mb-5">Datos Personales </h5>

                                            <div className="row  mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="FechaIngresoInstitucion"> Ingreso a la Institución
                                                        <Field type="date" className="form-control mt-3" name="FechaIngresoInstitucion" placeholder="Institución " />
                                                        <ErrorMessage name='FechaIngresoInstitucion' component={() => (<div className='errorMessage'>{errors.FechaIngresoInstitucion}</div>)} />
                                                    </label>
                                                </div >

                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="CargoEnInstucionId">Cargo en la institución
                                                                <Field as="select" defaultValue={0} name="CargoEnInstucionId" className="form-select mt-3" aria-label="Default select example"  >
                                                                    <option disabled value={0} >Selecciona cargo</option>
                                                                    {cargo.map((cargos, i) => (
                                                                        <option key={i} value={cargos.cargoId}>{cargos.cargoNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name='CargoEnInstucionId' component={() => (<div className='errorMessage'>{errors.CargoEnInstucionId}</div>)} />
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col  minicomponete">
                                                    <label htmlFor="Nombre">Nombre
                                                        <Field type="text" id='Nombre' className="form-control mt-3" name="Nombre" placeholder="Nombre " />
                                                        <ErrorMessage name='Nombre' component={() => (<div className='errorMessage'>{errors.Nombre}</div>)} />
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label htmlFor="Apellido">Apellido
                                                        <Field type="text" className="form-control mt-3" name="Apellido" placeholder="Apellido " />
                                                        <ErrorMessage name='Apellido' component={() => (<div className='errorMessage'>{errors.Apellido}</div>)} />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="Apodo"> Apodo (opcional)
                                                        <input type="text" className="form-control mt-3" name="Apodo" placeholder="Apodo"></input>
                                                    </label>
                                                </div>
                                            </div>



                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="SexoID">Sexo
                                                                <Field as="select" defaultValue="" name="SexoID" className="form-select mt-3" aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona sexo </option>
                                                                    {sexo.map((sex, i) => (
                                                                        <option key={i} value={sex.sexoId}>{sex.sexoNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name='SexoID' component={() => (<div className='errorMessage'>{errors.SexoID}</div>)} />
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }

                                                <div className="col minicomponete ">
                                                    <label htmlFor="Cedula">Cédula
                                                        <Field type="text" className="form-control mt-3" name="Cedula" placeholder="000-0000000-0 " />
                                                        <ErrorMessage name='Cedula' component={() => (<div className='errorMessage'>{errors.Cedula}</div>)} />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="FechaNacimiento"> Fecha nacimiento
                                                        <Field type="date" className="form-control mt-3" name="FechaNacimiento" placeholder="FechaNacimiento" />
                                                        <ErrorMessage name='FechaNacimiento' component={() => (<div className='errorMessage'>{errors.FechaNacimiento}</div>)} />
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label htmlFor="LugarNacimiento"> Lugar nacimiento
                                                        <Field type="text" className="form-control mt-3" name="LugarNacimiento" placeholder="Lugar de Nacimiento " />
                                                        <ErrorMessage name='LugarNacimiento' component={() => (<div className='errorMessage'>{errors.LugarNacimiento}</div>)} />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="EstadoCivilId"> Estado civil
                                                                <Field as='select' defaultValue={0} name="EstadoCivilId" className="form-select mt-3" aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona estado civil </option>
                                                                    {civil.map((estado, i) => (
                                                                        <option key={i} value={estado.estadoCivilId}>{estado.estadoCivilNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name='EstadoCivilId' component={() => (<div className='errorMessage'>{errors.EstadoCivilId}</div>)} />
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="NacionalidadId"> Nacionalidad
                                                                <Field as='select' defaultValue={0} name="NacionalidadId" className="form-select mt-3" aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona nacionalidad</option>
                                                                    {civil.map((n, i) => (
                                                                        <option key={i} value={n.estadoCivilId}>{n.estadoCivilNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name='NacionalidadId' component={() => (<div className='errorMessage'>{errors.NacionalidadId}</div>)} />
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }
                                            </div>




                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="EstaturaEnPie">Estatura en pie
                                                        <Field type="text" className="form-control mt-3" name="EstaturaEnPie" placeholder="Estatura" />
                                                        <ErrorMessage name='EstaturaEnPie' component={() => (<div className='errorMessage'>{errors.EstaturaEnPie}</div>)} />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="PesoEnLibras"> Peso en libras
                                                        <Field type="text" className="form-control mt-3" name="PesoEnLibras" placeholder="Peso en libras" />
                                                        <ErrorMessage name='PesoEnLibras' component={() => (<div className='errorMessage'>{errors.PesoEnLibras}</div>)} />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor=" ColorPelo"> Color de pelo
                                                        <Field type="text" className="form-control mt-3" name="ColorPelo" placeholder="Color de pelo" />
                                                        <ErrorMessage name='ColorPelo' component={() => (<div className='errorMessage'>{errors.ColorPelo}</div>)} />
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label htmlFor="ColorPiel"> Color de piel
                                                        <Field type="text" className="form-control mt-3" name="ColorPiel" placeholder="Color de piel" />
                                                        <ErrorMessage name='ColorPiel' component={() => (<div className='errorMessage'>{errors.ColorPiel}</div>)} />
                                                    </label>
                                                </div>
                                            </div>


                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="GrupoSanguineoId"> Grupo sanguineo
                                                                <Field as="select" defaultValue={0} name="GrupoSanguineoId" className="form-select mt-3" placeholder='hola' aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona</option>
                                                                    {gruposanguineo.map((grupo, i) => (
                                                                        <option key={i} value={grupo.grupoSanguineoId}>{grupo.grupoSanguineo}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name='GrupoSanguineoId' component={() => (<div className='errorMessage'>{errors.GrupoSanguineoId}</div>)} />
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="tallaCamisetaId">Talla camiseta
                                                                <Field as='select' defaultValue={0} name="tallaCamisetaId" className="form-select mt-3" aria-label="Default select example">
                                                                    <option value={0} disabled >Selecciona Talla</option>
                                                                    {tallas.map((grupo, i) => (
                                                                        <option key={i} value={grupo.tallaCamisetaId}>{grupo.tallaCamiseta}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name='tallaCamisetaId' component={() => (<div className='errorMessage'>{errors.tallaCamisetaId}</div>)} />
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="PasaporteNum"> Tiene numero de pasaporte
                                                        <Field name='TienePasaporte' className="form-check" type="checkbox" id="TienePasaporte" />
                                                        {values.TienePasaporte&&
                                                            <>
                                                                <Field type="text" className="form-control mt-1" name="PasaporteNum" placeholder="Numero de pasaporte" />
                                                            </>
                                                        }
                                                        <ErrorMessage name='PasaporteNum' component={() => (<div className='errorMessage'>{errors.PasaporteNum}</div>)} />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="NumeroCuenta"> Tiene numero de cuenta *Banreservas*
                                                        <Field className="form-check " type="checkbox" name="TieneCuentaReservas"/>
                                                        {values.TieneCuentaReservas&&
                                                            <Field type="text" className="form-control mt-1" name="NumeroCuenta" placeholder="Numero de cuenta"/>
                                                        }
                                                        <ErrorMessage name='NumeroCuenta' component={() => (<div className='errorMessage'>{errors.NumeroCuenta}</div>)} />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3"> 
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="Nss"> Tiene Nss
                                                        <Field className="form-check " type="checkbox" name="TieneNSS"></Field>
                                                        {values.TieneNSS&&
                                                            <Field type="text" className="form-control mt-1" name="Nss" placeholder="Nss"></Field>
                                                        }
                                                        <ErrorMessage name='Nss' component={() => (<div className='errorMessage'>{errors.Nss}</div>)} />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="LicenciaCategoriaId"> Tiene Licencias de conducir
                                                        <Field className="form-check " type="checkbox" name="TieneLicencia"></Field>
                                                        {values.TieneLicencia&& 
                                                            <Field as='select' defaultValue={0} name="LicenciaCategoriaId" className="form-select mt-3" aria-label="Default select example">
                                                                <option value={0} disabled >Selecciona Licencia</option>
                                                                {categoria.map((grupo, i) => (
                                                                    <option key={i} value={grupo.licenciaCategoriaId}>{grupo.licenciaCategoria}</option>
                                                                ))}
                                                            </Field>
                                                        }
                                                        <ErrorMessage name='LicenciaCategoriaId' component={() => (<div className='errorMessage'>{errors.LicenciaCategoriaId}</div>)} />
                                                    </label>
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                    </div>

                                    <div className=" card  m-5 xs ">
                                        <div className="card">
                                            <h5 className="card-title text-center mt-4 mb-5">Información de contacto</h5>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="direccion"> Direccion
                                                        <Field type="text" className="form-control mt-3" name="direccion" placeholder="Direccion "></Field>
                                                        <ErrorMessage name='direccion' component={() => (<div className='errorMessage'>{errors.direccion}</div>)} />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="provinciaId"> Provincia
                                                                <Field as='select' defaultValue={0} name="provinciaId" className="form-select mt-3" aria-label="Default select example"  >
                                                                    <option value={0} disabled>Selecciona provincia</option>
                                                                    {provincia.map((grupo, i) => (
                                                                        <option key={i} value={grupo.provinciaId}>{grupo.provinciaNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name='provinciaId' component={() => (<div className='errorMessage'>{errors.provinciaId}</div>)} />
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }

                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="municipioId"> Municipio
                                                                <Field as='select' defaultValue={0} name="municipioId" className="form-select mt-3" placeholder='hola' aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona Municipio</option>
                                                                    {municipio.map((grupo, i) => (
                                                                        <option key={i} value={grupo.municipioId}>{grupo.municipioNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name='municipioId' component={() => (<div className='errorMessage'>{errors.municipioId}</div>)} />
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col  minicomponete">
                                                    <label htmlFor="sector"> Sector
                                                        <Field type="text" className="form-control mt-3" name="sector" placeholder="Sector "></Field>
                                                        <ErrorMessage name='sector' component={() => (<div className='errorMessage'>{errors.sector}</div>)}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="correoElectronico"> Correo electronico
                                                        <Field type="text" className="form-control mt-3" name="correoElectronico" placeholder="Correo@correo.com"></Field>
                                                        <ErrorMessage name='correoElectronico' component={() => (<div className='errorMessage'>{errors.direccion}</div>)}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="telefonoCelular"> Telefono celular
                                                        <Field type="text" className="form-control mt-3" name="telefonoCelular" placeholder="000-000-0000"></Field>
                                                        <ErrorMessage name='telefonoCelular' component={() => (<div className='errorMessage'>{errors.telefonoCelular}</div>)}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="telefonoResidencial"> Telefono residencial <span>(opcional)</span>
                                                        <Field type="text" className="form-control mt-3" name="telefonoResidencial" placeholder="000-000-0000"></Field>
                                                        <ErrorMessage name='telefonoResidencial' component={() => (<div className='errorMessage'>{errors.telefonoResidencial}</div>)}/>
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label htmlFor="telefonoOficina"> Telefono oficina <span>(opcional)</span>
                                                        <Field type="text" className="form-control mt-3" name="telefonoOficina" placeholder="000-000-0000"></Field>
                                                        <ErrorMessage name='telefonoOficina' component={() => (<div className='errorMessage'>{errors.telefonoOficina}</div>)}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <br />
                                            <br />
                                        </div>
                                    </div>

                                    <div className=" card  m-5 xs ">
                                        <div className="card">
                                            <h5 className="card-title text-center mt-4 mb-5">Datos familiares</h5>
                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="nombrePadre"> Padre
                                                        <Field type="text" className="form-control mt-3" name="nombrePadre" placeholder="Nombre"></Field>
                                                        <ErrorMessage name='nombrePadre' component={() => (<div className='errorMessage'>{errors.nombrePadre}</div>)}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="nombreMadre"> Madre
                                                        <Field type="text" className="form-control mt-3" name="nombreMadre" placeholder="Nombre "></Field>
                                                        <ErrorMessage name='nombreMadre' component={() => (<div className='errorMessage'>{errors.nombreMadre}</div>)}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="nombreConyuge"> Conyuge {touched.nombreConyuge}
                                                        <Field type="text" className="form-control mt-3" name="nombreConyuge" placeholder="Nombre "></Field>
                                                        <ErrorMessage name='nombreConyuge'>{(msg) => (<div className='errorMessage'>{msg}</div>)}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>



                                            <div >
                                                <div className='card m-5'>
                                                    <FieldArray name='hijos' render={(arrayHelper) => (
                                                        <>
                                                        <div className='col minicomponete'>
                                                        <button className="btn btn-primary mt-3 " onClick={(e) => arrayHelper.push({})}> Agregar hijo</button>
                                                        </div>
                                                        {formulario.map((hijo, i) =>
                                                    (<div key={i} >
                                                        <button className="b mt-5 ms-4" onClick={(e) => Eliminarhijo(hijo)} >X</button>
                                                        <div className=" card-body row mt-3">
                                                            <div className="col  minicomponete">
                                                                <label htmlFor={'hijos.'+i+'.nombreHijo'}> Nombre {errors['hijos.'+i+'.nombreHijo']}{touched['hijos.0.nombreHijo']}
                                                                    <Field type="text" className="form-control mt-3" onBlur={handleBlur} name={'hijos.'+i+'.nombreHijo'} placeholder="Nombre "></Field>
                                                                    {errors['hijos.0.nombreHijo']&&touched['hijos.0.nombreHijo']? (<div className='errorMessage'>{errors['hijos.0.nombreHijo']}</div>):null}
                                                                </label> 
                                                            </div>

                                                            <div className="col minicomponete">
                                                                <label htmlFor="Apellido"> Apellido
                                                                    <Field type="text" className="form-control mt-3" name={'hijos['+i+'].apellidoHijo'} placeholder="Apellido "></Field>
                                                                    <ErrorMessage name={'hijos['+i+'].apellidoHijo'} component={() => (<div className='errorMessage'>{errors.nombreHijo}</div>)}/>
                                                                </label>
                                                            </div>

                                                            <div className="row mt-3">
                                                                {loading ? (
                                                                    <div className="col minicomponete" >
                                                                        <div className="spinner-border" role="status" />
                                                                    </div>
                                                                ) : (
                                                                    <div className="col minicomponete">
                                                                        {
                                                                            <label htmlFor="SexoID"> Sexo
                                                                                <Field as="select" defaultValue={0} name={'hijos['+i+'].sexoID'} className="form-select mt-3" aria-label="Default select example"  >
                                                                                    <option value={0} disabled >Selecciona sexo </option>
                                                                                    {sexo.map((sex, i) => (
                                                                                        <option key={i} value={sex.sexoId}>{sex.sexoNombre}</option>
                                                                                    ))}
                                                                                </Field>
                                                                                <ErrorMessage name={'hijos['+i+'].sexoID'} component={() => (<div className='errorMessage'>{errors.nombreHijo}</div>)}/>
                                                                            </label>
                                                                        }
                                                                    </div>
                                                                )
                                                                }


                                                                <div className="col minicomponete">
                                                                    <label htmlFor="FechaNacimiento"> Fecha nacimiento
                                                                        <Field type="date" className="form-control mt-3" name={'hijos['+i+'].fehcaNacimientoHijo'} placeholder="FechaNacimiento"></Field>
                                                                        <ErrorMessage name={'hijos['+i+'].fehcaNacimientoHijo'} component={() => (<div className='errorMessage'>{errors.nombreHijo}</div>)}/>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br />
                                                    </div>)

                                                    )}</>
                                                    )} >

                                                    </FieldArray>
                                                </div>

                                            </div>

                                            <br />
                                            <br />
                                        </div>
                                    </div>

                                    <div className=" card  m-5 xs ">
                                        <div className="card">
                                            <h5 className="card-title text-center mt-4 mb-5">Experiencia</h5>

                                            <div className="row ">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="dondeTrabaja"> Es empleado (actualmente)
                                                        <Field className="form-check " type="checkbox" name="esEmpleado" id="esEmpleado"/>
                                                        {values.esEmpleado&&
                                                            <Field type="text" className="form-control mt-1" name="dondeTrabaja" placeholder="Donde"/>
                                                        }
                                                        <ErrorMessage name='dondeTrabaja' component={() => (<div className='errorMessage'>{errors.dondeTrabaja}</div>)}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="nivelAcademicoId"> Nivel academico
                                                                <select defaultValue={0} name="nivelAcademicoId" className="form-select mt-3" onChange={(e) => { cambiarNivel(e) }} aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona nivel academico</option>
                                                                    {nivelacademico.map((grupo, i) => (
                                                                        <option key={i} value={grupo.nivelAcademicoId}>{grupo.nivelAcademicoNombre}</option>
                                                                    ))}
                                                                </select>
                                                            </label>
                                                        }
                                                        
                                                    </div>
                                                )
                                                }
                                            </div>
                                            {nivelSuperior&& (<>
                                                <div className="row mt-3">
                                                    <div className="col minicomponete">
                                                        <label htmlFor="NombreInstitucionAcademica"> Nombre de la institucion academica
                                                            <input type="text" className="form-control mt-3" name="TelefonoCelNombreInstitucionAcademicaular" placeholder="Institucion academica "></input>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col minicomponete">
                                                        <label htmlFor="NombreCarrera"> Profesión
                                                            <input type="text" className="form-control mt-3" name="NombreCarrera" placeholder="Carrera "></input>
                                                        </label>
                                                    </div>
                                                </div>
                                            </>)
                                            }


                                            <div className="row ">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="OtraInstitucionVoluntariosHaPertenecido">  En otra institucion ha pertenecido como voluntario
                                                        <input className="form-check " type="checkbox" id="OtraInstitucionVoluntariosHaPertenecido" onChange={() => { setcheckotrainstitucion(!checkotrainstitucion); }} ></input>
                                                        {checkotrainstitucion &&
                                                            <input type="text" className="form-control mt-1" name="OtraInstitucionVoluntariosNombre" placeholder="Nombre intitucion"></input>

                                                        }
                                                        {checkotrainstitucion &&
                                                            <label className="mt-3 my-3" htmlFor="otraInstitucionVoluntariosCargo"> Cargo dentro de la institucion
                                                                <input type="text" className="form-control mt-3 my-3" name="otraInstitucionVoluntariosCargo" placeholder="Cargo "></input>
                                                            </label>
                                                        }
                                                    </label>
                                                </div>

                                                <div className="row ">
                                                    <div className=" col minicomponete">
                                                        <label className='mt-3' htmlFor="SabeNadar"> Sabe nadar
                                                            <input className="form-check " type="checkbox" name="SabeNadar" onChange={() => { setchecksabenadar(!checksabenadar); }} ></input>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="row ">
                                                    <div className=" col minicomponete">
                                                        <label className='mt-3' htmlFor="SabeConducir"> Sabe conducir
                                                            <input className="form-check " type="checkbox" name="SabeConducir" onChange={() => { setchecksabeconducir(!checksabeconducir); }} ></input>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </div>
                                <div className="centarlizar">
                                        <button type='submit' className="btn btn-primary px-5 ">Enviar</button>
                                    </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
export default Formulario;