using System.ComponentModel.DataAnnotations;

namespace ChatTestApp.Server.Model
{
    public class CreateMessageDto
    {
        [Required]
        public string User { get; set; } = default!;

        [Required]
        public string Content { get; set; } = default!;
    }
}
