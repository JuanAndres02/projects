export default async function SelectNivelAcademico(){
    try {
        const response = await fetch("https://localhost:44395/ListarNivelesAcademicos");
        let data = await response.json();
       return data
       
    } catch  {
      
    } finally{
    
    }
}