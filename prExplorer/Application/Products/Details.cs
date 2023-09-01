using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Details
    {
        public class Query : IRequest<Result<ProductDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ProductDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<ProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == _userAccessor.GetUserId());

                if (user == null)
                {
                    return Result<ProductDto>.Failure("Kullanıcı bulunamadı.");
                }

                var product = await _context.Products
                      .Where(x => x.appUserId == user.Id && request.Id == x.Id)
                      .Include(x => x.AppUser)
                      .Select(x => new ProductDto
                      {
                          Id = x.Id,
                          Title = x.Title,
                          Description = x.Description,
                          Price = x.Price,
                          DiscountPercentage = x.DiscountPercentage,
                          Rating = x.Rating,
                          Stock = x.Stock,
                          Brand = x.Brand,
                          Category = x.Category,
                          Thumbnail = x.Thumbnail
                      }).FirstOrDefaultAsync();

                var productReturned = _mapper.Map<ProductDto>(product);
                return Result<ProductDto>.Success(productReturned);
            }
        }

    }
}