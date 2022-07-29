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
    public class RepositorioCamisetasTallas
    {
        private readonly string SqlConecctionString;

        public RepositorioCamisetasTallas()
        {
            SqlConecctionString = "Server=nubeteck.com;Database=DefensaCivilDB;User Id=defensacivil;Password=d3f3ns4c1v1l.2022;TrustServerCertificate=True;";

        }

        public IDbConnection connection
        {
            get { return new SqlConnection(SqlConecctionString); }
        }

        public IEnumerable<CamisetasTallas> GetCamisetasTallas()
        {

            using (IDbConnection dbConnection = connection)
            {
                string query = "select * from CamisetasTallas";
                dbConnection.Open();
                return dbConnection.Query<CamisetasTallas>(query);
            }

        }
    }
}
