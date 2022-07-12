export default async function SelectTipoCurso(){

    const response = await fetch("https://localhost:44395/ListarTiposCursos");
    let data = await response.json();
    return data

}