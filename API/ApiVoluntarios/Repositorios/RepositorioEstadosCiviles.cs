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
    public class RepositorioEstadosCiviles
    {
        private readonly string SqlConecctionString;

        public RepositorioEstadosCiviles()
        {
            SqlConecctionString = "Server=nubeteck.com;Database=DefensaCivilDB;User Id=defensacivil;Password=d3f3ns4c1v1l.2022;TrustServerCertificate=True;";

        }

        public IDbConnection connection
        {
            get { return new SqlConnection(SqlConecctionString); }
        }

        public IEnumerable<EstadosCiviles> GetEstadosCiviles()
        {

            using (IDbConnection dbConnection = connection)
            {
                string query = "select * from EstadosCiviles";
                dbConnection.Open();
                return dbConnection.Query<EstadosCiviles>(query);
            }

        }
    }
}
