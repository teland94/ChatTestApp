using ChatTestApp.Server.Model;
using ChatTestApp.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatTestApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> Get()
        {
            var messages = await _messageService.GetMessages();

            return Ok(messages);
        }

        [HttpPost]
        public async Task<ActionResult<Message>> Post(CreateMessageDto messageDto)
        {
            var message = new Message
            {
                User = messageDto.User,
                Content = messageDto.Content,
                CreatedDate = DateTime.UtcNow
            };

            message.Id = await _messageService.AddMessage(message);

            return Ok(message);
        }
    }
}
