export default async function SelectCategoria(){
   
        const response = await fetch("https://localhost:44395/ListarLicenciasCategorias");
        let data = await response.json();
        return data
}