using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition(name: "Bearer", securityScheme: new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Description = "Enter the Bearer Authorization string as following: `Bearer Generated-JWT-Token`",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer"
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                            Reference = new OpenApiReference
                            {
                                Id = "Bearer",
                                Type = ReferenceType.SecurityScheme
                            }
                        },
                        new List<string>()
                    }
                });
            });

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
            #region Product
            services.AddMediatR(typeof(Application.Products.GetAllProducts.Handler));
            services.AddMediatR(typeof(Application.Products.Create.Handler));
            services.AddMediatR(typeof(Application.Products.Edit.Handler));
            services.AddMediatR(typeof(Application.Products.Details.Handler));
            services.AddMediatR(typeof(Application.Products.Delete.Handler));
            #endregion
            #region Category
            services.AddMediatR(typeof(Application.Categories.GetAllCategories.Handler));
            services.AddMediatR(typeof(Application.Categories.Create.Handler));
            services.AddMediatR(typeof(Application.Categories.Edit.Handler));
            services.AddMediatR(typeof(Application.Categories.Details.Handler));
            services.AddMediatR(typeof(Application.Categories.Delete.Handler));
            #endregion

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Application.Products.Create>();
            services.AddValidatorsFromAssemblyContaining<Application.Categories.Create>();

            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();

            return services;
        }
    }
}