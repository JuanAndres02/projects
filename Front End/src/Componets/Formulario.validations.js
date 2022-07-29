import { yupToFormErrors } from 'formik';
import * as Yup from 'yup';

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
        .matches(/^([0-9]{3}-[0-9]{7}-[0-9]{1}$|[0-9]{11}$)/, "El número de cédula es incorrecto, debe tener 11 digitos o 13 con guiones")
    ,

    fechaNacimiento: Yup.date()
        .required('Seleccione la fecha de nacimiento'),

    lugarNacimiento: Yup.string()
        .required('El lugar de nacimiento es obligatorio')
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

    copiaPasaporte: Yup.string()
        .when("tienePasaporte", {
            is: true,
            then: (s) => { return s.required("Debes subir una foto del pasaporte") }
        }),

    tieneCuentaReservas: Yup.boolean(),
    numeroCuenta: Yup.string()
        .when("tieneCuentaReservas", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese su # de cuenta")
                    .max(31, "Inválido (muy largo)")
                    .matches(/^[0-9]+$/, "El número de cuenta digitado es incorrecto solo debe contener números")
        }),

    tieneNSS: Yup.boolean(),
    nss: Yup.string()
        .when("tieneNSS", {
            is: true,
            then: Yup.string()
                .required("Ingrese su # de seguro social")
                .max(15, "inválido (muy largo)")
                .matches(/^[0-9]+$/, "El # de seguro social solo debe contener números")


        }),

    tieneLicencia: Yup.boolean(),
    licenciaCategoriaId: Yup.number().when("tieneLicencia", {
        is: true,
        then: (schema) => schema.required('Seleccione su categoria de conducir'),
    }).nullable(),

    fotoLicencia: Yup.string().when("tieneLicencia", {
        is: true,
        then: s => s.required("Debes subir tu licencia de conducir en ambos lados")
    }),
    direccion: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(3, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    provinciaId: Yup.number()
        .min(1, 'Seleccione su provincia!'),
        
    estacionId: Yup.number()
        .min(1, 'Seleccione su estación!'),

    nivelAcademicoId: Yup.number().min(1,"El nivel académico es obligatorio"),

    sector: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(3, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    correoElectronico: Yup.string()
        //.required('Este es un campo es obligatorio')
        .email("Inválido (formato ejemplo: correo@email.com)")
        .nullable(),

    municipioId: Yup.number()
        .min(1, 'Seleccione su municipio!'),

    telefonoCelular: Yup.string()
        .required('El # de celular es obliatorio')
        .matches(/(^(\([0-9]{3}\) |\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}|[0-9]{10})/, "Debes introducir un número de teléfono válido")
    ,

    telefonoOficina: Yup.string()
        .matches(/(^(\([0-9]{3}\) |\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}|[0-9]{10})/, "Debes introducir un número de teléfono de oficina válido")

        .notRequired()
    ,

    telefonoResidencial: Yup.string()
        .matches(/(^(\([0-9]{3}\) |\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}|[0-9]{10})/, "Debes introducir un teléfono residencial válido")

        .notRequired()
    ,

    nombrePadre: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(3, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    nombreMadre: Yup.string()
        .required('Este es un campo es obligatorio')
        .min(3, 'El texto es muy corto!')
        .max(50, 'El texto es muy largo!'),

    nombreConyuge: Yup.string().when('estadoCivilId', {
        is: (val) => val === "3",
        then: (schema) => {
            return schema.required('Este es un campo es obligatorio')
                .min(3, 'El texto es muy corto!')
                .max(50, 'El texto es muy largo!')
        }
    })
    ,

    esEmpleado: Yup.boolean(),
    dondeTrabaja: Yup.string()
        .when("esEmpleado", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese donde trabaja")
                    .min(2, "Inválido (muy corto)!")
                    .max(40, "Inválido (muy largo)")
        }),


    nivelSuperior: Yup.boolean(),
    nombreInstitucionAcademica: Yup.string().required("El nombre de la institución académica es requerido"),
    NombreCarrera: Yup.string().when("nivelSuperior",
        {
            is: true,
            then: (s) => {
                return s.required("Ingrese donde trabaja")
                    .min(2, "Inválido (muy corto)!")
                    .max(40, "Inválido (muy largo)");
            }
        }
    ),

    otraInstitucionVoluntariosHaPertenecido: Yup.boolean(),
    otraInstitucionVoluntariosNombre: Yup.string()
        .when("otraInstitucionVoluntariosHaPertenecido", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese el lugar donde ha trabajado")
                    .min(2, "Inválido (muy corto)!")
                    .max(50, "Inválido (muy largo)")
        }),

    otraInstitucionVoluntariosCargo: Yup.string()
        .when("otraInstitucionVoluntariosHaPertenecido", {
            is: true,
            then:
                Yup.string()
                    .required("Ingrese el cargo que tenia donde ha trabajado")
                    .min(2, "Inválido (muy corto)!")
                    .max(50, "Inválido (muy largo)")
        }),


    volutarioHijos: Yup.array().of(Yup.object().shape({
        nombres: Yup.string().required("Nombre del hij@ obligatorio"),
        apellidos: Yup.string().required("Apellido del hij@ obligatorio"),
        sexoId: Yup.number().required('Seleccione el sexo del hijo!'),
        fechaNacimiento: Yup.string().required("Fecha nacimiento hijo"),
    })),

    voluntariosCursos: Yup.array().of(Yup.object().shape({
        añoCurso: Yup.string()
            .required('El año es obligatorio')
            .matches(/^[0-9]+$/, "El año solo acepta números")
            .min(4, 'Deben ser exactamente 4 digitos numericos')
            .max(4, 'Deben ser exactamente 4 digitos numericos'),


        nivelInstitucion: Yup.string()
            .required("Ingrese el nivel de la institución")
            .min(1, 'Texto muy corto')
            .max(50, 'Texto muy largo'),

        nombreInstitucion: Yup.string()
            .required("Ingrese el nombre de la institución")
            .min(1, 'Texto muy corto')
            .max(50, 'Texto muy largo'),

        tipoCursoId: Yup.number().required('El tipo de curso es obligatorio'),


    })),

    fotoCuadrada: Yup.string().required("La foto 2x2 es obligatoria"),
    copiaCedula: Yup.string().required("La copia de la cédula es obligatoria"),


});

export default FormSchema;