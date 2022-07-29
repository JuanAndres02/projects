using Microsoft.OData.Edm;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ApiVoluntarios.Models
{
    public class Voluntarios
    {
        [Key]
        public int VoluntarioId { get; set; }

     

        [Required(ErrorMessage = "Este campo es requerido")]  
        public DateTime FechaIngresoInstitucion { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public int CargoEnInstucionId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 13, MinimumLength = 11, ErrorMessage = "Este campo debe tener 11 caracteres")]
        [RegularExpression("^([0-9]{3}-[0-9]{7}-[0-9]{1}$|[0-9]{11}$)", ErrorMessage ="Este campo solo acepta numeros (0-9)")]
        public string Cedula { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]

        public string Nombres { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string Apellidos { get; set; }

        public string Apodo { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public int SexoId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
       
        public DateTime FechaNacimiento { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string LugarNacimiento { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]

        public int NacionalidadId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]

        public int EstadoCivilId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
   
        public Decimal EstaturaEnPie { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
      
        public Decimal PesoEnLibras { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string ColorPelo { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string ColorPiel { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]

        public int GrupoSanguineoId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
  
        public int TallaCamisetaId { get; set; }
        
        
        public bool TienePasaporte { get; set; }

        
        public string PasaporteNum { get; set; }

              

        public bool TieneCuentaReservas { get; set; }

        [RegularExpression("^[0-9]+$", ErrorMessage = "Este campo solo acepta numeros (0-9)")]
        public string NumeroCuenta { get; set; }

        
        
        public bool TieneNSS { get; set; }
        public string NSS { get; set; }

                
        public bool TieneLicencia { get; set; }
        public int? LicenciaCategoriaId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]

        public int ProvinciaId { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]

        public int MunicipioId { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string Sector { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 100, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 100 caracteres")]
        public string Direccion { get; set; }

        [DataType(DataType.EmailAddress,ErrorMessage ="Este campo no tiene formato de correo electronico")]
        public string CorreoElectronico { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        [RegularExpression(@"(^(\([0-9]{3}\) |\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}|[0-9]{10})", ErrorMessage = "El formato del teléfono es inválido")]
        public string TelefonoCelular { get; set; }

        [RegularExpression(@"(^(\([0-9]{3}\) |\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}|[0-9]{10})", ErrorMessage = "Este campo solo acepta numeros (0-9)")]
        public string TelefonoResidencial { get; set; }

        
        [RegularExpression(@"(^(\([0-9]{3}\) |\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}|[0-9]{10})", ErrorMessage = "Este campo solo acepta numeros (0-9)")]
        public string TelefonoOficina { get; set; }


        [Required(ErrorMessage = "Este campo es requerido")]
        
        public bool TieneHijos { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string NombrePadre { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string NombreMadre { get; set; }
        
        
        public string NombreConyuge { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        
        public bool EsEmpleado { get; set; }


        public string DondeTrabaja { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
     
        public int NivelAcademicoId { get; set; }

        
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = "Este campo debe estar entre 1 y 50 caracteres")]
        public string NombreInstitucionAcademica { get; set; }
        public string NombreCarrera { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        
        public bool OtraInstitucionVoluntariosHaPertenecido { get; set; }
        public string OtraInstitucionVoluntariosNombre { get; set; }
        public string OtraInstitucionVoluntariosCargo { get; set; }

        
        public bool SabeNadar { get; set; }

        
        public bool SabeConducir { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
 
        public int EstacionId { get; set; }

    
        public string RecomendadoPor { get; set; }

       
        public string CreadoPor { get; set; }

       // [Required(ErrorMessage = "Este campo es requerido")]

        public DateTime FechaCreacion { get; set; }

       
        public string ModificadoPor { get; set; }
          
        public DateTime FechaModificacion { get; set; }

        

        public ICollection<VoluntariosHijos> VolutarioHijos { get; set; }


        public List<VoluntariosDocumentos> voluntariosDocumentos { get; set; }

        
         public ICollection<VoluntariosCursos> voluntariosCursos { get; set; }



    }
}
