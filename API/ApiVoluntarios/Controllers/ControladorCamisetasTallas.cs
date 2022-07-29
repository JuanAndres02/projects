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
    public class ControladorCamisetasTallas : Controller
    {
        private readonly RepositorioCamisetasTallas repositorioCamisetasTallas;
        private readonly ILogger<ControladorCamisetasTallas> _loggerCamisetasTallas;
        private readonly IMemoryCache _memoryCacheCamisetasTallas;

        public ControladorCamisetasTallas(ILogger<ControladorCamisetasTallas> logger,IMemoryCache memoryCache)
        {
            repositorioCamisetasTallas = new RepositorioCamisetasTallas();
            _loggerCamisetasTallas = logger;
            _memoryCacheCamisetasTallas = memoryCache;
        }


        [HttpGet]
        [Route("ListarCamisetasTallas")]
               
        public IEnumerable<CamisetasTallas> GetCamisetasTallas()
        {
            _loggerCamisetasTallas.LogInformation("Se va a solicitar las tallas de las camisetas");
            if (_memoryCacheCamisetasTallas.Get("CamisetasTallas")==null)
            {
                try
                {
                    var ListaCamisetasTallas = repositorioCamisetasTallas.GetCamisetasTallas();
                    _memoryCacheCamisetasTallas.Set("CamisetasTallas", ListaCamisetasTallas);
                }
                catch (SqlException ex)
                {
                    _loggerCamisetasTallas.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerCamisetasTallas.LogError(ex.Message);
                    throw;
                }

                
                
            }

           return (IEnumerable<CamisetasTallas>) _memoryCacheCamisetasTallas.Get("CamisetasTallas");


        }

    }
}
