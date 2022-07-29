using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiVoluntarios.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace ApiVoluntarios.Controllers
{
    public class ArchivosController : Controller
    {
        RepositorioVoluntarioDocumentos db = new RepositorioVoluntarioDocumentos();
        // GET: /<controller>/
        [HttpGet]
        [Route("archivo")]
        public IActionResult Index(int id)
        {

            var file = db.GetDocumentos(id).First();

            return File(file.Archivo,file.ArchivoTipoContenido);
        }
    }
}
