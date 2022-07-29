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
    public class ControladorNivelAcademico : Controller
    {
        private readonly RepositorioNivelAcademico repositorioNivelAcademico;
        private readonly ILogger<ControladorNivelAcademico> _loggerNivelAcademico;
        private readonly IMemoryCache _memoryCacheNivelAcademico;

        public ControladorNivelAcademico(ILogger<ControladorNivelAcademico> logger,IMemoryCache memoryCache)
        {
            repositorioNivelAcademico = new RepositorioNivelAcademico();
            _loggerNivelAcademico = logger;
            _memoryCacheNivelAcademico = memoryCache;
        }

        [HttpGet]
        [Route("ListarNivelesAcademicos")]
        public IEnumerable<NivelesAcademicos> GetNivelesAcademicos()
        {
            _loggerNivelAcademico.LogInformation("Se van a solicitar los niveles academicos");
            if (_memoryCacheNivelAcademico.Get("NivelesAcademicos")==null)
            {
                try
                {
                    var ListaNivelesAcadeicos= repositorioNivelAcademico.GetNivelesAcademicos();
                    _memoryCacheNivelAcademico.Set("NivelesAcademicos", ListaNivelesAcadeicos);
                }
                catch (SqlException ex)
                {
                    _loggerNivelAcademico.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerNivelAcademico.LogError(ex.Message);
                    throw;
                }
            }

            return (IEnumerable<NivelesAcademicos>)_memoryCacheNivelAcademico.Get("NivelesAcademicos");
        }

    }
}
