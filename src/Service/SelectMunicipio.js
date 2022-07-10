export default async function SelectMunicipio(){
    
        const response = await fetch("https://localhost:44395/ListarProvinciasMunicipios");
        let data = await response.json();
        return data

}