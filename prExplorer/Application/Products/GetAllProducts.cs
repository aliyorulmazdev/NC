using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class GetAllProducts
    {
        public class Query : IRequest<Result<List<ProductDto>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<ProductDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ProductDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var productsReturned = _mapper.Map<List<ProductDto>>(await _context.Products
                    .Include(p => p.Category)
                    .ToListAsync(cancellationToken));
                return Result<List<ProductDto>>.Success(productsReturned);
            }
        }
    }
}