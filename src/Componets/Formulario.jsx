import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
import SelectTipoCurso from '../Service/SelectTipoCurso';

const FormSchema = Yup.object().shape({

    nombres: Yup.string()
        .max(50, 'El nombre es muy largo!')
        .required('El nombre es obligatorio'),

    apellidos: Yup.string()
        .min(2, 'El nombre es muy corto!')
        .max(50, 'El nombre es muy largo!')
        .required('El apellido es obligatorio'),

    cargoEnInstucionId: Yup.number()
        .min(1, 'Seleccione su cargo en la institución'),

    fechaIngresoInstitucion: Yup.date()
        .required('Seleccione la fecha en que ingresó')
        .min(new Date(1964, 12, 31), 'Selecione una fecha valida'),

    apodo: Yup.string()
        .max(50, 'El apodo es muy largo!'),

    sexoId: Yup.number()
        .min(1, 'Seleccione su sexo'),

    cedula: Yup.string()
        .required('La cedula es obligatoria')
        .matches(/^[0-9]+$/, "Solo numeros")
        .min(11, 'Deben ser exactamente 11 digitos')
        .max(11, 'Deben ser exactamente 11 digitos'),

    fechaNacimiento: Yup.date()
        .required('Seleccione la fecha de nacimiento'),

    lugarNacimiento: Yup.string()
        .required('El lugar de nacimiento es obliatorio')
        .max(50, 'El texto es muy largo!'),

    estadoCivilId: Yup.number()
        .min(1, 'Seleccione su estado civil!'),

    nacionalidadId: Yup.number()
        .min(1, 'Seleccione su nacionalidad!'),

    //!/^[4-8](.\d{1,9})?$/
    estaturaEnPie: Yup.number().test(
        'is-decimal',
        'Solo enteros o decimales (debe ser menor a 9)',
        value => (value + "").match(/^[4-8](.\d{1,9})?$/),
    ),

    pesoEnLibras: Yup.number().test(
        'is-decimal',
        'no valido',
        value => (value + "").match(/^[1-9](\d{1})(\d{1}(.\d{1,9})?)?$/),
    ),

    colorPelo: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(2, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    colorPiel: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(2, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    grupoSanguineoId: Yup.number()
        .min(1, 'Seleccione su grupo sanguineo!'),

    tallaCamisetaId: Yup.number()
        .min(1, 'Seleccione su talla de camiseta!'),

    tienePasaporte: Yup.boolean(),
    pasaporteNum: Yup.string()
        .when("tienePasaporte", {
            is: true,
            then: Yup.string().required("Ingrese su # de pasaporte")
        }),

    tieneCuentaReservas: Yup.boolean(),
    numeroCuenta: Yup.string()
        .when("tieneCuentaReservas", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese su # de cuenta")
                    .max(31, "invalido (muy largo)")
                    .matches(/^[0-9]+$/, "Solo numeros")
        }),

    tieneNSS: Yup.boolean(),
    Nss: Yup.string()
        .when("tieneNSS", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese su # de seguro social")
                    .max(15, "invalido (muy largo)")
                    .matches(/^[0-9]+$/, "Solo numeros")
        }),

    tieneLicencia: Yup.boolean(),
    licenciaCategoriaId: Yup.number()
        .when("tieneLicencia", {
            is: true,
            then:
                Yup.number()
                    .min(1, 'Seleccione su categoria de conducir'),
        }),

    direccion: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(3, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    provinciaId: Yup.number()
        .min(1, 'Seleccione su provincia!'),

    sector: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(3, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    correoElectronico: Yup.string()
        .required('Este es un campo es obligatorio')
        .email("invalido (formato ejemplo: correo@email.com)"),

    municipioId: Yup.number()
        .min(1, 'Seleccione su municipio!'),

    telefonoCelular: Yup.string()
        .required('El # de celular es obliatorio')
        .matches(/^[0-9]+$/, "Solo numeros")
        .min(10, 'Deben ser exactamente 10 digitos')
        .max(10, 'Deben ser exactamente 10 digitos'),

    telefonoOficina: Yup.string()
        .matches(/^[0-9]+$/, "Solo numeros")
        .min(10, 'Deben ser exactamente 10 digitos')
        .max(10, 'Deben ser exactamente 10 digitos'),

    telefonoResidencial: Yup.string()
        .matches(/^[0-9]+$/, "Solo numeros")
        .min(10, 'Deben ser exactamente 10 digitos')
        .max(10, 'Deben ser exactamente 10 digitos'),

    nombrePadre: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(3, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    nombreMadre: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(3, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    nombreConyuge: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(3, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    esEmpleado: Yup.boolean(),
    dondeTrabaja: Yup.string()
        .when("esEmpleado", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese donde trabaja")
                    .min(2, "invalido (muy corto)!")
                    .max(40, "invalido (muy largo)")
        }),


    nivelSuperior: Yup.boolean(),
    nombreInstitucionAcademica: Yup.string()
        .when("nivelSuperior", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese el nombre de la institucion")
                    .max(50, "invalido (muy largo)")
        }),


    otraInstitucionVoluntariosHaPertenecido: Yup.boolean(),
    otraInstitucionVoluntariosNombre: Yup.string()
        .when("otraInstitucionVoluntariosHaPertenecido", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese el lugar donde ha trabajado")
                    .min(2, "invalido (muy corto)!")
                    .max(50, "invalido (muy largo)")
        }),


    otraInstitucionVoluntariosHaPertenecido: Yup.boolean(),
    otraInstitucionVoluntariosCargo: Yup.string()
        .when("otraInstitucionVoluntariosHaPertenecido", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese el cargo que tenia donde ha trabajado")
                    .min(2, "invalido (muy corto)!")
                    .max(50, "invalido (muy largo)")
        }),


    volutarioHijos: Yup.array().of(Yup.object().shape({
        nombres: Yup.string().required("Nombre del hij@ obligatorio"),
        apellidos: Yup.string().required("Apellido del hij@ obligatorio"),
        sexoId: Yup.number().min(1, 'Seleccione el sexo del hijo!'),
        fechaNacimiento: Yup.string().required("Fecha nacimiento hijo"),
    })),

    voluntariosCursos: Yup.array().of(Yup.object().shape({
        añoCurso: Yup.string()
                  .required('El año es obligatorio')
                  .matches(/^[0-9]+$/, "Solo numeros")
                  .min(4, 'Deben ser exactamente 4 digitos numericos')
                  .max(4, 'Deben ser exactamente 4 digitos numericos'),

        
        nivelInstitucion: Yup.string()
                  .required("Ingrese el nivel de la institucion")
                  .min(1, 'Texto muy corto')
                  .max(50, 'Texto muy largo'),

        nombreInstitucion: Yup.string()
                  .required("Ingrese el nombre de la institucion")
                  .min(1, 'Texto muy corto')
                  .max(50, 'Texto muy largo'),


    })),

});

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
    const [tipoCurso, setTipoCurso] = useState([]);
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
        SelectTipoCurso().then(data => setTipoCurso(data));
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

    const Input = ({ field, form }) => (
        useEffect(() => {
            form.FormSchema();
        }, [])
    )

    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

    return (
        <>
            <div className="formulario ">
                <div className="card-body ml-5">

                    <Formik
                        validationSchema={FormSchema}

                        initialValues={{
                            //Datos Personales:
                            fechaIngresoInstitucion: '',
                            cargoEnInstucionId: 0,
                            cedula: '12312345671',
                            nombres: 'Holaaa',
                            apellidos: 'Adioos',
                            apodo: 'Hola de nueo',
                            sexoId: 0,
                            fechaNacimiento: '',
                            lugarNacimiento: 'Adios',
                            nacionalidadId: 0,
                            estadoCivilId: 0,
                            estaturaEnPie: 7, //Luego poner ''
                            pesoEnLibras: 128,
                            colorPelo: 'Azul marino',
                            colorPiel: 'Prieto tirando morado',
                            grupoSanguineoId: 0,
                            tallaCamisetaId: 0,
                            tienePasaporte: false,
                            pasaporteNum: '1234566',
                            tieneCuentaReservas: false,
                            numeroCuenta: '1213131',
                            tieneNSS: false,
                            nss: '1234567',
                            tieneLicencia: false,
                            licenciaCategoriaId: null,
                            //Informacion de contacto:
                            direccion: 'skajis',
                            sector: 'akdga',
                            provinciaId: 0,
                            municipioId: 0,
                            correoElectronico: 'holacrysel@misael.com',
                            telefonoCelular: '1231231234',
                            telefonoResidencial: '1231231234',
                            telefonoOficina: '1231231234',

                            //Datos familiares:
                            nombrePadre: 'askjf',
                            nombreMadre: 'adgasg',
                            nombreConyuge: 'asdgdsa',
                            tieneHijos: false,
                            volutarioHijos: [],
                            voluntariosCursos: [],

                            //Experiencia:
                            esEmpleado: false,
                            dondeTrabaja: '',
                            nivelAcademicoId: 0,
                            nombreInstitucionAcademica: '',
                            nombreCarrera:'',
                            otraInstitucionVoluntariosHaPertenecido: false,
                            otraInstitucionVoluntariosCargo: '',
                            otraInstitucionVoluntariosNombre: '',
                            sabeNadar:false,
                            sabeConducir:false,

                            //---------------------- FIJOS:
                            recomendadoPor: "string",
                            creadoPor: "string",
                            fechaCreacion: "2022-07-06",
                            modificadoPor: "string",
                            fechaModificacion: "2022-07-06",

                            //Documentos
                            voluntariosDocumentos: [
                                {
                                   
                                    tipoDocumentoId: 1,
                                    archivoTipoContenido: "string",
                                    archivoTamanio: true,
                                    archivo: "01010101"
                                  }
                                ],

                            
                            /*
                            valuesPrueba:{
  
                                "nombres": "Gregory",
                                "cedula": "11111111111",
                                "cargoEnInstucionId": 1,
                                "fechaIngresoInstitucion": "2022-07-06",
                                "apellidos": "Juan",
                                "apodo": "string",
                                "sexoId": 1,
                                "fechaNacimiento": "2022-07-06",
                                "lugarNacimiento": "string",
                                "nacionalidadId": 1,
                                "estadoCivilId": 1,
                                "estaturaEnPie": 0,
                                "pesoEnLibras": 0,
                                "colorPelo": "string",
                                "colorPiel": "string",
                                "grupoSanguineoId": 1,
                                "tallaCamisetaId": 1,
                                "tienePasaporte": true,
                                "pasaporteNum": 0,
                                "tieneCuentaReservas": true,
                                "numeroCuenta": 0,
                                "tieneNSS": true,
                                "nss": 0,
                                "tieneLicencia": true,
                                "licenciaCategoriaId": 1,
                                "provinciaId": 33,
                                "municipioId": 156,
                                "sector": "string",
                                "direccion": "string",
                                "correoElectronico": "user@example.com",
                                "telefonoCelular": "11111111",
                                "telefonoResidencial": "11111111",
                                "telefonoOficina": "11111111",
                                "tieneHijos": true,
                                "nombrePadre": "string",
                                "nombreMadre": "string",
                                "nombreConyuge": "string",
                                "esEmpleado": true,
                                "dondeTrabaja": "string",
                                "nivelAcademicoId": 1,
                                "nombreInstitucionAcademica": "string",
                                "nombreCarrera": "string",
                                "otraInstitucionVoluntariosHaPertenecido": true,
                                "otraInstitucionVoluntariosNombre": "string",
                                "otraInstitucionVoluntariosCargo": "string",
                                "sabeNadar": true,
                                "sabeConducir": true,
                                "estacionId": 1,
                                "recomendadoPor": "string",
                                "creadoPor": "string",
                                "fechaCreacion": "2022-07-06",
                                "modificadoPor": "string",
                                "fechaModificacion": "2022-07-06",
                                "volutarioHijos": [
                                  {
                                   
                                   
                                    "nombres": "string",
                                    "apellidos": "string",
                                    "sexoId": 1,
                                    "fechaNacimiento": "2022-07-06T05:44:15.362Z"
                                  }
                                ],
                                "voluntariosDocumentos": [
                                  {
                                   
                                    "tipoDocumentoId": 1,
                                    "archivoTipoContenido": "string",
                                    "archivoTamanio": true,
                                    "archivo": "01010101"
                                  }
                                ] ,
                                "voluntariosCursos": [
                                  {
                                    
                                    "tipoCursoId": 1,
                                    "añoCurso": 0,
                                    "nivelInstitucion": "string",
                                    "nombreInstitucion": "string"
                                  }
                                ]
                              }
                              */
                              
                              
                              
                              
                        }}


                        
                        onSubmit={values => {
                            console.log("Guardando", values);
                            fetch('https://localhost:44395/api/ControladorVoluntarios/GuardarVoluntario', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(values)
                            }).then(r => r.text()).then(v => {
                                console.log(values);
                            });
                            

                            console.log(values);
                            cambiarFormularioEnviado(true)
                            setTimeout(() => cambiarFormularioEnviado(false), 5000)
                        }}
                     



                        render={({ values, errors, touched, handleChange, handleBlur }) => (
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
                                                    <label htmlFor="fechaIngresoInstitucion">Ingreso a la Institución
                                                        <Field type="date" className="form-control mt-3" name="fechaIngresoInstitucion" placeholder="Institución " />
                                                        <ErrorMessage name="fechaIngresoInstitucion">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div >

                                                {loading ? (
                                                    <div className="col minicomponete" >
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="cargoEnInstucionId">Cargo en la institución
                                                                <Field as="select" defaultValue={0} name="cargoEnInstucionId" className="form-select mt-3" aria-label="Default select example"  >
                                                                    <option disabled value={0}>Selecciona cargo</option>
                                                                    {cargo.map((cargos, i) => (
                                                                        <option key={i} value={cargos.cargoId}>{cargos.cargoNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="cargoEnInstucionId">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col  minicomponete">
                                                    <label htmlFor="Nombre">Nombre
                                                        <Field type="text" id='nombres' className="form-control mt-3" name="nombres" placeholder="Nombres " />
                                                        <ErrorMessage name="nombres">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label htmlFor="apellidos">Apellidos
                                                        <Field type="text" className="form-control mt-3" name="apellidos" placeholder="Apellidos " />
                                                        <ErrorMessage name="apellidos">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="apodo"> apodo (opcional)
                                                        <Field type="text" className="form-control mt-3" name="apodo" placeholder="Apodo"></Field>
                                                        <ErrorMessage name="apodo">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
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
                                                            <label htmlFor="sexoId">Sexo
                                                                <Field as="select" defaultValue={0} name="sexoId" className="form-select mt-3" aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona el sexo </option>
                                                                    {sexo.map((sex, i) => (
                                                                        <option key={i} value={sex.sexoId}>{sex.sexoNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="sexoId">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }

                                                <div className="col minicomponete ">
                                                    <label htmlFor="cedula">Cédula
                                                        <Field type="text" className="form-control mt-3" name="cedula" placeholder="000-0000000-0 " />
                                                        <ErrorMessage name="cedula">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="fechaNacimiento"> Fecha nacimiento
                                                        <Field type="date" className="form-control mt-3" name="fechaNacimiento" placeholder="Fecha - Nacimiento" />
                                                        <ErrorMessage name="fechaNacimiento">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label htmlFor="lugarNacimiento"> Lugar nacimiento
                                                        <Field type="text" className="form-control mt-3" name="lugarNacimiento" placeholder="Lugar de Nacimiento " />
                                                        <ErrorMessage name="lugarNacimiento">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
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
                                                            <label htmlFor="estadoCivilId"> Estado civil
                                                                <Field as='select' defaultValue={0} name="estadoCivilId" className="form-select mt-3" aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona estado civil </option>
                                                                    {civil.map((estado, i) => (
                                                                        <option key={i} value={estado.estadoCivilId}>{estado.estadoCivilNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="estadoCivilId">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
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
                                                            <label htmlFor="nacionalidadId"> Nacionalidad
                                                                <Field as='select' defaultValue={0} name="nacionalidadId" className="form-select mt-3" aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona nacionalidad</option>
                                                                    {nacionalidad.map((n, i) => (
                                                                        <option key={i} value={n.nacionalidadId}>{n.nacionalidadNombre}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="nacionalidadId">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="estaturaEnPie">Estatura en pie
                                                        <Field type="text" className="form-control mt-3" name="estaturaEnPie" placeholder="Estatura" />
                                                        <ErrorMessage name="estaturaEnPie">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="pesoEnLibras"> Peso en libras
                                                        <Field type="text" className="form-control mt-3" name="pesoEnLibras" placeholder="Peso en libras" />
                                                        <ErrorMessage name="pesoEnLibras">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor=" colorPelo"> Color de pelo
                                                        <Field type="text" className="form-control mt-3" name="colorPelo" placeholder="Color de pelo" />
                                                        <ErrorMessage name="colorPelo">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label htmlFor="colorPiel"> Color de piel
                                                        <Field type="text" className="form-control mt-3" name="colorPiel" placeholder="Color de piel" />
                                                        <ErrorMessage name="colorPiel">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
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
                                                            <label htmlFor="grupoSanguineoId"> Grupo sanguineo
                                                                <Field as="select" defaultValue={0} name="grupoSanguineoId" className="form-select mt-3" placeholder='hola' aria-label="Default select example"  >
                                                                    <option value={0} disabled >Selecciona</option>
                                                                    {gruposanguineo.map((grupo, i) => (
                                                                        <option key={i} value={grupo.grupoSanguineoId}>{grupo.grupoSanguineo}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="grupoSanguineoId">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
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
                                                                <ErrorMessage name="tallaCamisetaId">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )
                                                }
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="pasaporteNum"> Tiene numero de pasaporte
                                                        <Field name='tienePasaporte' className="form-check" type="checkbox" id="tienePasaporte" />
                                                        {values.tienePasaporte &&
                                                            <>
                                                                <Field type="text" className="form-control mt-1" name="pasaporteNum" placeholder="Numero de pasaporte" />
                                                            </>
                                                        }
                                                        <ErrorMessage name="pasaporteNum">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="numeroCuenta"> Tiene numero de cuenta *Banreservas*
                                                        <Field className="form-check " type="checkbox" name="tieneCuentaReservas" />
                                                        {values.tieneCuentaReservas &&
                                                            <Field type="text" className="form-control mt-1" name="numeroCuenta" placeholder="Numero de cuenta" />
                                                        }
                                                        <ErrorMessage name="numeroCuenta">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="nss"> Tiene Nss
                                                        <Field className="form-check " type="checkbox" name="tieneNSS"></Field>
                                                        {values.tieneNSS &&
                                                            <Field type="text" className="form-control mt-1" name="nss" placeholder="nss"></Field>
                                                        }
                                                        <ErrorMessage name="nss">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="licenciaCategoriaId"> Tiene Licencias de conducir
                                                        <Field className="form-check " type="checkbox" name="tieneLicencia"></Field>
                                                        {values.tieneLicencia &&
                                                            <Field as='select' defaultValue={0} name="licenciaCategoriaId" className="form-select mt-3" aria-label="Default select example">
                                                                <option value={0} disabled >Selecciona Licencia</option>
                                                                {categoria.map((grupo, i) => (
                                                                    <option key={i} value={grupo.licenciaCategoriaId}>{grupo.licenciaCategoria}</option>
                                                                ))}
                                                            </Field>
                                                        }
                                                        <ErrorMessage name="licenciaCategoriaId">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
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
                                                        <ErrorMessage name="direccion">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
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
                                                        <ErrorMessage name="sector">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="correoElectronico"> Correo electronico
                                                        <Field type="text" className="form-control mt-3" name="correoElectronico" placeholder="Correo@correo.com"></Field>
                                                        <ErrorMessage name="correoElectronico">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="telefonoCelular"> Telefono celular
                                                        <Field type="text" className="form-control mt-3" name="telefonoCelular" placeholder="000-000-0000"></Field>
                                                        <ErrorMessage name="telefonoCelular">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="telefonoResidencial"> Telefono residencial <span>(opcional)</span>
                                                        <Field type="text" className="form-control mt-3" name="telefonoResidencial" placeholder="000-000-0000"></Field>
                                                        <ErrorMessage name="telefonoResidencial">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label htmlFor="telefonoOficina"> Telefono oficina <span>(opcional)</span>
                                                        <Field type="text" className="form-control mt-3" name="telefonoOficina" placeholder="000-000-0000"></Field>
                                                        <ErrorMessage name="telefonoOficina">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
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
                                                        <ErrorMessage name="nombrePadre">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="nombreMadre"> Madre
                                                        <Field type="text" className="form-control mt-3" name="nombreMadre" placeholder="Nombre "></Field>
                                                        <ErrorMessage name="nombreMadre">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="nombreConyuge"> Conyuge
                                                        <Field type="text" className="form-control mt-3" name="nombreConyuge" placeholder="Nombre "></Field>
                                                        <ErrorMessage name="nombreConyuge">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            {/*Apartado para los hijos*/}
                                            <div>
                                                <div className='card m-5'>
                                                    <FieldArray name='volutarioHijos' render={arrayHelpers => (
                                                        <>
                                                            <div className='col minicomponete'>
                                                                <center>
                                                                    <button type='button' className="btn btn-primary mt-3 " onClick={() => arrayHelpers.push({})}>Agregar hijo</button>
                                                                </center>
                                                            </div>
                                                            {values.volutarioHijos.map((hijo, i) =>
                                                            (<div key={i}>
                                                                <button type='button' className="b mt-5 ms-4" onClick={() => arrayHelpers.remove(i)} >X</button>

                                                                <div className=" card-body row mt-3">

                                                                    <div className="col  minicomponete">
                                                                        <label htmlFor={'volutarioHijos.' + i + '.nombreHijo'}> Nombre:
                                                                            <Field type="text" className="form-control mt-3" name={`volutarioHijos.${i}.nombres`} placeholder="Nombres" />
                                                                            <ErrorMessage name={`volutarioHijos.${i}.nombres`}>{msg => <div className="errorMessage">{msg}</div>}</ErrorMessage>
                                                                        </label>
                                                                    </div>

                                                                    <div className="col minicomponete">
                                                                        <label htmlFor={`volutarioHijos.${i}.apellidos`}> Apellido:
                                                                            <Field type='text' className="form-control mt-3" name={`volutarioHijos.${i}.apellidos`} placeholder="Apellidos" />
                                                                            <ErrorMessage name={`volutarioHijos.${i}.apellidos`}>{msg => <div className="errorMessage">{msg}</div>}</ErrorMessage>
                                                                        </label>
                                                                    </div>

                                                                    <div className="row mt-3">
                                                                        <div className="col minicomponete">
                                                                            <label htmlFor={`volutarioHijos.${i}.fechaNacimiento`} > Fecha nacimiento
                                                                                <Field type="date" className="form-control mt-3" name={`volutarioHijos.${i}.fechaNacimiento`} placeholder="FechaNacimiento" />
                                                                                <ErrorMessage name={`volutarioHijos.${i}.fechaNacimiento`}>{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                                            </label>
                                                                        </div>

                                                                        {loading ? (
                                                                            <div className="col minicomponete" >
                                                                                <div className="spinner-border" role="status" />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="col minicomponete">
                                                                                {
                                                                                    <label htmlFor="sexoId">Sexo
                                                                                        <Field as="select" defaultValue={0} name={`volutarioHijos.${i}.sexoId`} className="form-select mt-3" aria-label="Default select example"  >
                                                                                            <option value={0} disabled >Selecciona el sexo </option>
                                                                                            {sexo.map((sex, i) => (
                                                                                                <option key={i} value={sex.sexoId} >{sex.sexoNombre}</option>
                                                                                            ))}
                                                                                        </Field>
                                                                                        <ErrorMessage name={`volutarioHijos.${i}.sexoId`}>{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                                                    </label>
                                                                                }
                                                                            </div>
                                                                        )
                                                                        }
                                                                    </div>

                                                                </div>

                                                            </div>
                                                            ))}
                                                        </>
                                                    )}>

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
                                                        <Field className="form-check " type="checkbox" name="esEmpleado" id="esEmpleado" />
                                                        {values.esEmpleado &&
                                                            <Field type="text" className="form-control mt-1" name="dondeTrabaja" placeholder="Donde" />
                                                        }
                                                        <ErrorMessage name="dondeTrabaja">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
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
                                                                <select as="select" onBlur={handleBlur} defaultValue={0} name="nivelAcademicoId" Component="Input" className="form-select mt-3" onChange={(e) => {cambiarNivel(e); handleChange(e);}} aria-label="Default select example"  >
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
                                                <div className="row mt-3">
                                                    <div className="col minicomponete">
                                                        <label htmlFor="nombreInstitucionAcademica">Nombre de la institucion academica
                                                            <Field type="text" className="form-control mt-3" name="nombreInstitucionAcademica" placeholder="Institucion academica "></Field>
                                                            <ErrorMessage name="nombreInstitucionAcademica">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                        </label>
                                                    </div>
                                                </div>

                                                {nivelSuperior && (<>
                                                <div className="row mt-3">
                                                    <div className="col minicomponete">
                                                        <label htmlFor="NombreCarrera"> Profesión
                                                            <Field type="text" className="form-control mt-3" name="NombreCarrera" placeholder="Carrera "></Field>
                                                            <ErrorMessage name="NombreCarrera">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                        </label>
                                                    </div>
                                                </div>
                                            </>)
                                            }


                                            <div className="row ">
                                                <div className=" col minicomponete">
                                                    <label className='mt-3' htmlFor="otraInstitucionVoluntariosNombre">  En otra institucion ha pertenecido como voluntario
                                                        <Field className="form-check " type="checkbox" name="otraInstitucionVoluntariosHaPertenecido" />
                                                        {values.otraInstitucionVoluntariosHaPertenecido &&
                                                            <Field type="text" className="form-control mt-1" name="otraInstitucionVoluntariosNombre" placeholder="Nombre institucion"></Field>
                                                        }
                                                        <ErrorMessage name="otraInstitucionVoluntariosNombre">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>

                                                        {values.otraInstitucionVoluntariosHaPertenecido &&
                                                            <label className="mt-3 my-3" htmlFor="otraInstitucionVoluntariosCargo"> Cargo dentro de la institucion
                                                                <Field type="text" className="form-control mt-3 my-3" name="otraInstitucionVoluntariosCargo" placeholder="Cargo "></Field>
                                                                <ErrorMessage name="otraInstitucionVoluntariosCargo">{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                            </label>
                                                        }
                                                    </label>
                                                </div>

                                                <div className="row ">
                                                    <div className=" col minicomponete">
                                                        <label className='mt-3' htmlFor="sabeNadar"> Sabe nadar
                                                            <input className="form-check " type="checkbox" name="sabeNadar" onChange={() => { setchecksabenadar(!checksabenadar); }} ></input>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="row ">
                                                    <div className=" col minicomponete">
                                                        <label className='mt-3' htmlFor="sabeConducir"> Sabe conducir
                                                            <input className="form-check " type="checkbox" name="sabeConducir" onChange={() => { setchecksabeconducir(!checksabeconducir); }} ></input>
                                                        </label>
                                                    </div>
                                                </div>
 

                                                {/*APARTADO PARA LOS CURSOS:*/}
                                                <div>
                                            
                                                <div className='card m-5'>
                                                        <FieldArray name='voluntariosCursos' render={arrayHelpers => (
                                                            <>
                                                                <div className='col minicomponete'>
                                                                    <center>
                                                                        <button type='button' className="btn btn-primary mt-3 " onClick={() => arrayHelpers.push({})}>Agregar Curso</button>
                                                                    </center>
                                                                </div>
                                                                {values.voluntariosCursos.map((curso, i) =>
                                                                (<div key={i}>
                                                                    <button type='button' className="b mt-5 ms-4" onClick={() => arrayHelpers.remove(i)} >X</button>

                                                                    <div className=" card-body row mt-3">

                                                                        <div className="col  minicomponete">
                                                                            <label htmlFor={`voluntariosCursos.${i}.añoCurso`}> Año curso:
                                                                                <Field type="text" className="form-control mt-3" name={`voluntariosCursos.${i}.añoCurso`} placeholder="Año en que lo hizo" />
                                                                                <ErrorMessage name={`voluntariosCursos.${i}.añoCurso`}>{msg => <div className="errorMessage">{msg}</div>}</ErrorMessage>
                                                                            </label>
                                                                        </div>

                                                                        <div className="col minicomponete">
                                                                            <label htmlFor={`voluntariosCursos.${i}.nivelInstitucion`} > Nivel Institucion:
                                                                                <Field type='text' className="form-control mt-3" name={`voluntariosCursos.${i}.nivelInstitucion`} placeholder="Nivel institucion" />
                                                                                <ErrorMessage name={`voluntariosCursos.${i}.nivelInstitucion`}>{msg => <div className="errorMessage">{msg}</div>}</ErrorMessage>
                                                                            </label>
                                                                        </div>

                                                                        <div className="row mt-3">
                                                                            <div className="col minicomponete">
                                                                                <label htmlFor={`voluntariosCursos.${i}.nombreInstitucion`}>Nombre Institucion
                                                                                    <Field type='text' className="form-control mt-3" name={`voluntariosCursos.${i}.nombreInstitucion`} placeholder="Nombre instucion" />
                                                                                    <ErrorMessage name={`voluntariosCursos.${i}.nombreInstitucion`}>{msg => <div className="errorMessage">{msg}</div>}</ErrorMessage>
                                                                                </label>
                                                                            </div>

                                                                            {loading ? (
                                                                                <div className="col minicomponete" >
                                                                                    <div className="spinner-border" role="status" />
                                                                                </div>
                                                                            ) : (
                                                                                <div className="col minicomponete">
                                                                                    {
                                                                                        <label name={`voluntariosCursos.${i}.tipoCursoId`} >Tipo Curso:
                                                                                            <Field as="select" defaultValue={0} name={`voluntariosCursos.${i}.tipoCursoId`} className="form-select mt-3" aria-label="Default select example"  >
                                                                                                <option value={0} disabled >Selecciona el tipo curso </option>
                                                                                                {tipoCurso.map((curso, i) => (
                                                                                                    <option key={i} value={curso.tipoCursoId}>{curso.tipoCurso}</option>
                                                                                                ))}
                                                                                            </Field>
                                                                                            <ErrorMessage name={`voluntariosCursos.${i}.tipoCursoId`}>{msg => <div className='errorMessage'>{msg}</div>}</ErrorMessage>
                                                                                        </label>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                            }
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                                ))}
                                                            </>
                                                        )}>

                                                        </FieldArray>
                                                    </div>
                                                </div>

                                                <br />
                                                <br />

                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </div>

                                <div>{formularioEnviado && <p className='exito'>Formulario enviado con exito!</p>}</div>

                                <div className="centarlizar">
                                    <button type='submit' className="btn btn-primary px-5 " onClick={() => {
                                        FormSchema.validate(values).then( () =>{console.log("Bien") } ).catch((err) => {console.log(err)})
                                    } }>Enviar</button>
                                </div>
                            </Form>
                        )}>
                    </Formik>
                </div>
            </div>
        </>
    )
}
export default Formulario;