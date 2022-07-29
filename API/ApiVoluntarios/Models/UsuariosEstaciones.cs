using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class UsuariosEstaciones
    {
        [Key]
        public int UsuarioId { get; set; }
        [Key]
        public int EstacionId { get; set; }
    }
}
