using ApiVoluntarios.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Repositorios
{
    public class RepositorioSexo
    {
        private readonly string SqlConecctionString;

        public RepositorioSexo()
        {
            SqlConecctionString = "Server=nubeteck.com;Database=DefensaCivilDB;User Id=defensacivil;Password=d3f3ns4c1v1l.2022;TrustServerCertificate=True;";
            
        }

        public IDbConnection connection
        {
            get { return new SqlConnection(SqlConecctionString); }
        }

        public IEnumerable<Sexos> GetSexos()
        {
            
                using (IDbConnection dbConnection= connection)
                {
                    string query = "select * from sexos";
                    dbConnection.Open();
                    return dbConnection.Query<Sexos>(query);
                }

        }
   





    }
}
