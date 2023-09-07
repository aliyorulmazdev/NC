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
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Title));

            CreateMap<Category, CategoryDto>();
            CreateMap<Category, Category>();
            CreateMap<Product, Product>();
        }
    }
}
