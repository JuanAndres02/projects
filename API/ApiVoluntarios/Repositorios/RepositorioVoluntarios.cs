using ApiVoluntarios.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios
{
    public class RepositorioVoluntarios
    {
        private readonly string SqlConecctionString;

        public RepositorioVoluntarios()
        {
            SqlConecctionString = "Server=nubeteck.com;Database=DefensaCivilDB;User Id=defensacivil;Password=d3f3ns4c1v1l.2022;TrustServerCertificate=True;";

        }

        public IDbConnection connection
        {
            get { return new SqlConnection(SqlConecctionString); }
        }

        public void InsertarVoluntarios(Voluntarios V)
        {


            using (IDbConnection dbConnection = connection)
            {


                var result = dbConnection.ExecuteScalar("VoluntariosInsert", new
                {
                    V.FechaIngresoInstitucion,
                    V.CargoEnInstucionId,
                    V.Cedula,
                    V.Nombres,
                    V.Apellidos,
                    V.Apodo,
                    V.SexoId,
                    V.FechaNacimiento,
                    V.LugarNacimiento,
                    V.NacionalidadId,
                    V.EstadoCivilId,
                    V.EstaturaEnPie,
                    V.PesoEnLibras,
                    V.ColorPelo,
                    V.ColorPiel,
                    V.GrupoSanguineoId,
                    V.TallaCamisetaId,
                    V.TienePasaporte,
                    V.PasaporteNum,
                    V.TieneCuentaReservas,
                    V.NumeroCuenta,
                    V.TieneNSS,
                    V.NSS,
                    V.TieneLicencia,
                    V.LicenciaCategoriaId,
                    V.ProvinciaId,
                    V.MunicipioId,
                    V.Sector,
                    V.Direccion,
                    V.CorreoElectronico,
                    V.TelefonoCelular,
                    V.TelefonoResidencial,
                    V.TelefonoOficina,
                    V.TieneHijos,
                    V.NombrePadre,
                    V.NombreMadre,
                    V.NombreConyuge,
                    V.EsEmpleado,
                    V.DondeTrabaja,
                    V.NivelAcademicoId,
                    V.NombreInstitucionAcademica,
                    V.NombreCarrera,
                    V.OtraInstitucionVoluntariosHaPertenecido,
                    V.OtraInstitucionVoluntariosNombre,
                    V.OtraInstitucionVoluntariosCargo,
                    V.SabeNadar,
                    V.SabeConducir,
                    V.EstacionId,
                    V.RecomendadoPor,
                    V.CreadoPor,
                    V.FechaCreacion,
                    V.ModificadoPor,
                    V.FechaModificacion
                }, commandType: CommandType.StoredProcedure);

                int Id = Convert.ToInt32(result);


                foreach (VoluntariosHijos item in V.VolutarioHijos)
                {
                    item.VoluntarioId = Id;


                    dbConnection.Execute("VoluntariosHijosInsert", new
                    {



                        item.VoluntarioId,
                        item.Nombres,
                        item.Apellidos,
                        item.SexoId,
                        item.FechaNacimiento

                    }, commandType: CommandType.StoredProcedure);

                }

                foreach (VoluntariosDocumentos item in V.voluntariosDocumentos)
                {
                    item.VoluntarioId = Id;


                    dbConnection.Execute("VoluntarioDocumentosInsert", new
                    {
                        item.VoluntarioId,
                        item.TipoDocumentoId,
                        item.ArchivoTipoContenido,
                        item.ArchivoTamanio,
                        item.Archivo,
                        item.ArchivoNombre

                    }, commandType: CommandType.StoredProcedure);

                }

                foreach (VoluntariosCursos item in V.voluntariosCursos)
                {
                    item.VoluntarioId = Id;


                    dbConnection.Execute("VoluntarioCursosInsert", new
                    {



                        item.VoluntarioId,
                        item.TipoCursoId,
                        item.AñoCurso,
                        item.NivelInstitucion,
                        item.NombreInstitucion

                    }, commandType: CommandType.StoredProcedure);

                }



            }

        }







    }
}
