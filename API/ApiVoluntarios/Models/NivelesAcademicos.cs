using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class NivelesAcademicos
    {
        [Key]
        public int NivelAcademicoId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string NivelAcademicoNombre { get; set; }

        public bool RequiereNombre { get; set; }

    }
}
