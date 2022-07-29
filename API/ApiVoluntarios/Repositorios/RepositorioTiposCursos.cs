using ApiVoluntarios.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Repositorios
{
    public class RepositorioTiposCursos
    {
        private readonly string SqlConecctionString;

        public RepositorioTiposCursos()
        {
            SqlConecctionString = "Server=nubeteck.com;Database=DefensaCivilDB;User Id=defensacivil;Password=d3f3ns4c1v1l.2022;TrustServerCertificate=True;";

        }

        public IDbConnection connection
        {
            get { return new SqlConnection(SqlConecctionString); }
        }

        public IEnumerable<TiposCursos> GetTiposCursos()
        {

            using (IDbConnection dbConnection = connection)
            {
                string query = "select * from TiposCursos";
                dbConnection.Open();
                return dbConnection.Query<TiposCursos>(query);
            }

        }
    }
}
