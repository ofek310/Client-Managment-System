namespace SolutionInterview.ModelApi
{
    public class Root
    {
        //add the id to the geo table
        //we take from the api just the properties we need
        public int clientId { get; set; }
        public string query { get; set; }
        public string country { get; set; }
        public string region { get; set; }
        public string regionName { get; set; }
        public string city { get; set; }
        public double lat { get; set; }
        public double lon { get; set; }
    }
}
