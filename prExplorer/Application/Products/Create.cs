using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Create
    {
        // [CR 19-08-2023] Try to be consistent with your code style. The most common convention in C# is to put 
        // the class opening and closing brackets in a new line. See my remark about using prettier/csharpier
        // which would do that for you automatically
        public class Command : IRequest {
            public Product Product { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Products.Add(request.Product);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}