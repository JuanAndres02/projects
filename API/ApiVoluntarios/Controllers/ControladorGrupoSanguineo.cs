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
    public class ControladorGrupoSanguineo : Controller
    {
        private readonly RepositorioGrupoSanguineo repositorioGrupoSanguineo;
        private readonly ILogger<ControladorGrupoSanguineo> _loggerGrupoSanguineo;
        private readonly IMemoryCache _memorycacheGrupoSanguineo;

        public ControladorGrupoSanguineo(ILogger<ControladorGrupoSanguineo> logger,IMemoryCache memorycache )
        {
            repositorioGrupoSanguineo = new RepositorioGrupoSanguineo();
            _loggerGrupoSanguineo= logger;
            _memorycacheGrupoSanguineo = memorycache;
        }

        [HttpGet]
        [Route("ListarGruposSanguineos")]
        public IEnumerable<GruposSanguineos> GetGruposSanguineos()
        {
            _loggerGrupoSanguineo.LogInformation("Se van a solicitar los grupos sanguineos");
            if (_memorycacheGrupoSanguineo.Get("GrupoSanguineo")==null)
            {
                try
                {
                    var ListaGrupoSanguineo= repositorioGrupoSanguineo.GetGruposSanguineos();
                    _memorycacheGrupoSanguineo.Set("GrupoSanguineo", ListaGrupoSanguineo);
                }
                catch (SqlException ex)
                {
                    _loggerGrupoSanguineo.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerGrupoSanguineo.LogError(ex.Message);
                    throw;
                }
            }

            return (IEnumerable<GruposSanguineos>)_memorycacheGrupoSanguineo.Get("GrupoSanguineo");
        }
    }
}
