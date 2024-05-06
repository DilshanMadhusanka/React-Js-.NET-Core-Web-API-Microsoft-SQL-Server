using FullStackProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;


// install this package ( System.Data.SqlClient )


namespace FullStackProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {

        // dependancy injection 

        private readonly IConfiguration _configuration;
        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        // set the API methods 
        [HttpGet]
        public JsonResult Get() // This method will handle HTTP GET requests.
        {

            /* Here, a SQL query is defined as a verbatim string literal.
             * Verbatim string literals start with the @ symbol and allow you to include
             * line breaks and quotation marks without escaping them.*/
            string query = @"
                            select DepartmentId, DepartmentName from
                            dbo.Department
                            "; // getting data. for this we can use entity framework as well 

            DataTable table = new DataTable();  // getting data into the DataTable object.
                                                // A new instance of DataTable is created.
                                                // DataTable is a part of ADO.NET and represents one table of in-memory data.

            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon"); // This retrieves the connection string named "EmployeeAppCon" from the configuration.
                                                                                         // The GetConnectionString method is typically used in ASP.NET Core applications to
                                                                                         // retrieve connection strings from the appsettings.json file or environment variables.
            
            SqlDataReader myReader;  // Declares a SqlDataReader object named myReader without instantiating it.

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))  // This establishes a connection to the SQL Server database using the connection string retrieved earlier.
                                                                            // The using statement ensures that the SqlConnection object (myCon) is properly disposed of after use.
            {
                myCon.Open(); //Opens the database connection.
                using (SqlCommand myCommand = new SqlCommand(query, myCon))  //This creates a SqlCommand object named myCommand with the SQL query
                                                                             //and the database connection. Again, the using statement ensures proper disposal of resources.

                {
                    myReader = myCommand.ExecuteReader();// Executes the SQL query and creates a SqlDataReader (myReader) to read the result set.
                    table.Load(myReader);  // Loads the data from the myReader into the DataTable object (table).
                    myReader.Close();  // Closes the SqlDataReader.
                    myCon.Close();  // Closes the database connection.
                }
            }

            return new JsonResult(table); // Constructs a JsonResult object with the data from the DataTable and returns it. This means that the data retrieved from
                                          // the database will be serialized into JSON format and sent back as the HTTP response.
        }

        [HttpPost]
        public JsonResult Post(Department dep)    // sending a department object to a post method into a form body 
        {
            string query = @"
                           insert into dbo.Department
                           values (@DepartmentName)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DepartmentName", dep.DepartmentName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Department dep)
        {
            string query = @"
                           update dbo.Department
                           set DepartmentName= @DepartmentName
                            where DepartmentId=@DepartmentId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DepartmentId", dep.DepartmentId);
                    myCommand.Parameters.AddWithValue("@DepartmentName", dep.DepartmentName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Department
                            where DepartmentId=@DepartmentId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DepartmentId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


    }
}
