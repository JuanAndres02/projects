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
    public class ControladorProvinciasMunicipios : Controller
    {
        private readonly RepositorioProvinciasMunicipios repositorioProvinciasMunicipios;
        private readonly ILogger<ControladorProvinciasMunicipios> _loggerProvinciasMunicipios;
        private readonly IMemoryCache _memoryCacheProvinciasMunicipios;

        public ControladorProvinciasMunicipios(ILogger<ControladorProvinciasMunicipios> logger,IMemoryCache memoryCache)
        {
            repositorioProvinciasMunicipios = new RepositorioProvinciasMunicipios();
            _loggerProvinciasMunicipios = logger;
            _memoryCacheProvinciasMunicipios = memoryCache;
        }


        [HttpGet]
        [Route("ListarProvinciasMunicipios")]
        public IEnumerable<ProvinciasMunicipios> GetProvinciasMunicipios(int provinciaId)
        {
            _loggerProvinciasMunicipios.LogInformation("Se van a solicitar las provincias");
            if (_memoryCacheProvinciasMunicipios.Get("ProvinciasMunicipios")==null)
            {
                try
                {
                    var ListaProvinciasMunicipios= repositorioProvinciasMunicipios.GetProvinciasMunicipios();
                    _memoryCacheProvinciasMunicipios.Set("ProvinciasMunicipios", ListaProvinciasMunicipios);
                }
                catch (SqlException ex)
                {
                    _loggerProvinciasMunicipios.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerProvinciasMunicipios.LogError(ex.Message);
                    throw;
                }
            }

            return ((IEnumerable<ProvinciasMunicipios>)_memoryCacheProvinciasMunicipios.Get("ProvinciasMunicipios")).Where(x => x.ProvinciaId == provinciaId).ToList();
        }
    }
}
