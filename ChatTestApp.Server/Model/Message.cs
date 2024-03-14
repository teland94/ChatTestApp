namespace ChatTestApp.Server.Model
{
    public class Message
    {
        public int Id { get; set; }

        public string User { get; set; } = default!;

        public string Content { get; set; } = default!;

        public DateTime CreatedDate { get; set; }
    }
}
