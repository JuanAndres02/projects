using Microsoft.OData.Edm;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class Usuarios
    {
        [Key]
        public int UsuarioId { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        public int EstadoId { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string Usuario { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [DataType(DataType.Password)]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string Contraseña { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [DataType(DataType.Text)]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string CreadoPor { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
         public Date FechaCreacion { get; set; }
    }
}
