using ChatTestApp.Server.Model;

namespace ChatTestApp.Server.Services
{
    public interface IMessageService
    {
        Task<List<Message>> GetMessages();
        Task<int> AddMessage(Message message);
    }
}
