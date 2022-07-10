export default async function SelectCivil(){

        const response = await fetch("https://localhost:44395/ListarEstadosCiviles");
        let data = await response.json();
        return data

}