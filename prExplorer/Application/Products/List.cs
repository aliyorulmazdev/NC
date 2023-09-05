using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class List
    {
        public class Query : IRequest<Result<List<ProductDto>>>
        { }

        public class Handler : IRequestHandler<Query, Result<List<ProductDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _accessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor accessor)
            {
                _accessor = accessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ProductDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var productsReturned = _mapper.Map<List<ProductDto>>(await _context.Products.Where(x => x.appUserId == _accessor.GetUserId()).ToListAsync(cancellationToken));
                return Result<List<ProductDto>>.Success(productsReturned);
            }
        }

        public class Result : Result<List<ProductDto>>
        {
        }
    }
}