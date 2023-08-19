using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    // [CR 19-08-2023] I don't know if you know this CQRS pattern from somewhere, i.e. to create a Details class
    // and then an internal class Handler inside, but I don't see if very often.
    // Is it some convention you are used to?
    public class Details
    {
        public class Query : IRequest<Product> {
            public Guid Id { get; set;}
        }

        public class Handler : IRequestHandler<Query, Product>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }
            public async Task<Product> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Products.FindAsync(request.Id);
            }
        }

    }
}