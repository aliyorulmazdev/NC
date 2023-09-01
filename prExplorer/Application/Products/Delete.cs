using Application.Core;
using Application.Interfaces;
using AutoMapper;
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
                    // Eğer kullanıcı bulunamazsa hata işleme.
                    return Result<Unit>.Failure("Kullanıcı bulunamadı.");
                }

                var product = await _context.Products
                .Where(x => x.appUserId == user.Id && request.Id == x.Id)
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