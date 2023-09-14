using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == _userAccessor.GetUserId());

                if (user == null)
                {
                    //Error handling if the user is not found.
                    return Result<Unit>.Failure("Cannot find an user.");
                }

                var product = await _context.Products
                .Where(x => x.Id == request.Id)
                .FirstOrDefaultAsync();

                if (product == null) return null;

                _context.Remove(product);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete product");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}