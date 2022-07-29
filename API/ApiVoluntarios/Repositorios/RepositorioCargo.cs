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
    public class RepositorioCargo
    {
        private readonly string SqlConecctionString;

        public RepositorioCargo()
        {
            SqlConecctionString = "Server=nubeteck.com;Database=DefensaCivilDB;User Id=defensacivil;Password=d3f3ns4c1v1l.2022;TrustServerCertificate=True;";

        }

        public IDbConnection connection
        {
            get { return new SqlConnection(SqlConecctionString); }
        }

        public IEnumerable<Cargos> GetCargos()
        {

            using (IDbConnection dbConnection = connection)
            {
                string query = "select * from cargos";
                dbConnection.Open();
                return dbConnection.Query<Cargos>(query);
            }

        }
    }
}
