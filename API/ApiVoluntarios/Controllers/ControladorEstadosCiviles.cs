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
    public class ControladorEstadosCiviles : Controller
    {
        private readonly RepositorioEstadosCiviles repositorioEstadosCiviles;
        private readonly ILogger<ControladorEstadosCiviles> _loggerEstadosCiviles;
        private readonly IMemoryCache _memoryCacheEstadosCiviles;

        public ControladorEstadosCiviles(ILogger<ControladorEstadosCiviles> logger,IMemoryCache memoryCache)
        {
            repositorioEstadosCiviles = new RepositorioEstadosCiviles();
            _loggerEstadosCiviles = logger;
            _memoryCacheEstadosCiviles = memoryCache;
        }

        [HttpGet]
        [Route("ListarEstadosCiviles")]
        public IEnumerable<EstadosCiviles> GetEstadosciviles()
        {
            _loggerEstadosCiviles.LogInformation("Se van a solicitar los Estados Civiles");
            if (_memoryCacheEstadosCiviles.Get("EstadosCiviles")==null)
            {
                try
                {
                    var ListaEstadosCiviles= repositorioEstadosCiviles.GetEstadosCiviles();
                    _memoryCacheEstadosCiviles.Set("EstadosCiviles", ListaEstadosCiviles);
                }
                catch (SqlException ex)
                {
                    _loggerEstadosCiviles.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {
                    _loggerEstadosCiviles.LogError(ex.Message);
                    throw;   
                }
            }


            return (IEnumerable<EstadosCiviles>)_memoryCacheEstadosCiviles.Get("EstadosCiviles");
        }

    }

}
