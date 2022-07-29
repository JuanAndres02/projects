using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class UsuariosRoles
    {
        [Key]
        public int UsuarioId { get; set; }
        [Key]
        public int RolId { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string CreadoPor { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        public string FechaCreacion { get; set; }
    }
}
