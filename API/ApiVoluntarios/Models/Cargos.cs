using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class Cargos
    {
        [Key]
        public int CargoId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength:50, MinimumLength =3, ErrorMessage = "Este campo debe estar entre 3 y 50 caracteres")]
        public string CargoNombre { get; set; }



    }
}
