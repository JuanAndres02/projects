using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class VoluntariosCursos
    {

        /*
          Existe conflicto si esto no se llena?? 

       */

        [Key]
        public int VoluntarioCursosId { get; set; }
        //[Required(ErrorMessage = "Este campo es requerido")]
        public int VoluntarioId { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        public int TipoCursoId { get; set; }
       
        [Required(ErrorMessage = "Este campo es requerido")]
       
        public int AñoCurso { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string NivelInstitucion { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string NombreInstitucion { get; set; }
    }
}
