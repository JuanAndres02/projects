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
    public class ControladorProvincias : Controller
    {
        private readonly RepositorioProvincias repositorioProvincias;
        private readonly ILogger<ControladorProvincias> _loggerProvincias;
        private readonly IMemoryCache _memoryCacheProvincias;

        public ControladorProvincias(ILogger<ControladorProvincias> logger,IMemoryCache memoryCache)
        {
            repositorioProvincias = new RepositorioProvincias();
            _loggerProvincias = logger;
            _memoryCacheProvincias = memoryCache;
        }

        [HttpGet]
        [Route("ListarProvincias")]
        public IEnumerable<Provincias> GetProvincias()
        {
            _loggerProvincias.LogInformation("Se van a solicitar las Provincias");
            if (_memoryCacheProvincias.Get("Provincias")==null)
            {
                try
                {
                    var ListaProvincias= repositorioProvincias.GetProvincias();
                    _memoryCacheProvincias.Set("Provincias", ListaProvincias);
                }
                catch (SqlException ex)
                {
                    _loggerProvincias.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerProvincias.LogError(ex.Message);
                    throw;
                }
            }

            var listado = (IEnumerable<Provincias>)_memoryCacheProvincias.Get("Provincias");


            return listado.OrderBy(x=>x.ProvinciaId==56?"0"+x.ProvinciaNombre:x.ProvinciaNombre);
        }
    }
}
