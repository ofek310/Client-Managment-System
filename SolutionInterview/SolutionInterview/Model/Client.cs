namespace SolutionInterview.Model
{
    public class Client
    {
        public Client() { }
        public Client(string Name,int ID,string IP,string Phone)
        {
            this.Name= Name;
            this.ID= ID;
            this.IP= IP;
            this.Phone= Phone;
        }
        public string Name { get; set; }
        public int ID { get; set; }
        public string IP { get; set; }
        public string Phone { get; set; }
    }
}
