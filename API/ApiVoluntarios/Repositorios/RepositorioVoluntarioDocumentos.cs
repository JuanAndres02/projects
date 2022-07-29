using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;

namespace ApiVoluntarios.Repositorios
{
    public class RepositorioVoluntarioDocumentos
    {
        private readonly string SqlConecctionString;

        public RepositorioVoluntarioDocumentos()
        {
            SqlConecctionString = "Server=nubeteck.com;Database=DefensaCivilDB;User Id=defensacivil;Password=d3f3ns4c1v1l.2022;TrustServerCertificate=True;";

        }

        public IDbConnection connection
        {
            get { return new SqlConnection(SqlConecctionString); }
        }

        public IEnumerable<Models.VoluntariosDocumentos> GetDocumentos(int id)
        {

            using (IDbConnection dbConnection = connection)
            {
                string query = "select * from VoluntariosDocumentos where VoluntarioDocumentosId=@id";
                dbConnection.Open();
                return dbConnection.Query<Models.VoluntariosDocumentos>(query,new  {id});
            }

        }
    }
}
