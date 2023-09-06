using Application.Categories;
using Application.Products;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, Product>();
            CreateMap<Product, ProductDto>();

            CreateMap<Category, Category>();
            CreateMap<Category, CategoryDto>();
        }
    }
}