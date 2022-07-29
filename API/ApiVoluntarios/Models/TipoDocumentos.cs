using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class TipoDocumentos
    {
        [Key]
        public int TipoDocumentoId { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 100, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 100 caracteres")]
        public string TipoDocumentoNombre { get; set; }
    }
}
