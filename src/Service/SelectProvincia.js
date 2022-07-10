export default async function SelectProvincia(){
   
        const response = await fetch("https://localhost:44395/ListarProvincias");
        let data = await response.json();
         return data

}