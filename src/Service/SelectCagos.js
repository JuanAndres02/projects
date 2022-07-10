export default async function SelectCargo(){
  const response = await fetch("https://localhost:44395/ListarCargos");
  const data = await response.json();
  return data
}

