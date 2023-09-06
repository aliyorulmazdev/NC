using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class GetAllCategories
    {
        public class Query : IRequest<Result<List<CategoryDto>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<CategoryDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<CategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categoriesReturned = _mapper.Map<List<CategoryDto>>(await _context.Categories.ToListAsync(cancellationToken));
                return Result<List<CategoryDto>>.Success(categoriesReturned);
            }
        }
    }
}