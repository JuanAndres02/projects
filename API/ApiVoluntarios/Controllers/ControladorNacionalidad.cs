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
    public class ControladorNacionalidad : Controller
    {
        private readonly RepositorioNacionalidad repositorioNacionalidad;
        private readonly ILogger<ControladorNacionalidad> _loggerNacionalidad;
        private readonly IMemoryCache _memoryCacheNacionalidad;

        public ControladorNacionalidad(ILogger<ControladorNacionalidad> logger,IMemoryCache memoryCache)
        {
            repositorioNacionalidad = new RepositorioNacionalidad();
            _loggerNacionalidad = logger;
            _memoryCacheNacionalidad = memoryCache;
        }

        [HttpGet]
        [Route("ListarNacionalidades")]
        public IEnumerable<Nacionalidades> GetNacionalidades()
        {
            _loggerNacionalidad.LogInformation("Se van a solicitar las Nacionalidades");
            if (_memoryCacheNacionalidad.Get("Nacionalidades")==null)
            {
                try
                {
                    var ListaNacionalidades= repositorioNacionalidad.GetNacionalidades();
                    _memoryCacheNacionalidad.Set("Nacionalidades", ListaNacionalidades);
                }
                catch (SqlException ex)
                {
                    _loggerNacionalidad.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerNacionalidad.LogError(ex.Message);
                    throw;
                }
            }
            var list = (IEnumerable<Nacionalidades>)_memoryCacheNacionalidad.Get("Nacionalidades");
            return list.OrderBy(x=> x.NacionalidadId ==21?"0"+x.NacionalidadNombre: x.NacionalidadNombre);
        }
    }
}
