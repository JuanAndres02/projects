 export default async function Selectgruposanguineo(){
  
        const response = await fetch("https://localhost:44395/ListarGruposSanguineos");
        let data = await response.json();
        return data
}