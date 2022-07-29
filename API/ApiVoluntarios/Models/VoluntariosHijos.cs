using Microsoft.OData.Edm;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class VoluntariosHijos
    {

        /*
            Existe conflicto si esto no se llena?? 

         */
        [Key]
        public int VoluntarioHijosId { get; set; }
        //[Required(ErrorMessage = "Este campo es requerido")]
        
        public int VoluntarioId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string Nombres { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string Apellidos { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
     
        public int SexoId { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
     
        public DateTime FechaNacimiento { get; set; }
    }
}
