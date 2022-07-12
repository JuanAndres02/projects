(<div key={i} >
    <Field type="hidden" name={`hijos.${i}`} />

    <button className="b mt-5 ms-4" onClick={(e) => Eliminarhijo(hijo)} >X</button>
    <div className=" card-body row mt-3">
        <div className="col  minicomponete">
            <label htmlFor={'hijos.' + i + '.nombreHijo'}> 
                <Field type="text" className="form-control mt-3" name={`hijos.${i}.Nombres`} placeholder="Nombres"/>
                <ErrorMessage name={`hijos.${i}.Nombres`}>{msg => <div class="error">{msg}</div>}</ErrorMessage>
            </label>
        </div>

        <div className="col minicomponete">
            <label htmlFor="Apellido"> Apellido
            <Field type='text' className="form-control mt-3" name={`hijos.${i}.Apellidos`} placeholder="Apellidos" />
            <ErrorMessage name={`hijos.${i}.Apellidos`}>{msg => <div class="error">{msg}</div>}</ErrorMessage>
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
                            <Field as="select" defaultValue={0} name={`hijos.${i}.SexoID`} className="form-select mt-3" aria-label="Default select example"  >
                                <option value={0} disabled >Selecciona sexo </option>
                                {sexo.map((sex, i) => (
                                    <option key={i} value={sex.sexoId}>{sex.sexoNombre}</option>
                                ))}
                            </Field>
                            <ErrorMessage name={`hijos.${i}.SexoID`} component={() => (<div className='errorMessage'>{errors.nombreHijo}</div>)} />
                        </label>
                    }
                </div>
            )
            }

            <div className="col minicomponete">
                <label htmlFor="FechaNacimiento"> Fecha nacimiento
                    <Field type="date" className="form-control mt-3" name={`hijos.${i}.fechaNacimientoHijo`} placeholder="FechaNacimiento"></Field>
                    <ErrorMessage name={`hijos.${i}.fechaNacimientoHijo`} component={() => (<div className='errorMessage'>{errors.nombreHijo}</div>)} />
                </label>
            </div>
        </div>
    </div>

    <br />
</div>)



onSubmit={(valores, { resetForm }) => {

    /*
    fetch('/WeatherForecast', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).then(r => r.text()).then(v => {
        console.log("datos guardados");
    });
    */

    cambiarFormularioEnviado(true)
    setTimeout(() => cambiarFormularioEnviado(false), 5000)
    console.log('formulario enviado')
    resetForm();
}}

{
    "voluntarioId": 0,
    "fechaIngresoInstitucion": "2022-07-11T19:41:35.032Z",
    "cargoEnInstucionId": 1,
    "cedula": "12312345671",
    "nombres": "Gregory",
    "apellidos": "Juan",
    "apodo": "GreJuan",
    "sexoId": 1,
    "fechaNacimiento": "2022-07-11T19:41:35.032Z",
    "lugarNacimiento": "jahfja",
    "nacionalidadId": 1,
    "estadoCivilId": 1,
    "estaturaEnPie": 1,
    "pesoEnLibras": 1,
    "colorPelo": "adlskjg",
    "colorPiel": "dgksajk",
    "grupoSanguineoId": 1,
    "tallaCamisetaId": 1,
    "tienePasaporte": true,
    "pasaporteNum": 12345678,
    "tieneCuentaReservas": true,
    "numeroCuenta": 12345678,
    "tieneNSS": true,
    "nss": 12345678,
    "tieneLicencia": true,
    "licenciaCategoriaId": 1,
    "provinciaId": 1,
    "municipioId": 1,
    "sector": "alksgha",
    "direccion": "asdgdsa",
    "correoElectronico": "user@example.com",
    "telefonoCelular": "1231231234",
    "telefonoResidencial": "1231231234",
    "telefonoOficina": "strin1231231234g",
    "tieneHijos": true,
    "nombrePadre": "asjhgka",
    "nombreMadre": "striasdgasdng",
    "nombreConyuge": "asdgda",
    "esEmpleado": true,
    "dondeTrabaja": "asdsdagasd",
    "nivelAcademicoId": 1,
    "nombreInstitucionAcademica": "adfsd",
    "nombreCarrera": "adgdas",
    "otraInstitucionVoluntariosHaPertenecido": true,
    "otraInstitucionVoluntariosNombre": "asdgsdg",
    "otraInstitucionVoluntariosCargo": "adgasd",
    "sabeNadar": true,
    "sabeConducir": true,
    "estacionId": 0,
    "recomendadoPor": "adsgs",
    "creadoPor": "asdgdas",
    "fechaCreacion": "2022-07-11T19:41:35.032Z",
    "modificadoPor": "asdfdas",
    "fechaModificacion": "2022-07-11T19:41:35.032Z",
    "volutarioHijos": [
      {
        "voluntarioHijosId": 1,
        "voluntarioId": 1,
        "nombres": "adfasd",
        "apellidos": "asdf",
        "sexoId": 1,
        "fechaNacimiento": "2022-07-11T19:41:35.032Z"
      }
    ],
    "voluntariosDocumentos": [
      {
        "voluntarioDocumentoId": 0,
        "voluntarioId": 0,
        "tipoDocumentoId": 0,
        "archivoTipoContenido": "string",
        "archivoTamanio": true,
        "archivo": "string"
      }
    ],
    "voluntariosCursos": [
      {
        "voluntarioCursosId": 1,
        "voluntarioId": 1,
        "tipoCursoId": 1,
        "añoCurso": 1,
        "nivelInstitucion": "ads",
        "nombreInstitucion": "asdg"
      }
    ]
  }