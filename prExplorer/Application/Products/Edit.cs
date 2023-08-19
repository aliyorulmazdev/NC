using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Product Product { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.Product.Id);
                // [CR 19-08-2023] What if the product is not found?
                
                // [CR 19-08-2023] Be careful with using AutoMapper for updates.
                // As you probably know, it will re-map all properties, even those that you may not want to update.
                // Just something to keep it mind. AutoMapper is great, because it saves us a lot of code, but it's also
                // a kind of "black box" which can lead to issues which are not easy to debug later on ;)
                _mapper.Map(request.Product, product);
                
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}