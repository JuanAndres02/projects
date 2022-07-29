export default function MainService() {
    const baseURL = "https://defensacivil.webapp.do/API/";
    const  getCall= async (endpoint)=>{
        const response = await fetch(baseURL+endpoint);
        const data = await response.json();
        return data
    }
    
    this.cargosGetAll = async function () {
       return getCall("ListarCargos");
    }

    this.licenciasCategoriasGetAll = async function(){
        return getCall("ListarLicenciasCategorias");
    }

    this.estadoCivilGetAll = async function(){
        return getCall("ListarEstadosCiviles");
    }

    this.estacionesGetAll =async function(){
        return getCall("ListarEstaciones");
    }

    this.gruposSanguineosGetAll =async function(){
        return getCall("ListarGruposSanguineos");
    }

    this.municipiosGetAll =async function(provinciaId=1){
        return getCall("ListarProvinciasMunicipios?provinciaId="+provinciaId);
    }

    this.nacionalidadesGetAll = async function(){
        return getCall("ListarNacionalidades");
    }

    this.nivelAcademicoGetAll = async function(){
        return getCall("ListarNivelesAcademicos");
    }

    this.provinciasGetAll = async function(){
        return getCall("ListarProvincias");
    }

    this.sexosGetAll = async function(){
        return getCall("ListarSexos");
    }

    this.tallasGetAll = async function(){
        return getCall("ListarCamisetasTallas");
    }

    this.tiposCursosGetAll = async function(){
        return getCall("ListarTiposCursos");
    }

    this.save = async function(formData){
        return fetch(baseURL+"api/ControladorVoluntarios/GuardarVoluntario",{method: "POST", body: formData}).then((r) => r.text());
    }

}