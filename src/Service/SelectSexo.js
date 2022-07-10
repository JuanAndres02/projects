export default async function SelectSexo(){
    const response = await fetch("https://localhost:44395/ListarSexos");
    const data = await response.json();
    return data
}