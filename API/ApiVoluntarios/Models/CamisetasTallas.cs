using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class CamisetasTallas
    {
        [Key]
        public int TallaCamisetaId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 10, MinimumLength =1, ErrorMessage = "Este campo debe estar entre 1 y 10 caracteres")]
        public string TallaCamiseta { get; set; }
    }
}
