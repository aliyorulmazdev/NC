using Application.Core;
using Application.Interfaces;
using Application.Products;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationTests
{

    public class GetAllProductsTest
    {
        public class Query : IRequest<Result<List<ProductDto>>>
        { }

        public class Handler : IRequestHandler<Query, Result<List<ProductDto>>>
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

            public async Task<Result<List<ProductDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var productsReturned = _mapper.Map<List<ProductDto>>(await _context.Products
                    .Where(x => x.appUserId == _userAccessor.GetUserId())
                    .IgnoreQueryFilters()
                    .ToListAsync(cancellationToken));

                return Result<List<ProductDto>>.Success(productsReturned);
            }
        }
    }
    }
