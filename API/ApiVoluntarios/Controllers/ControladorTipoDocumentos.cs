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
    public class ControladorTipoDocumentos : Controller
    {
        private readonly RepositorioTipoDocumentos  repositorioTipoDocumentos;
        private readonly ILogger<ControladorTipoDocumentos> _loggerTipoDocumentos;
        private readonly IMemoryCache _memoryCacheTipoDocumentos;

        public ControladorTipoDocumentos(ILogger<ControladorTipoDocumentos> logger,IMemoryCache memoryCache )
        {
            repositorioTipoDocumentos = new RepositorioTipoDocumentos();
            _loggerTipoDocumentos = logger;
            _memoryCacheTipoDocumentos = memoryCache;
        }

        [HttpGet]
        [Route("ListarTipoDocumentos")]
        public IEnumerable<TipoDocumentos> GetTipoDocumentos()
        {
            _loggerTipoDocumentos.LogInformation("Se van a solicitar los Tipos de Documentos");
            if (_memoryCacheTipoDocumentos.Get("TipoDocumentos")==null)
            {
                
                try
                {
                    var ListTipoDocumentos= repositorioTipoDocumentos.GetTipoDocumentos();
                    _memoryCacheTipoDocumentos.Set("TipoDocumentos", ListTipoDocumentos);
                }
                catch (SqlException ex)
                {
                    _loggerTipoDocumentos.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerTipoDocumentos.LogError(ex.Message);
                    throw;
                }
            }
            return (IEnumerable<TipoDocumentos>)_memoryCacheTipoDocumentos.Get("TipoDocumentos");
        }
    }
}
