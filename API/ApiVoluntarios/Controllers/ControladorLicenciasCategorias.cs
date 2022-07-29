using ApiVoluntarios.Models;
using ApiVoluntarios.Repositorios;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Controllers
{
    public class ControladorLicenciasCategorias : Controller
    {
        private readonly RepositorioLicenciasCategorias  repositorioLicenciasCategorias;
        private readonly ILogger<ControladorLicenciasCategorias> _loggerLicenciasCategorias;
        private readonly IMemoryCache _memorycacheLicenciasCategorias;

        public ControladorLicenciasCategorias(ILogger<ControladorLicenciasCategorias> logger,IMemoryCache memorycache)
        {
            repositorioLicenciasCategorias = new RepositorioLicenciasCategorias();
            _loggerLicenciasCategorias = logger;
            _memorycacheLicenciasCategorias = memorycache;
        }

        [HttpGet]
        [Route("ListarLicenciasCategorias")]
        public IEnumerable<LicenciasCategorias> GetLicenciasCategorias()
        {
            _loggerLicenciasCategorias.LogInformation("Se van a solicitar las Categorias de Licencias");

            if (_memorycacheLicenciasCategorias.Get("LicenciasCategorias")==null)
            {
                try
                {
                    var ListaLicenciasCategorias= repositorioLicenciasCategorias.GetLicenciasCategorias();
                    _memorycacheLicenciasCategorias.Set("LicenciasCategorias", ListaLicenciasCategorias);
                }
                catch (SqlException ex)
                {
                    _loggerLicenciasCategorias.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerLicenciasCategorias.LogError(ex.Message);
                    throw;
                }
            }




            return (IEnumerable<LicenciasCategorias>)_memorycacheLicenciasCategorias.Get("LicenciasCategorias");
        }
    }
}
