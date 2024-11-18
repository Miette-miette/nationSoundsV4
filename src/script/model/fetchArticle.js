export default async function fetchRessource(ressource=null)
{

  const request = new Request(ressource);
  return (await fetch(request)).text();

}