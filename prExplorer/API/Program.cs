using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Serilog;
using System.Text;

//Serilog configuration
Log.Logger = new LoggerConfiguration()
   .WriteTo.Console()
   .WriteTo.File($"Log{DateTime.UtcNow}.txt")
   .WriteTo.Seq("http://localhost:5341")
   //.WriteTo.MongoDBBson("mongodb-connectionstring","Logs")   
   .MinimumLevel.Information()
   .Enrich.WithMachineName()
   .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

//Use Serilog
builder.Host.UseSerilog(); 

// Add services to the container.
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

//ApplicationServices
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]));

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();


using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An Error occured during migration");
}

app.Run();