using Domain;
using FluentValidation;

namespace Application.Products
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
            RuleFor(x => x.DiscountPercentage).NotEmpty();
            RuleFor(x => x.Thumbnail).NotEmpty();
            RuleFor(x => x.Stock).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Brand).NotEmpty();
            RuleFor(x => x.Rating).NotEmpty();

        }
    }
}