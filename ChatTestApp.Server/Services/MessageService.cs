using ChatTestApp.Server.Model;
using ChatTestApp.Server.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ChatTestApp.Server.Services
{
    public class MessageService : IMessageService
    {
        private readonly ChatContext _context;

        public MessageService(ChatContext context)
        {
            _context = context;
        }

        public Task<List<Message>> GetMessages()
        {
            return _context.Messages
                .OrderBy(m => m.CreatedDate)
                .ToListAsync();
        }

        public Task<int> AddMessage(Message message)
        {
            _context.Messages.Add(message);

            return _context.SaveChangesAsync();
        }
    }

}
