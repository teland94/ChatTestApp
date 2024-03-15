using ChatTestApp.Server.Model;
using Microsoft.AspNetCore.SignalR;

namespace ChatTestApp.Server.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
