import React, { useState, useEffect, useRef } from "react";
import {
    Formik,
    Form,
    Field,
    FieldArray,
    ErrorMessage,
    useFormikContext,
} from "formik";

import FormSchema from "./Formulario.validations";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import MainService from "../Service/MainService";

const MunicipioField = (props) => {
    const {
        values: { provinciaId, municipioId },
        touched,
        setFieldValue,
    } = useFormikContext();

    useEffect( () => {
       const cargarMunicipio = async ()=>{
            const ms = new MainService();
            props.setmunicipio(await ms.municipiosGetAll(provinciaId));
            setFieldValue("municipioId", "0");
        }
        if (provinciaId>0)
            cargarMunicipio();
       else 
            setFieldValue("municipioId", "0");

    }, [provinciaId]);

    const childrens = props.children;
    return <>{childrens}</>;
};

const InputFile = (props) => {
    const [fileChargeState, setFileState] = useState(false);
    const [namefileCharge, setNameFile] = useState("");

    const fileInput = useRef();
    return (
        <div className="row mt-3">
            <div className="col minicomponete">
                <label htmlFor={props.name} className="wideControl">
                    {" "}
                    {props.title}
                    <input
                        type="file"
                        className="form-control mt-1 mb-4 fileInvisible"
                        ref={fileInput}
                        name={props.name}
                        onChange={(a) => {
                            setFileState(true);
                            setNameFile(
                                a.target.value.split("\\")[
                                a.target.value.split("\\").length - 1
                                ]
                            );
                            //props.setFieldValue(props.name+"_file", a.target.files[0]);

                            props.handleChange(a);
                        }}
                    ></input>
                    {(!fileChargeState && (
                        <button
                            type="button"
                            className="addFileBtn btn btn-primary w-75 mb-4"
                            onClick={() => {
                                fileInput.current.click();
                            }}
                        >
                            <i className="material-icons"></i> <span>Añadir Archivo</span>
                        </button>
                    )) || (
                            <div className="fileNameContainer">
                                <span className="fileName px-2 h-100 py-2 mt-2 mx-2">
                                    {namefileCharge}
                                </span>
                                <button
                                    type="button"
                                    className="btnDeleteFile btn btn-danger  mt-2"
                                    onClick={(a) => {
                                        fileInput.current.value = "";
                                        
                                        if (fileInput.current.value) {
                                            fileInput.current.type = "text";
                                            fileInput.current.type = "file";
                                        }

                                        setFileState(false);
                                        

                                        // var event = document.createEvent("UIEvents");
                                        //event.initUIEvent("change", true, true,null,null);
                                        const event = new Event('change', { bubbles: true });
                                        const sevent=
                                        {
                                            nativeEvent: event,
                                            currentTarget: fileInput.current,
                                            target: fileInput.current ,
                                            bubbles: event.bubbles,
                                            cancelable: event.cancelable,
                                            defaultPrevented: event.defaultPrevented,
                                            eventPhase: event.eventPhase,
                                            isTrusted: event.isTrusted,
                                            preventDefault:false,
                                            isDefaultPrevented: false,
                                            stopPropagation:false,
                                            isPropagationStopped: false,
                                            persist: () => {},
                                            timeStamp: event.timeStamp,
                                            type: event.type,
                                          }

                                        props.handleChange(sevent);
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        )}
                    <ErrorMessage name={props.name}>
                        {(msg) => <div className="errorMessage">{msg}</div>}
                    </ErrorMessage>
                </label>
            </div>
        </div>
    );
};

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 50,
                height: 58,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

const Formulario = () => {
    //peticiones de select
    const [errorMessage,setErrorMessage]= useState("");

    const [estaciones, setEstaciones] = useState([]);
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
    const [src, setSrc] = useState("");
    const [crop, setCrop] = useState();
    const [fotoRecortada,setFotoRecortada]=useState(null);
    

    const imgRef = useRef();

    const [completedCrop, setCompletedCrop] = useState()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState(268 / 312)


    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setSrc(reader.result.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    function onImageLoad(e) {
        const { width, height } = e.currentTarget
        
        setCrop(centerAspectCrop(width, height, aspect))
    }


    const canvasControl = useRef();

    var carnetBG = useRef();
    var image = useRef();

    useEffect(() => {
        setLoading(true);
        async function cargarDatos() {
            let ms = new MainService();
            setEstaciones(await ms.estacionesGetAll());
            setcargo(await ms.cargosGetAll());
            setsexo(await ms.sexosGetAll());
            setnacionalidad(await ms.nacionalidadesGetAll());
            setcivil(await ms.estadoCivilGetAll());
            setgruposanguineo(await ms.gruposSanguineosGetAll());
            settallas(await ms.tallasGetAll());
            setcategoria(await ms.licenciasCategoriasGetAll());
            setpronvincia(await ms.provinciasGetAll());
            setmunicipio(await ms.municipiosGetAll());
            setnivelacademico(await ms.nivelAcademicoGetAll());
            setTipoCurso(await ms.tiposCursosGetAll());

            setLoading(false);
        }

        cargarDatos();

        carnetBG.current = new Image();
        carnetBG.current.src = "/img/Cardnetvacio.jpeg";

        return () => {
            setLoading(false);
        };
    }, []);

    const tieneLicenciaHandler = (event, values, setFieldValue) => {
        setFieldValue("sabeConducir", !values.tieneLicencia);
    };

    const clearFields = (setFieldValue, fields) => {
        fields.forEach((field, index) => {
            setFieldValue(field.name, field.defaultValue);
        });
    };

    const [formularioEnviado, setFormularioEnviado] = useState(false);
    const [submited, setSubmited]=useState(false);
    return (
        <>
            <div className="formulario ">
                <div className="card-body ml-5">
                {formularioEnviado?(
                                <div>
                                  <img
                                        className="w-50 d-flex justify-content-center"
                                        src="https://www.defensacivil.gob.do/images/plantilla/logo_defensa_civil_ultimate.png"
                                        alt="Logo de la defensa civil"
                                    />

                                        <p className="exito">Formulario enviado con exito!</p>
                                   
                                </div>
                 ):(
                    <Formik
                        validationSchema={FormSchema}
                        initialValues={{
                            //Datos Personales:
                            fechaIngresoInstitucion: "",
                            cargoEnInstucionId: 0,
                            cedula: "",
                            nombres: "",
                            apellidos: "",
                            apodo: "",
                            sexoId: 0,
                            fechaNacimiento: "",
                            lugarNacimiento: "",
                            nacionalidadId: 0,
                            estadoCivilId: 0,
                            estacionId:0,
                            estaturaEnPie: "", //Luego poner ''
                            pesoEnLibras: "0",
                            colorPelo: "",
                            colorPiel: "",
                            grupoSanguineoId: 0,
                            tallaCamisetaId: 0,
                            tienePasaporte: false,
                            pasaporteNum: "",
                            tieneCuentaReservas: false,
                            numeroCuenta: "",
                            tieneNSS: false,
                            nss: "",
                            tieneLicencia: false,
                            licenciaCategoriaId: "0",
                            //Informacion de contacto:
                            direccion: "",
                            sector: "",
                            provinciaId: 0,
                            municipioId: 0,
                            correoElectronico: "",
                            telefonoCelular: "",
                            telefonoResidencial: "",
                            telefonoOficina: "",

                            //Datos familiares:
                            nombrePadre: "",
                            nombreMadre: "",
                            nombreConyuge: "",
                            tieneHijos: false,
                            volutarioHijos: [],
                            voluntariosCursos: [],

                            //Experiencia:
                            esEmpleado: false,
                            dondeTrabaja: "",
                            nivelAcademicoId: 0,

                            nivelSuperior: false,
                            nombreInstitucionAcademica: "",
                            nombreCarrera: "",
                            otraInstitucionVoluntariosHaPertenecido: false,
                            otraInstitucionVoluntariosCargo: "",
                            otraInstitucionVoluntariosNombre: "",
                            sabeNadar: false,
                            sabeConducir: false,

                            //---------------------- FIJOS:
                            recomendadoPor: "",
                            creadoPor: "string",
                            fechaCreacion: "2022-07-06",
                            modificadoPor: "string",
                            fechaModificacion: "2022-07-06",

                            //Documentos
                            voluntariosDocumentos: [],
                            fotoCuadrada: "",
                            copiaCedula: "",
                            copiaPasaporte: "",
                            fotoLicencia: "",
                            copiaCurriculo: ""

                        }}
                        onSubmit={(values,z) => {
                            
                            const formData = new FormData();
                            formData.append("voluntarios",JSON.stringify(values));
                            
                            if (fotoRecortada!=null)
                                formData.append("fotoCuadrada_file",fotoRecortada);
                            
                            if (document.getElementsByName("copiaCedula")[0].files.length>0)
                                formData.append("copiaCedula_file",document.getElementsByName("copiaCedula")[0].files[0]);
                            
                            if (document.getElementsByName("copiaPasaporte")[0].files.length>0)
                                formData.append("copiaPasaporte_file",document.getElementsByName("copiaPasaporte")[0].files[0]);

                            if (document.getElementsByName("fotoLicencia")[0].files.length>0)
                                formData.append("fotoLicencia_file",document.getElementsByName("fotoLicencia")[0].files[0]);
                            
                            if (document.getElementsByName("copiaCurriculo")[0].files.length>0)
                                formData.append("copiaCurriculo_file",document.getElementsByName("copiaCurriculo")[0].files[0]);

                            let ms = new MainService();
                            ms.save(formData).then(()=>{
                                setFormularioEnviado(true);
                            }).catch((x)=>{
                                setErrorMessage(x);
                                setFormularioEnviado(false);
                            });
                            
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                        }) => (
                            <Form>
                                <div className="card p-4 m-4 git  d-flex justify-content-center ">
                                    <img
                                        className="w-50 d-flex justify-content-center"
                                        src="https://www.defensacivil.gob.do/images/plantilla/logo_defensa_civil_ultimate.png"
                                        alt="Logo de la defensa civil"
                                    />
                                    <h2 className=" p-4 m-4 text-info">
                                        Formulario para ingreso de voluntarios (nuevos y
                                        actualización)
                                    </h2>
                                </div>
                                <div>
                                    {errorMessage}
                                </div>
                                <div className="formulario">
                                    <div className="card m-3 xs ">
                                        <div className="card ">
                                            <h5 className="card-title px-5 mt-5 mb-5">
                                                Datos personales{" "} 
                                            </h5>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col  minicomponete">
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col  minicomponete">
                                                        {
                                                            <label
                                                                htmlFor="estacionId"
                                                                className="mt-3"
                                                            >
                                                                Estación:
                                                                <Field
                                                                    as="select"
                                                                    name="estacionId"
                                                                    className="form-select mt-1 mb-3"
                                                                    aria-label="Default select example"
                                                                >
                                                                    <option value="0">
                                                                        Seleccione su estación
                                                                    </option>
                                                                    {estaciones.map((estacion, i) => (
                                                                        <option key={i} value={estacion.estacionId}>
                                                                            {estacion.estacionNombre}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="estacionId">
                                                                    {(msg) => (
                                                                        <div className="errorMessage">{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col  minicomponete">
                                                    <label htmlFor="fechaIngresoInstitucion">
                                                        Ingreso a la institución
                                                        <Field
                                                            type="date"
                                                            className="form-control mt-1 mb-4"
                                                            name="fechaIngresoInstitucion"
                                                            placeholder="Institución "
                                                        />
                                                        <ErrorMessage name="fechaIngresoInstitucion">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>

                                                {loading ? (
                                                    <div className="col  minicomponete">
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col  minicomponete">
                                                        {
                                                            <label
                                                                htmlFor="cargoEnInstucionId"
                                                                className="mt-3"
                                                            >
                                                                Cargo en la institución
                                                                <Field
                                                                    as="select"
                                                                    name="cargoEnInstucionId"
                                                                    className="form-select mt-1 mb-3"
                                                                    aria-label="Default select example"
                                                                >
                                                                    <option disabled value="0">
                                                                        Selecciona cargo
                                                                    </option>
                                                                    {cargo.map((cargos, i) => (
                                                                        <option key={i} value={cargos.cargoId}>
                                                                            {cargos.cargoNombre}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="cargoEnInstucionId">
                                                                    {(msg) => (
                                                                        <div className="errorMessage">{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col  minicomponete">
                                                    <label
                                                        htmlFor="Nombre"
                                                        className="wideControl"
                                                        style={{ paddingTop: "15px" }}
                                                    >
                                                        Nombre(s)
                                                        <Field
                                                            type="text"
                                                            id="nombres"
                                                            className="form-control mt-1 mb-4"
                                                            name="nombres"
                                                            placeholder="Nombres "
                                                        />
                                                        <ErrorMessage name="nombres">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label
                                                        htmlFor="apellidos"
                                                        className="wideControl"
                                                        style={{ paddingTop: "15px" }}
                                                    >
                                                        Apellido(s)
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="apellidos"
                                                            placeholder="Apellidos "
                                                        />
                                                        <ErrorMessage name="apellidos">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="apodo" className="wideControl">
                                                        {" "}
                                                        Apodo (opcional)
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="apodo"
                                                            placeholder="Apodo"
                                                        ></Field>
                                                        <ErrorMessage name="apodo">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete">
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        <label htmlFor="sexoId">
                                                            Sexo
                                                            <Field
                                                                as="select"
                                                                name="sexoId"
                                                                className="form-select mt-1 mb-3"
                                                                aria-label="Default select example"
                                                            >
                                                                <option value={0} disabled>
                                                                    Selecciona el sexo{" "}
                                                                </option>
                                                                {sexo.map((sex, i) => (
                                                                    <option key={i} value={sex.sexoId}>
                                                                        {sex.sexoNombre}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage name="sexoId">
                                                                {(msg) => (
                                                                    <div className="errorMessage">{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </div>
                                                )}

                                                <div className="col minicomponete ">
                                                    <label htmlFor="cedula">
                                                        Cédula
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="cedula"
                                                            placeholder="000-0000000-0 "
                                                        />
                                                        <ErrorMessage name="cedula">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="fechaNacimiento">
                                                        {" "}
                                                        Fecha de nacimiento
                                                        <Field
                                                            type="date"
                                                            className="form-control mt-1 mb-4"
                                                            name="fechaNacimiento"
                                                            placeholder="Fecha - Nacimiento"
                                                        />
                                                        <ErrorMessage name="fechaNacimiento">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label
                                                        htmlFor="lugarNacimiento"
                                                        className="wideControl"
                                                    >
                                                        {" "}
                                                        Lugar de nacimiento
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="lugarNacimiento"
                                                            placeholder="Lugar de Nacimiento "
                                                        />
                                                        <ErrorMessage name="lugarNacimiento">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete">
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="estadoCivilId">
                                                                {" "}
                                                                Estado civil
                                                                <Field
                                                                    as="select"
                                                                    name="estadoCivilId"
                                                                    className="form-select mt-1 mb-3"
                                                                    aria-label="Default select example"
                                                                >
                                                                    <option value={0} disabled>
                                                                        Selecciona estado civil{" "}
                                                                    </option>
                                                                    {civil.map((estado, i) => (
                                                                        <option
                                                                            key={i}
                                                                            value={estado.estadoCivilId}
                                                                        >
                                                                            {estado.estadoCivilNombre}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="estadoCivilId">
                                                                    {(msg) => (
                                                                        <div className="errorMessage">{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete">
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="nacionalidadId">
                                                                {" "}
                                                                Nacionalidad
                                                                <Field
                                                                    as="select"
                                                                    name="nacionalidadId"
                                                                    className="form-select mt-1 mb-3"
                                                                    aria-label="Default select example"
                                                                >
                                                                    <option value={0} disabled>
                                                                        Selecciona nacionalidad
                                                                    </option>
                                                                    {nacionalidad.map((n, i) => (
                                                                        <option key={i} value={n.nacionalidadId}>
                                                                            {n.nacionalidadNombre}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="nacionalidadId">
                                                                    {(msg) => (
                                                                        <div className="errorMessage">{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="estaturaEnPie">
                                                        Estatura(Expresada en pies y con punto. Ejemplo: 5.8 equivalente a 5 pies 8 pulgadas)
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="estaturaEnPie"
                                                            placeholder="Estatura"
                                                        />
                                                        <ErrorMessage name="estaturaEnPie">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor="pesoEnLibras">
                                                        {" "}
                                                        Peso(en libras)
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="pesoEnLibras"
                                                            placeholder="Peso en libras"
                                                        />
                                                        <ErrorMessage name="pesoEnLibras">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col minicomponete">
                                                    <label htmlFor=" colorPelo">
                                                        {" "}
                                                        Color de pelo
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="colorPelo"
                                                            placeholder="Color de pelo"
                                                        />
                                                        <ErrorMessage name="colorPelo">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>

                                                <div className="col minicomponete">
                                                    <label htmlFor="colorPiel">
                                                        {" "}
                                                        Color de piel
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="colorPiel"
                                                            placeholder="Color de piel"
                                                        />
                                                        <ErrorMessage name="colorPiel">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete">
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="grupoSanguineoId">
                                                                {" "}
                                                                Grupo sanguineo
                                                                <Field
                                                                    as="select"
                                                                    name="grupoSanguineoId"
                                                                    className="form-select mt-1 mb-3"
                                                                    placeholder="hola"
                                                                    aria-label="Default select example"
                                                                >
                                                                    <option value={0} disabled>
                                                                        Selecciona
                                                                    </option>
                                                                    {gruposanguineo.map((grupo, i) => (
                                                                        <option
                                                                            key={i}
                                                                            value={grupo.grupoSanguineoId}
                                                                        >
                                                                            {grupo.grupoSanguineo}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="grupoSanguineoId">
                                                                    {(msg) => (
                                                                        <div className="errorMessage">{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            <div className="row mt-3">
                                                {loading ? (
                                                    <div className="col minicomponete">
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                ) : (
                                                    <div className="col minicomponete">
                                                        {
                                                            <label htmlFor="tallaCamisetaId">
                                                                Talla de camiseta
                                                                <Field
                                                                    as="select"
                                                                    name="tallaCamisetaId"
                                                                    className="form-select mt-1 mb-3"
                                                                    aria-label="Default select example"
                                                                >
                                                                    <option value={0} disabled>
                                                                        Selecciona una talla
                                                                    </option>
                                                                    {tallas.map((grupo, i) => (
                                                                        <option
                                                                            key={i}
                                                                            value={grupo.tallaCamisetaId}
                                                                        >
                                                                            {grupo.tallaCamiseta}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage name="tallaCamisetaId">
                                                                    {(msg) => (
                                                                        <div className="errorMessage">{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className="mt-3" htmlFor="pasaporteNum">
                                                        {" "}
                                                        Marcar la casilla a continuación si tiene un pasaporte
                                                        <Field
                                                            name="tienePasaporte"
                                                            className="form-check"
                                                            type="checkbox"
                                                            id="tienePasaporte"
                                                            onClick={() =>
                                                                clearFields(setFieldValue, [
                                                                    { name: "pasaporteNum", defaultValue: "" },
                                                                ])
                                                            }
                                                        />
                                                        {values.tienePasaporte && (
                                                            <>
                                                                <Field
                                                                    type="text"
                                                                    className="form-control mt-1 mb-4"
                                                                    name="pasaporteNum"
                                                                    placeholder="Número de pasaporte"
                                                                />
                                                            </>
                                                        )}
                                                        <ErrorMessage name="pasaporteNum">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className="mt-3" htmlFor="numeroCuenta">
                                                        {" "}
                                                        Marcar la casilla a continuación si tiene una cuenta bancaria en el *Banreservas*
                                                        <Field
                                                            className="form-check "
                                                            type="checkbox"
                                                            name="tieneCuentaReservas"
                                                            onClick={() =>
                                                                clearFields(setFieldValue, [
                                                                    { name: "numeroCuenta", defaultValue: "" },
                                                                ])
                                                            }
                                                        />
                                                        {values.tieneCuentaReservas && (
                                                            <Field
                                                                type="text"
                                                                className="form-control mt-1 mb-4"
                                                                name="numeroCuenta"
                                                                placeholder="Número de cuenta"
                                                            />
                                                        )}
                                                        <ErrorMessage name="numeroCuenta">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className="mt-3" htmlFor="nss">
                                                        {" "}
                                                        Marcar la casilla a continuación si tiene número de seguro social (NSS)
                    
                                                        <Field
                                                            className="form-check "
                                                            type="checkbox"
                                                            name="tieneNSS"
                                                            onClick={() =>
                                                                clearFields(setFieldValue, [
                                                                    { name: "nss", defaultValue: "" },
                                                                ])
                                                            }
                                                        ></Field>
                                                        {values.tieneNSS && (
                                                            <Field
                                                                type="text"
                                                                className="form-control mt-1 mb-4"
                                                                name="nss"
                                                                placeholder="nss"
                                                            ></Field>
                                                        )}
                                                        <ErrorMessage name="nss">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className=" col minicomponete">
                                                    <label className="mt-3" htmlFor="licenciaCategoriaId">
                                                        {" "}
                                                        Marcar la casilla a continuación si tiene licencia de conducir
                                                        <Field
                                                            className="form-check "
                                                            type="checkbox"
                                                            name="tieneLicencia"
                                                            onClick={(e) => {
                                                                tieneLicenciaHandler(e, values, setFieldValue);
                                                                clearFields(setFieldValue, [
                                                                    {
                                                                        name: "licenciaCategoriaId",
                                                                        defaultValue: "0",
                                                                    },
                                                                ]);
                                                            }}
                                                        ></Field>
                                                        {values.tieneLicencia && (
                                                            <Field
                                                                as="select"
                                                                name="licenciaCategoriaId"
                                                                className="form-select mt-1 mb-3"
                                                                aria-label="Default select example"
                                                            >
                                                                <option value="0">
                                                                    Selecciona la categoría
                                                                </option>
                                                                {categoria.map((grupo, i) => (
                                                                    <option
                                                                        key={i}
                                                                        value={grupo.licenciaCategoriaId}
                                                                    >
                                                                        {grupo.licenciaCategoria}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                        )}
                                                        <ErrorMessage name="licenciaCategoriaId">
                                                            {(msg) => (
                                                                <div className="errorMessage">{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </label>
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </div>

                                <div className=" card m-3 xs ">
                                    <div className="card">
                                        <h5 className="card-title ml-3 px-5 mt-5 mb-5">
                                            Información de contacto
                                        </h5>

                                        <div className="row mt-3">
                                            <div className="col minicomponete">
                                                <label htmlFor="direccion" className="wideControl">
                                                    {" "}
                                                    Dirección
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="direccion"
                                                        placeholder="Direccion "
                                                    ></Field>
                                                    <ErrorMessage name="direccion">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            {loading ? (
                                                <div className="col minicomponete">
                                                    <div className="spinner-border" role="status" />
                                                </div>
                                            ) : (
                                                <div className="col minicomponete">
                                                    {
                                                        <label htmlFor="provinciaId">
                                                            {" "}
                                                            Provincia
                                                            <Field
                                                                as="select"
                                                                name="provinciaId"
                                                                className="form-select mt-1 mb-3"
                                                                aria-label="Default select example"
                                                            >
                                                                <option value={0} disabled>
                                                                    Selecciona provincia
                                                                </option>
                                                                {provincia.map((grupo, i) => (
                                                                    <option key={i} value={grupo.provinciaId}>
                                                                        {grupo.provinciaNombre}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage
                                                                name="provinciaId"
                                                                component={() => (
                                                                    <div className="errorMessage">
                                                                        {errors.provinciaId}
                                                                    </div>
                                                                )}
                                                            />
                                                        </label>
                                                    }
                                                </div>
                                            )}

                                            {loading ? (
                                                <div className="col minicomponete">
                                                    <div className="spinner-border" role="status" />
                                                </div>
                                            ) : (
                                                <div className="col minicomponete">
                                                    <MunicipioField setmunicipio={setmunicipio}>
                                                        <label htmlFor="municipioId">
                                                            {" "}
                                                            Municipio
                                                            <Field
                                                                as="select"
                                                                name="municipioId"
                                                                className="form-select mt-1 mb-3"
                                                                placeholder="hola"
                                                                aria-label="Default select example"
                                                            >
                                                                <option value={0} disabled>
                                                                    Selecciona Municipio
                                                                </option>
                                                                {municipio.map((grupo, i) => (
                                                                    <option key={i} value={grupo.municipioId}>
                                                                        {grupo.municipioNombre}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage
                                                                name="municipioId"
                                                                component={() => (
                                                                    <div className="errorMessage">
                                                                        {errors.municipioId}
                                                                    </div>
                                                                )}
                                                            />
                                                        </label>
                                                    </MunicipioField>
                                                </div>
                                            )}
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col  minicomponete">
                                                <label htmlFor="sector" className="wideControl">
                                                    {" "}
                                                    Sector
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="sector"
                                                        placeholder="Sector "
                                                    ></Field>
                                                    <ErrorMessage name="sector">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col minicomponete">
                                                <label
                                                    htmlFor="correoElectronico"
                                                    className="wideControl"
                                                >
                                                    {" "}
                                                    Correo electrónico
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="correoElectronico"
                                                        placeholder="Correo@correo.com"
                                                    ></Field>
                                                    <ErrorMessage name="correoElectronico">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col minicomponete">
                                                <label
                                                    htmlFor="telefonoCelular"
                                                    className="wideControl"
                                                >
                                                    {" "}
                                                    Teléfono celular
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="telefonoCelular"
                                                        placeholder="000-000-0000"
                                                    ></Field>
                                                    <ErrorMessage name="telefonoCelular">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col minicomponete">
                                                <label htmlFor="telefonoResidencial">
                                                    {" "}
                                                    Teléfono residencial <span>(opcional)</span>
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="telefonoResidencial"
                                                        placeholder="000-000-0000"
                                                    ></Field>
                                                    <ErrorMessage name="telefonoResidencial">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>

                                            <div className="col minicomponete">
                                                <label htmlFor="telefonoOficina">
                                                    {" "}
                                                    Teléfono oficina <span>(opcional)</span>
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="telefonoOficina"
                                                        placeholder="000-000-0000"
                                                    ></Field>
                                                    <ErrorMessage name="telefonoOficina">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        <br />
                                        <br />
                                    </div>
                                </div>

                                <div className=" card m-3 xs ">
                                    <div className="card">
                                        <h5 className="card-title px-5 mt-5 mb-5">
                                            Datos familiares
                                        </h5>
                                        <div className="row mt-3">
                                            <div className="col minicomponete">
                                                <label htmlFor="nombrePadre" className="wideControl">
                                                    {" "}
                                                    Padre
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="nombrePadre"
                                                        placeholder="Nombre"
                                                    ></Field>
                                                    <ErrorMessage name="nombrePadre">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col minicomponete">
                                                <label htmlFor="nombreMadre" className="wideControl">
                                                    {" "}
                                                    Madre
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="nombreMadre"
                                                        placeholder="Nombre "
                                                    ></Field>
                                                    <ErrorMessage name="nombreMadre">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col minicomponete">
                                                <label htmlFor="nombreConyuge" className="wideControl">
                                                    {" "}
                                                    Conyuge
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="nombreConyuge"
                                                        placeholder="Nombre "
                                                    ></Field>
                                                    <ErrorMessage name="nombreConyuge">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        {/*Apartado para los hijos*/}
                                        <div>
                                            <div className="card m-3">
                                                <FieldArray
                                                    name="volutarioHijos"
                                                    initialValues={{ nombres: "test", apellidos: "" }}
                                                    render={(arrayHelpers) => (
                                                        <>
                                                            {values.volutarioHijos.map((hijo, i) => (
                                                                <div key={i}>
                                                                    <button
                                                                        type="button"
                                                                        className="b mt-5 ms-4"
                                                                        onClick={() => arrayHelpers.remove(i)}
                                                                    >
                                                                        X
                                                                    </button>

                                                                    <div className=" card-body row mt-3">
                                                                        <div className="col  minicomponete">
                                                                            <label
                                                                                htmlFor={
                                                                                    "volutarioHijos." + i + ".nombres"
                                                                                }
                                                                            >
                                                                                {" "}
                                                                                Nombre:
                                                                                <Field
                                                                                    className="form-control mt-1 mb-4"
                                                                                    value={hijo.nombres || ""}
                                                                                    onChange={handleChange}
                                                                                    name={`volutarioHijos.${i}.nombres`}
                                                                                    placeholder="Nombres"
                                                                                />
                                                                                <ErrorMessage
                                                                                    name={`volutarioHijos.${i}.nombres`}
                                                                                >
                                                                                    {(msg) => (
                                                                                        <div className="errorMessage">
                                                                                            {msg}
                                                                                        </div>
                                                                                    )}
                                                                                </ErrorMessage>
                                                                            </label>
                                                                        </div>

                                                                        <div className="col minicomponete">
                                                                            <label
                                                                                htmlFor={`volutarioHijos.${i}.apellidos`}
                                                                            >
                                                                                {" "}
                                                                                Apellido:
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control mt-1 mb-4"
                                                                                    value={hijo.apellidos || ""}
                                                                                    onChange={handleChange}
                                                                                    name={`volutarioHijos.${i}.apellidos`}
                                                                                    placeholder="Apellidos"
                                                                                />
                                                                                <ErrorMessage
                                                                                    name={`volutarioHijos.${i}.apellidos`}
                                                                                >
                                                                                    {(msg) => (
                                                                                        <div className="errorMessage">
                                                                                            {msg}
                                                                                        </div>
                                                                                    )}
                                                                                </ErrorMessage>
                                                                            </label>
                                                                        </div>

                                                                        <div className="row mt-3">
                                                                            <div className="col minicomponete">
                                                                                <label
                                                                                    htmlFor={`volutarioHijos.${i}.fechaNacimiento`}
                                                                                >
                                                                                    {" "}
                                                                                    Fecha nacimiento
                                                                                    <Field
                                                                                        type="date"
                                                                                        value={hijo.fechaNacimiento || ""}
                                                                                        onChange={handleChange}
                                                                                        className="form-control mt-1 mb-4"
                                                                                        name={`volutarioHijos.${i}.fechaNacimiento`}
                                                                                        placeholder="FechaNacimiento"
                                                                                    />
                                                                                    <ErrorMessage
                                                                                        name={`volutarioHijos.${i}.fechaNacimiento`}
                                                                                    >
                                                                                        {(msg) => (
                                                                                            <div className="errorMessage">
                                                                                                {msg}
                                                                                            </div>
                                                                                        )}
                                                                                    </ErrorMessage>
                                                                                </label>
                                                                            </div>

                                                                            {loading ? (
                                                                                <div className="col minicomponete">
                                                                                    <div
                                                                                        className="spinner-border"
                                                                                        role="status"
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <div className="col minicomponete">
                                                                                    {
                                                                                        <label htmlFor="sexoId">
                                                                                            Sexo
                                                                                            <Field
                                                                                                as="select"
                                                                                                name={`volutarioHijos.${i}.sexoId`}
                                                                                                className="form-select mt-1 mb-3"
                                                                                                aria-label="Default select example"
                                                                                            >
                                                                                                <option value="">
                                                                                                    Seleccione el sexo{" "}
                                                                                                </option>
                                                                                                {sexo.map((sex, i) => (
                                                                                                    <option
                                                                                                        key={i}
                                                                                                        value={sex.sexoId}
                                                                                                    >
                                                                                                        {sex.sexoNombre}
                                                                                                    </option>
                                                                                                ))}
                                                                                            </Field>
                                                                                            <ErrorMessage
                                                                                                name={`volutarioHijos.${i}.sexoId`}
                                                                                            >
                                                                                                {(msg) => (
                                                                                                    <div className="errorMessage">
                                                                                                        {msg}
                                                                                                    </div>
                                                                                                )}
                                                                                            </ErrorMessage>
                                                                                        </label>
                                                                                    }
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>
                                                                </div>
                                                            ))}
                                                            <div className="col minicomponete  pb-3">
                                                                <center>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-secondary mt-3 "
                                                                        onClick={() => arrayHelpers.push({})}
                                                                    >
                                                                        Agregar las informaciones de {values.volutarioHijos.length>0?"otro(a)":"un(a)"} hijo(a)
                                                                    </button>
                                                                </center>
                                                            </div>
                                                        </>
                                                    )}
                                                ></FieldArray>
                                            </div>
                                        </div>

                                        <br />
                                        <br />
                                    </div>
                                </div>

                                <div className=" card m-3 xs ">
                                    <div className="card">
                                        <h5 className="card-title px-5 mt-5 mb-5">Experiencia</h5>

                                        <div className="row ">
                                            <div className="col minicomponete">
                                                <label className="mt-3" htmlFor="dondeTrabaja">
                                                    {" "}
                                                    Es empleado actualmente?
                                                    <Field
                                                        className="form-check "
                                                        type="checkbox"
                                                        name="esEmpleado"
                                                        id="esEmpleado"
                                                        onClick={() =>
                                                            clearFields(setFieldValue, [
                                                                { name: "dondeTrabaja", defaultValue: "" },
                                                            ])
                                                        }
                                                    />
                                                    {values.esEmpleado && (
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="dondeTrabaja"
                                                            placeholder="Donde"
                                                        />
                                                    )}
                                                    <ErrorMessage name="dondeTrabaja">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col minicomponete">
                                                
                                                    <label
                                                        htmlFor="nivelAcademicoId"
                                                        className="wideControl"
                                                    >
                                                        {" "}
                                                        Nivel académico
                                                        <select
                                                            name="nivelAcademicoId"
                                                            className="form-select mt-1 mb-3"
                                                            onChange={(e) => {
                                                                setFieldValue(
                                                                    "nivelSuperior",
                                                                    e.target.options[e.target.selectedIndex]
                                                                        .dataset.requierenombre === "true"
                                                                );
                                                                clearFields(setFieldValue, [
                                                                    { name: "NombreCarrera", defaultValue: "" },
                                                                ]);

                                                                handleChange(e);
                                                            }}
                                                            aria-label="Default select example"
                                                        >
                                                            <option value={0}>
                                                                Selecciona nivel academico
                                                            </option>
                                                            {nivelacademico.map((grupo, i) => (
                                                                <option
                                                                    key={i}
                                                                    value={grupo.nivelAcademicoId}
                                                                    data-requierenombre={grupo.requiereNombre}
                                                                >
                                                                    {grupo.nivelAcademicoNombre}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </label>
                                                    <ErrorMessage name="nivelAcademicoId">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col minicomponete">
                                                <label
                                                    htmlFor="nombreInstitucionAcademica"
                                                    className="wideControl"
                                                >
                                                    Nombre de la institución académica
                                                    <Field
                                                        type="text"
                                                        className="form-control mt-1 mb-4"
                                                        name="nombreInstitucionAcademica"
                                                        placeholder="Institución académica"
                                                    ></Field>
                                                    <ErrorMessage name="nombreInstitucionAcademica">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </label>
                                            </div>
                                        </div>

                                        {values.nivelSuperior && (
                                            <>
                                                <div className="row mt-3">
                                                    <div className="col minicomponete">
                                                        <label htmlFor="NombreCarrera">
                                                            {" "}
                                                            Profesión
                                                            <Field
                                                                type="text"
                                                                className="form-control mt-1 mb-4"
                                                                name="NombreCarrera"
                                                                placeholder="Carrera "
                                                            ></Field>
                                                            <ErrorMessage name="NombreCarrera">
                                                                {(msg) => (
                                                                    <div className="errorMessage">{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="row ">
                                            <div className=" col minicomponete">
                                                <label
                                                    className="mt-3"
                                                    htmlFor="otraInstitucionVoluntariosNombre"
                                                >
                                                    {" "}
                                                    ¿En otra institución ha pertenecido como voluntario?
                                                    <Field
                                                        className="form-check "
                                                        type="checkbox"
                                                        name="otraInstitucionVoluntariosHaPertenecido"
                                                        onClick={(x) => {
                                                            clearFields(setFieldValue, [
                                                                {
                                                                    name: "otraInstitucionVoluntariosNombre",
                                                                    defaultValue: "",
                                                                },
                                                                {
                                                                    name: "otraInstitucionVoluntariosCargo",
                                                                    defaultValue: "",
                                                                },
                                                            ]);
                                                        }}
                                                    />
                                                    {values.otraInstitucionVoluntariosHaPertenecido && (
                                                        <Field
                                                            type="text"
                                                            className="form-control mt-1 mb-4"
                                                            name="otraInstitucionVoluntariosNombre"
                                                            placeholder="Nombre institucion"
                                                        ></Field>
                                                    )}
                                                    <ErrorMessage name="otraInstitucionVoluntariosNombre">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                    {values.otraInstitucionVoluntariosHaPertenecido && (
                                                        <label
                                                            className="mt-3 my-3"
                                                            htmlFor="otraInstitucionVoluntariosCargo"
                                                        >
                                                            {" "}
                                                            Cargo dentro de la institución
                                                            <Field
                                                                type="text"
                                                                className="form-control mt-1 mb-4 my-3"
                                                                name="otraInstitucionVoluntariosCargo"
                                                                placeholder="Cargo "
                                                            ></Field>
                                                            <ErrorMessage name="otraInstitucionVoluntariosCargo">
                                                                {(msg) => (
                                                                    <div className="errorMessage">{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    )}
                                                </label>
                                            </div>

                                            <div className="row ">
                                                <div className=" col minicomponete">
                                                    <label className="mt-3" htmlFor="sabeNadar">
                                                        {" "}
                                                        ¿Sabe nadar?
                                                        <Field
                                                            className="form-check "
                                                            type="checkbox"
                                                            name="sabeNadar"
                                                        ></Field>
                                                    </label>
                                                </div>
                                            </div>

                                            {!values.tieneLicencia && (
                                                <div className="row ">
                                                    <div className=" col minicomponete">
                                                        <label className="mt-3" htmlFor="sabeConducir">
                                                            {" "}
                                                            ¿Sabe conducir?
                                                            <Field
                                                                className="form-check "
                                                                type="checkbox"
                                                                name="sabeConducir"
                                                            ></Field>
                                                        </label>
                                                    </div>
                                                </div>
                                            )}

                                            {/*APARTADO PARA LOS CURSOS:*/}
                                            <div>
                                                <div className="card m-3">
                                                    <FieldArray
                                                        name="voluntariosCursos"
                                                        render={(arrayHelpers) => (
                                                            <>
                                                                {values.voluntariosCursos.map((curso, i) => (
                                                                    <div key={i}>
                                                                        <button
                                                                            type="button"
                                                                            className="b mt-5 ms-4"
                                                                            onClick={() => arrayHelpers.remove(i)}
                                                                        >
                                                                            X
                                                                        </button>

                                                                        <div className=" card-body row mt-3">
                                                                            <div className="col  minicomponete">
                                                                                <label
                                                                                    htmlFor={`voluntariosCursos.${i}.añoCurso`}
                                                                                >
                                                                                    {" "}
                                                                                    Año curso:
                                                                                    <Field
                                                                                        type="text"
                                                                                        value={curso.añoCurso || ""}
                                                                                        onChange={handleChange}
                                                                                        className="form-control mt-1 mb-4"
                                                                                        name={`voluntariosCursos.${i}.añoCurso`}
                                                                                        placeholder="Año en que lo hizo"
                                                                                    ></Field>
                                                                                    <ErrorMessage
                                                                                        name={`voluntariosCursos.${i}.añoCurso`}
                                                                                    >
                                                                                        {(msg) => (
                                                                                            <div className="errorMessage">
                                                                                                {msg}
                                                                                            </div>
                                                                                        )}
                                                                                    </ErrorMessage>
                                                                                </label>
                                                                            </div>

                                                                            <div className="col minicomponete">
                                                                                <label
                                                                                    htmlFor={`voluntariosCursos.${i}.nivelInstitucion`}
                                                                                >
                                                                                    {" "}
                                                                                    Nivel de la institución:
                                                                                    <Field
                                                                                        type="text"
                                                                                        value={curso.nivelInstitucion || ""}
                                                                                        onChange={handleChange}
                                                                                        className="form-control mt-1 mb-4"
                                                                                        name={`voluntariosCursos.${i}.nivelInstitucion`}
                                                                                        placeholder="Nivel de la institución"
                                                                                    />
                                                                                    <ErrorMessage
                                                                                        name={`voluntariosCursos.${i}.nivelInstitucion`}
                                                                                    >
                                                                                        {(msg) => (
                                                                                            <div className="errorMessage">
                                                                                                {msg}
                                                                                            </div>
                                                                                        )}
                                                                                    </ErrorMessage>
                                                                                </label>
                                                                            </div>

                                                                            <div className="row mt-3">
                                                                                <div className="col minicomponete">
                                                                                    <label
                                                                                        htmlFor={`voluntariosCursos.${i}.nombreInstitucion`}
                                                                                    >
                                                                                        Nombre de la institución
                                                                                        <Field
                                                                                            type="text"
                                                                                            value={
                                                                                                curso.nombreInstitucion || ""
                                                                                            }
                                                                                            onChange={handleChange}
                                                                                            className="form-control mt-1 mb-4"
                                                                                            name={`voluntariosCursos.${i}.nombreInstitucion`}
                                                                                            placeholder="Nombre de la institución"
                                                                                        />
                                                                                        <ErrorMessage
                                                                                            name={`voluntariosCursos.${i}.nombreInstitucion`}
                                                                                        >
                                                                                            {(msg) => (
                                                                                                <div className="errorMessage">
                                                                                                    {msg}
                                                                                                </div>
                                                                                            )}
                                                                                        </ErrorMessage>
                                                                                    </label>
                                                                                </div>

                                                                                {loading ? (
                                                                                    <div className="col minicomponete">
                                                                                        <div
                                                                                            className="spinner-border"
                                                                                            role="status"
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="col minicomponete">
                                                                                        {
                                                                                            <label
                                                                                                name={`voluntariosCursos.${i}.tipoCursoId`}
                                                                                            >
                                                                                                Tipo Curso:
                                                                                                <Field
                                                                                                    as="select"
                                                                                                    name={`voluntariosCursos.${i}.tipoCursoId`}
                                                                                                    className="form-select mt-1 mb-3"
                                                                                                    aria-label="Default select example"
                                                                                                >
                                                                                                    <option value="">
                                                                                                        Selecciona el tipo curso{" "}
                                                                                                    </option>
                                                                                                    {tipoCurso.map((curso, i) => (
                                                                                                        <option
                                                                                                            key={i}
                                                                                                            value={curso.tipoCursoId}
                                                                                                        >
                                                                                                            {curso.tipoCurso}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </Field>
                                                                                                <ErrorMessage
                                                                                                    name={`voluntariosCursos.${i}.tipoCursoId`}
                                                                                                >
                                                                                                    {(msg) => (
                                                                                                        <div className="errorMessage">
                                                                                                            {msg}
                                                                                                        </div>
                                                                                                    )}
                                                                                                </ErrorMessage>
                                                                                            </label>
                                                                                        }
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <div className="col minicomponete pb-3">
                                                                    <center>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-secondary mt-3 "
                                                                            onClick={() => arrayHelpers.push({})}
                                                                        >
                                                                            Agregar información de {values.voluntariosCursos.length>0?"otro":"un"} curso realizado
                                                                        </button>
                                                                    </center>
                                                                </div>
                                                            </>
                                                        )}
                                                    ></FieldArray>
                                                </div>
                                            </div>

                                            <br />
                                            <br />
                                        </div>
                                        <br />
                                        <br />
                                    </div>
                                </div>

                                <div className=" card m-3 xs ">
                                    <div className="card py-5">
                                        <h5 className="card-title px-5 mt-5 mb-5">
                                            Archivos a adjuntar
                                        </h5>
                                        <InputFile
                                            name="fotoCuadrada"
                                            title="Foto 2x2"
                                            setFieldValue={setFieldValue}
                                            handleChange={(x) => {
                                                if (x.target.files.length == 0) {
                                                    setSrc(undefined);
                                                    setFieldValue("fotoCuadrada","");
                                                    return;
                                                }
                                                var file = x.target.files[0];
                                                var reader = new FileReader();
                                                
                                                reader.onload = function () {
                                                    setSrc(reader.result);
                                                };

                                                reader.readAsDataURL(file);
                                                handleChange(x);
                                            }}

                                        ></InputFile>


                                        {src && (
                                            <div className="canvasContainer">
                                                <ReactCrop
                                                    crop={crop}
                                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                                    onComplete={(c) => {
                                                        

                                                        let ctx = canvasControl.current.getContext("2d");
                                                        
                                                        ctx.fillRect(10, 10, 10, 10);
                                                        ctx.clearRect(0, 0, 200, 200);
                                                        let img = new Image();
                                                        img.onload = function () {
                                                            ctx.drawImage(carnetBG.current, 30, 0, 134.64, 200);

                                                            const scaleX = img.naturalWidth / imgRef.current.width;
                                                            const scaleY = img.naturalHeight / imgRef.current.height;
                                                            const pixelRatio = window.devicePixelRatio;
                                                            const virtualCanvas = document.createElement("canvas");
                                                            var ctx2 = virtualCanvas.getContext("2d");
                                                            virtualCanvas.width = c.width * scaleX;
                                                            virtualCanvas.height = c.height * scaleY;
                                                            ctx2.drawImage(img, c.x * scaleX, c.y * scaleY, c.width * scaleX, c.height * scaleY, 0, 0, virtualCanvas.width, virtualCanvas.height)
                                                            virtualCanvas.toBlob(blob=>setFotoRecortada(blob),"image/png",1);

                                                            //document.body.appendChild(virtualCanvas);
                                                            ctx.drawImage(img, c.x * scaleX, c.y * scaleY, c.width * scaleX, c.height * scaleY, 38, 75, 56.25 * aspect, 56.25)

                                                            ctx.save();
                                                            ctx.translate(0,0);
                                                            ctx.rotate(-1*(Math.PI/2));
                                                            ctx.textAlign="center";
                                                            ctx.font ="16px arial";
                                                            ctx.fillText("VISTA PREVIA CARNET",-100,20);
                                                            ctx.restore();
                                                            ctx.save();
                                                            ctx.rotate((Math.PI/4));
                                                            ctx.font ="14px arial";
                                                            ctx.fillStyle="red";
                                                            ctx.fillText("Sólo para muestra", 60,-30);
                                                            ctx.restore();
                                                            
                                                        }

                                                        img.src = src;
                                                        setCompletedCrop(c);
                                                    }}
                                                    aspect={aspect}
                                                >
                                                    <img
                                                        ref={imgRef}
                                                        alt="Crop me"
                                                        src={src}
                                                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                                        onLoad={onImageLoad}
                                                    />
                                                </ReactCrop>


                                                <canvas
                                                    width="200px"
                                                    height="200px"
                                                    className="canvasCarnet"
                                                    ref={canvasControl}
                                                >
                                                </canvas>
                                            </div>
                                        )
                                        }


                                        <InputFile
                                            name="copiaCedula"
                                            title="Foto de la cédula"
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        ></InputFile>
                                        <InputFile
                                            name="copiaPasaporte"
                                            title="Foto de la primera página de su pasaporte"
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        ></InputFile>

                                        <InputFile
                                            name="fotoLicencia"
                                            title="Foto de la licencia"
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        ></InputFile>

                                        <InputFile
                                            name="copiaCurriculo"
                                            title="Curriculum Vitae y certificados (un solo archivo)"
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        ></InputFile>
                                    </div>
                                </div>
                               

                                <div>
                                    {Object.keys(errors).length>0 &&submited&&(
                                        <p>
                                        <b style={{color:"red"}}>Hay datos incompletos o erroneos, verifique los datos marcados en rojo</b>
                                        </p>
                                    )}


                                    <button
                                        type="submit"
                                        className="btn btn-primary px-5 mx-4 mb-4 submitBtn "
                                        onClick={() => {

                                            setSubmited(true);

                                            FormSchema.validate(values)
                                                .then(() => {
                                                    console.log("Bien");
                                                })
                                                .catch((err) => {
                                                    console.log("errors:", errors, "values:", values, "errores");
                                                });
                                        }}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    )}
                </div>
            </div>
        </>
    );
};
export default Formulario;
