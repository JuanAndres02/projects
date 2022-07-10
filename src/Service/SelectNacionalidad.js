export default async function SelectNacionalidad(){
        const response = await fetch("https://localhost:44395/ListarNacionalidades");
        let data = await response.json();
        return data
}