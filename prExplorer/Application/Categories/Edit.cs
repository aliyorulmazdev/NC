using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Category Category { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Category).SetValidator(new CategoryValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == _userAccessor.GetUserId());

                if (user == null)
                {
                    //Error handling if the user is not found.
                    return Result<Unit>.Failure("Kullanıcı bulunamadı.");
                }

                var category = await _context.Categories.Where(x => x.Id == request.Category.Id).FirstOrDefaultAsync();

                if (category == null) return null;

                _mapper.Map(request.Category, category);
                category.AppUserId = _userAccessor.GetUserId();
                category.AppUser = user;
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update category");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}