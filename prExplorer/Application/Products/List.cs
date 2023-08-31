using System.IO.Compression;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class List
    {
        public class Query : IRequest<Result<List<ProductDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ProductDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<ProductDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == _userAccessor.GetUserId());

                if (user == null)
                {
                    // Eğer kullanıcı bulunamazsa hata işleme.
                    return Result<List<ProductDto>>.Failure("Kullanıcı bulunamadı.");
                }

                var products = await _context.Products
                    .Where(x => x.appUserId == user.Id)
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
                    })
                    .ToListAsync(cancellationToken);

                var productsReturned = _mapper.Map<List<ProductDto>>(products);
                return Result<List<ProductDto>>.Success(products);
            }


        }

    }
}