using Application.Core;
using Application.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        // [CR 19-08-2023] That's a nice practice that you create separate classes for stuff like that :)
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            //ConnectionString
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });
            //Cors
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            //MediatR
            services.AddMediatR(typeof(List.Handler));
            services.AddMediatR(typeof(Create.Handler));
            services.AddMediatR(typeof(Edit.Handler));
            services.AddMediatR(typeof(Details.Handler));
            services.AddMediatR(typeof(Delete.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            

            return services;
        }
    }
}