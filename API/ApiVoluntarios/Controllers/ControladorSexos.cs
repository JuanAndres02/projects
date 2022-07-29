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
    public class ControladorSexos : Controller
    {
        private readonly RepositorioSexo repositorioSexo;
        private readonly ILogger<ControladorSexos> _loggerSexo;
        private readonly IMemoryCache _memoryCacheSexo;

        public ControladorSexos(ILogger<ControladorSexos> logger,IMemoryCache memoryCache)
        {
            repositorioSexo = new RepositorioSexo();
            _loggerSexo = logger;
            _memoryCacheSexo = memoryCache;
        }

        [HttpGet]
        [Route("ListarSexos")]
        public IEnumerable<Sexos> GetSexos()
        {
            _loggerSexo.LogInformation("Se van a solicitar los sexos");
            if (_memoryCacheSexo.Get("Sexos")==null)
            {
                try
                {
                    var ListaSexos= repositorioSexo.GetSexos();

                    _memoryCacheSexo.Set("Sexos", ListaSexos);
                }
                catch(SqlException ex)
                {
                    _loggerSexo.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {
                    _loggerSexo.LogError(ex.Message);
                    throw;
                }

            }

            return (IEnumerable<Sexos>)_memoryCacheSexo.Get("Sexos");
        }
    }
}
