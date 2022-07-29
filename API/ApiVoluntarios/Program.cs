using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args)
            .ConfigureServices(services => services.AddMemoryCache())
                .Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
             return Host.CreateDefaultBuilder(args)
             .ConfigureLogging((context, logging) =>
             {
                 //clear out everybody that's listening for logging events
                 logging.ClearProviders();

                 //Configure what's listening, who's listening
                 //this configuration takes the logging configurations  that is in the  app.json 
                 logging.AddConfiguration(context.Configuration.GetSection("Logging"));

                 //information for the debug window
                 logging.AddDebug();
                  
                 
                 logging.AddConsole();

                 
             })
            .ConfigureWebHostDefaults(webBuilder =>
            {
            webBuilder.UseStartup<Startup>();
            });
        }
    }
}
