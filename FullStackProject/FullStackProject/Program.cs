using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//===============================================================================

//solution for Cross-Origin Request Blocked
/*
builder.Services.AddCors(options=>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        });    
});

*/

//By default, all web API projects come with a security which blocks requests coming from different domains. We are basically writing instructions to disable that security and allow the requests to be served
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});


//JSON Serializer ( package ekak install krann oni JSON ekat = > Microsoft.AspNetCore.Mvc.NewtonsoftJson )
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
    = new DefaultContractResolver());



//================================================================================
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting(); //====================================
//=====================================================================================

// solution for Cross-Origin Request Blocked
app.UseCors();
app.UseAuthorization();


app.MapControllers();





// set the connection to get imaegs from the Image folder 
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"
});

//=====================================================================================

app.Run();




/*

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowOrigin"); // Use the CORS policy named "AllowOrigin"
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Set up static file serving
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"
});

app.Run();
*/