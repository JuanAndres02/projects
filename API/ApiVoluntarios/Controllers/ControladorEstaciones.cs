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
    public class ControladorEstaciones : Controller
    {
        private readonly RepositorioEstacion repositorioEstacion;
        private readonly ILogger<ControladorEstaciones> _loggerEstaciones;
        private readonly IMemoryCache _memoryCacheEstaciones;

        public ControladorEstaciones(ILogger<ControladorEstaciones> logger,IMemoryCache memoryCache)
        {
            repositorioEstacion = new RepositorioEstacion();
            _loggerEstaciones = logger;
            _memoryCacheEstaciones = memoryCache;
        }

        [HttpGet]
        [Route("ListarEstaciones")]
        public IEnumerable<Estaciones> GetEstaciones()
        {
            _loggerEstaciones.LogInformation("Se van a solicitar las Estaciones");
            if (_memoryCacheEstaciones.Get("Estaciones")==null)
            {
                try
                {
                    var ListaEstaciones=repositorioEstacion.GetEstaciones();
                    _memoryCacheEstaciones.Set("Estaciones", ListaEstaciones);
                }
                catch (SqlException ex)
                {
                    _loggerEstaciones.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerEstaciones.LogError(ex.Message);
                    throw;
                }

            }


            return (IEnumerable<Estaciones>)_memoryCacheEstaciones.Get("Estaciones");
        }


    }
}
