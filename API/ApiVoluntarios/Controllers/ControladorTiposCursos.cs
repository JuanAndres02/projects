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
    public class ControladorTiposCursos : Controller
    {
        private readonly RepositorioTiposCursos  repositorioTiposCursos;
        private readonly ILogger<ControladorTiposCursos> _loggerTiposCursos;
        private readonly IMemoryCache _memoryCacheTiposCursos;

        public ControladorTiposCursos(ILogger<ControladorTiposCursos> logger,IMemoryCache memoryCache)
        {
            repositorioTiposCursos = new RepositorioTiposCursos();
            _loggerTiposCursos = logger;
            _memoryCacheTiposCursos = memoryCache;
        }

        [HttpGet]
        [Route("ListarTiposCursos")]
        public IEnumerable<TiposCursos> GetTiposCursos()
        {
            _loggerTiposCursos.LogInformation("Se van a solicitar los Tipos de Cursos");
            if (_memoryCacheTiposCursos.Get("TiposCursos")==null)
            {
                try
                {
                    var ListaTiposCursos= repositorioTiposCursos.GetTiposCursos();
                    _memoryCacheTiposCursos.Set("TiposCursos", ListaTiposCursos);
                }
                catch (SqlException ex)
                {
                    _loggerTiposCursos.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerTiposCursos.LogError(ex.Message);
                    throw;
                }
            }

            return (IEnumerable<TiposCursos>)_memoryCacheTiposCursos.Get("TiposCursos");
        }
    }
}
