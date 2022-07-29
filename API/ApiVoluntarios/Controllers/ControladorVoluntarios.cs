using ApiVoluntarios.Models;
using ApiVoluntarios.Repositorios;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

using System.Threading.Tasks;

namespace ApiVoluntarios.Controllers
{
    [Route("api/[controller]")]

    [ApiController]

    
    public class ControladorVoluntarios : Controller
    {
        private readonly RepositorioVoluntarios repositorioVoluntarios;
        private readonly ILogger<ControladorVoluntarios> _loggerVoluntarios;

        public ControladorVoluntarios(ILogger<ControladorVoluntarios> logger)
        {
            repositorioVoluntarios = new RepositorioVoluntarios();
            _loggerVoluntarios = logger;
        }


        [HttpPost]
        [RequestSizeLimit(100_000_000)]
        [Route("GuardarVoluntario")]
        public void InsertVoluntarios()
        {
            string voluntariojson = Request.Form["voluntarios"].ToString();

            Voluntarios voluntarios = JsonSerializer.Deserialize<Voluntarios>(voluntariojson, new JsonSerializerOptions() {
                PropertyNameCaseInsensitive = true,
                ReadCommentHandling = JsonCommentHandling.Skip,
                AllowTrailingCommas = true,
                NumberHandling= System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString,
                
               
            });

            voluntarios.voluntariosDocumentos = new List<VoluntariosDocumentos>();

            foreach(var file in Request.Form.Files)
            {
                //Informaciones basicas del archivo
                var dfile =new VoluntariosDocumentos()
                {
                    ArchivoTamanio = file.Length,
                    ArchivoTipoContenido= file.ContentType,
                    ArchivoNombre= file.FileName
                };

                //Leemos de la memoria el archivo a byte[]
                using(MemoryStream reader = new MemoryStream())
                {
                    file.CopyTo(reader);
                   dfile.Archivo = reader.ToArray();
                    dfile.TipoDocumentoId = file.Name switch
                    {
                        "fotoCuadrada_file" => 6,
                        "copiaCedula_file" => 7,
                        "copiaPasaporte_file" => 8,
                        "fotoLicencia_file" => 9,
                        "copiaCurriculo_file" => 10,
                        _ => 0
                    };
                }

                voluntarios.voluntariosDocumentos.Add(dfile);
            }
            

            _loggerVoluntarios.LogInformation("Se va a guardar un voluntario", voluntarios);

            if (ModelState.IsValid)
            {
                try
                {
                    voluntarios.TieneHijos = voluntarios.VolutarioHijos.Count > 0;
                    if (!voluntarios.TieneLicencia)
                        voluntarios.LicenciaCategoriaId = null;
                    if (!voluntarios.OtraInstitucionVoluntariosHaPertenecido)
                    {
                        voluntarios.OtraInstitucionVoluntariosNombre = null;
                        voluntarios.OtraInstitucionVoluntariosCargo = null;
                    }
                    if (!voluntarios.TieneNSS)
                    {
                        voluntarios.NSS = null;
                    }

                    repositorioVoluntarios.InsertarVoluntarios(voluntarios);
                  _loggerVoluntarios.LogInformation("Se guardo un voluntario exitosamente", voluntarios);
                }
                catch (SqlException ex)
                {
                    _loggerVoluntarios.LogError(ex.Message);
                    throw;
                }
                catch (Exception ex)
                {

                    _loggerVoluntarios.LogError(ex.Message);
                    throw;
                    
                }

                
            }

            
        }
    }
        


    
}
