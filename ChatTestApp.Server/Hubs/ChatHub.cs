using ChatTestApp.Server.Model;
using ChatTestApp.Server.Services;
using Microsoft.AspNetCore.SignalR;

namespace ChatTestApp.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMessageService _messageService;

        public ChatHub(IMessageService messageService)
        {
            _messageService = messageService;
        }

        public async Task SendMessage(string user, string content)
        {
            var message = new Message { User = user, Content = content, CreatedDate = DateTime.UtcNow };

            message.Id = await _messageService.AddMessage(message);

            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
