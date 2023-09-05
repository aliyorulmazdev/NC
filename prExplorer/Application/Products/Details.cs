using Application.Core;
using AutoMapper;
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<ProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var productReturned = _mapper.Map<ProductDto>(await _context.Products.Where(x => x.Id == request.Id).FirstOrDefaultAsync());
                return Result<ProductDto>.Success(productReturned);
            }
        }
    }
}