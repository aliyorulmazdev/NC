using Application.Categories;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace ApplicationTests.CategoryTest
{
    public class GetAllCategoriesTest
    {
        public class Query : IRequest<Result<List<CategoryDto>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<CategoryDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor accessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = accessor;
            }

            public async Task<Result<List<CategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categoriesReturned = _mapper.Map<List<CategoryDto>>(await _context.Categories
                    .Where(x => x.AppUserId == _userAccessor.GetUserId())
                    .IgnoreQueryFilters()
                    .ToListAsync(cancellationToken));

                return Result<List<CategoryDto>>.Success(categoriesReturned);
            }
        }
    }
}