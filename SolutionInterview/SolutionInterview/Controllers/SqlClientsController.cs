using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SolutionInterview.Model;
using SolutionInterview.ModelApi;
using System.Data;
using System.Data.SqlClient;
using static System.Net.WebRequestMethods;

namespace SolutionInterview.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SqlClientsController : ControllerBase
    {
        //object connecting to sql sentence
        private readonly string _connstring;
        private static SqlConnection con;
        private static SqlCommand cmd = null;

        public static HttpClient ApiClient { get; set; } = new HttpClient();
        //public static string connstring = "Data Source=(local); Initial Catalog= OrtInterviewDatabase;Integrated Security=True";
        //public static SqlConnection con = new SqlConnection(connstring);
        //public static SqlCommand cmd = null;
        public static string errorMessage = "do not success to connect to sql";

        public SqlClientsController(IOptions<AppSettings> appSettings)
        {
            _connstring = appSettings.Value.MyDatabaseConnection;
            con = new SqlConnection(_connstring);
        }

        [HttpGet("/GetAllExsitsClients")]
        public async Task<ActionResult> GetAllExistsClients()
        {
            string query = "Select * from dbo.clientsDatabase";
            string serializedResult = "";
            try
            {
                con.Open();
                cmd = new SqlCommand(query, con);
                //we can pass the sqldatareader we need to convert this to string
                SqlDataReader reader = cmd.ExecuteReader();

                // Load the data into a DataTable
                DataTable dataTableAllClient = new DataTable();
                dataTableAllClient.Load(reader);

                // Convert the DataTable to JSON
                serializedResult = JsonConvert.SerializeObject(dataTableAllClient, Formatting.Indented);

                // Return the serialized result as JSON response
                return Ok(serializedResult);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, statusCode: 500);
                //need to return the exceptions
            }
            finally 
            {
               Close();
            }
            return Ok(serializedResult);
        }
        [HttpPost("/AddClient")]
        public async Task<ActionResult> postClient([FromBody] Client client)
        {
            //check if what we get not null and that this is not exsits
            SqlDataReader clientSqlReader = selectClientFromClients(client.ID);
            //if the client exsits we return the right error
            if (clientSqlReader!=null && clientSqlReader.Read())
            {
                Close();
                return BadRequest(new { error = "The client already exists in the database" });
            }
            Close();
            //the client does not exsits so we can add it table data base
            try
            {
                con.Open();
                string sql = "INSERT INTO dbo.clientsDatabase(Name,ID,IP,Phone)" +
                    "VALUES (@Name,@ID,@IP,@Phone)";
                cmd = new SqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@Name", client.Name);
                cmd.Parameters.AddWithValue("@ID", client.ID);
                cmd.Parameters.AddWithValue("@IP", client.IP);
                cmd.Parameters.AddWithValue("@Phone", client.Phone);
                cmd.ExecuteNonQuery();
                Close();
                return Ok();
            }
            catch (Exception ex)
            {
                Close();
                return Problem(ex.Message, statusCode: 500);
            }
        }
        [HttpPost("/FilterClients")]
        public async Task<ActionResult> filterClients([FromBody] Client client)
        {
            string serializedResult = "";
            try
            {
                con.Open();
                string idParameter = client.ID == -1 ? "" : client.ID.ToString();
                string sql = "SELECT * FROM dbo.clientsDatabase WHERE Name LIKE '%' + @Name + '%'" +
             "AND ID Like '%'+@ID+'%' AND IP LIKE '%' + @IP + '%' AND Phone LIKE '%' + @Phone + '%'";
                cmd = new SqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@Name", client.Name);
                cmd.Parameters.AddWithValue("@ID", idParameter);
                cmd.Parameters.AddWithValue("@IP", client.IP);
                cmd.Parameters.AddWithValue("@Phone", client.Phone);
                SqlDataReader reader = cmd.ExecuteReader();
                // Load the data into a DataTable
                DataTable dataTableFilterClient = new DataTable();
                dataTableFilterClient.Load(reader);

                // Convert the DataTable to JSON
                serializedResult = JsonConvert.SerializeObject(dataTableFilterClient, Formatting.Indented);

                // Return the serialized result as JSON response
                return Ok(serializedResult);
            }
            catch (Exception ex)
            {
                Close();
                return Problem(ex.Message, statusCode: 500);
            }
            finally
            {
                Close();
            }
            return Ok(serializedResult);
        }
        [HttpDelete("/DeleteClient")]
        public async Task<ActionResult> deleteClientFromSql([FromBody] ClientId clientId)
        {
           //check if what we get not null and that this is not exsits
            SqlDataReader clientSqlReader = selectClientFromClients(clientId.ID);
            //if the client exsits we delete him
            if (clientSqlReader != null && clientSqlReader.Read())
            {
                Close();
                try
                {
                    con.Open();
                    string query = "Delete dbo.clientsDatabase Where ID=@ID";
                    cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@ID", clientId.ID);
                    cmd.ExecuteNonQuery();
                    Close();
                    return Ok();
                }
                catch (Exception ex)
                {
                    return Problem(ex.Message, statusCode: 500);
                }
            }
            else
            {
                Close();
                return BadRequest(new { error = "The client does not exsits in the database" });
            }

        }
        public static void Close()
        {
            if (cmd != null)
            {
                cmd.Clone();
            }
            if(con!= null)
            {
                con.Close();
            }
            
        }
        private static SqlDataReader selectClientFromClients(int ID)
        {
            SqlDataReader reader = null;
            try
            {
                con.Open();
                string query = "Select * from dbo.clientsDatabase Where ID = @ID";
                cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@ID", ID);
                reader = cmd.ExecuteReader();
            }
            catch (Exception ex)
            {
                return null;
            }
            return reader;
        }
        [HttpGet("/GetGeoInformationOnClientsIP")]
        public async Task<ActionResult> GetGeoInformationOnClientsIP()
        {
            Root result = null;
            string url = "";
            List<string> ipList = new List<string>();
            List<int> idList = new List<int>();
            List<Root> geoIpInforamtionList = new List<Root>();
            //check if what we get not null and that this is not exsits
            //in the reader return ip and id , so that we can display in the table for all the ip of which client it is
            SqlDataReader IpAndIdSqlReader = selectIpFromClients();
            if (IpAndIdSqlReader != null && IpAndIdSqlReader.Read())
            {
                if (IpAndIdSqlReader != null)
                {
                    //check up that its not null
                    ipList.Add(IpAndIdSqlReader["IP"].ToString());
                    idList.Add(int.Parse(IpAndIdSqlReader["ID"].ToString()));
                }
                //check up that its not null
                while (IpAndIdSqlReader.Read())
                {
                    if (IpAndIdSqlReader != null)
                    {
                        //check up that its not null
                        ipList.Add(IpAndIdSqlReader["IP"].ToString());
                        idList.Add(int.Parse(IpAndIdSqlReader["ID"].ToString()));
                    }
                }
                Close();
                for (int i=0;i<ipList.Count;i++)
                {
                    url = $"http://ip-api.com/json/" + ipList[i];
                    try
                    {
                        using (HttpResponseMessage response = await ApiClient.GetAsync(url))
                        {
                            if (response.IsSuccessStatusCode)
                            {
                                result = await response.Content.ReadAsAsync<Root>();
                                result.clientId = idList[i];
                                geoIpInforamtionList.Add(result);
                            }else if (response.StatusCode.Equals((System.Net.HttpStatusCode)429))
                            {//can be just 45 request after that return an error
                                return Problem(title:"You have exceeded the request limit, too many requests, the limit is 45", statusCode: 429);
                            }
                            else
                            {
                                return NotFound(new { error = "The ip does not exsits" });
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        return Problem(title:ex.Message, statusCode: 500);
                    }
                }
            }
            return Ok(geoIpInforamtionList);
        }
        private static SqlDataReader selectIpFromClients()
        {
            SqlDataReader reader = null;
            try
            {
                con.Open();
                string query = "Select IP,ID from dbo.clientsDatabase";
                cmd = new SqlCommand(query, con);
                reader = cmd.ExecuteReader();
            }
            catch (Exception ex)
            {
                return null;
            }
            return reader;
        }
    }
}
