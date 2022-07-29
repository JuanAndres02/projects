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
    public class ControladorCargos : Controller
    {
        private readonly RepositorioCargo repositorioCargo;
        private readonly ILogger<ControladorCargos> _loggerCargos;
        private readonly IMemoryCache _memoryCacheCargos;

        public ControladorCargos(ILogger<ControladorCargos> logger,IMemoryCache memoryCache)
        {
            repositorioCargo = new RepositorioCargo();
            _loggerCargos = logger;
            _memoryCacheCargos = memoryCache;
        }

        
        [HttpGet]
        [Route("ListarCargos")]
        public IEnumerable<Cargos> GetCargos()
        {
            _loggerCargos.LogInformation("Se van a solicitar los cargos");

            if (_memoryCacheCargos.Get("Cargos")==null)
            {
                

                try
                {
                    var ListaCargos = repositorioCargo.GetCargos();
                    _memoryCacheCargos.Set("Cargos", ListaCargos);
                }
                catch (SqlException ex)
                {
                    _loggerCargos.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {
                    _loggerCargos.LogError(ex.Message);
                    throw;
                }
            }

            return (IEnumerable<Cargos>)_memoryCacheCargos.Get("Cargos");


        }
    }
}
