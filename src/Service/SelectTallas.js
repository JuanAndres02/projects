export default async function SelectTallas(){

        const response = await fetch("https://localhost:44395/ListarCamisetasTallas");
        let data = await response.json();
        return data
}