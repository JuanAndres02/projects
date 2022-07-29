using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class VoluntariosDocumentos
    {
        /*
          Existe conflicto si esto no se llena?? 

       */

        [Key]
        public int VoluntarioDocumentosId { get; set; }

       // [Required(ErrorMessage = "Este campo es requerido")]
       
        public int VoluntarioId { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
       
        public int TipoDocumentoId { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        
        public string ArchivoTipoContenido { get; set; }

        
        public Int64 ArchivoTamanio { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
      
        public byte[] Archivo { get; set; }

        public string ArchivoNombre { get; set; }




    }
}
