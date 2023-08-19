using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [ApiController]
    [Route("/api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        // [CR 19-08-2023] You can use ASP.NET Core's Dependency Injection to inject IMediator to your controllers
        // it doesn't have to be stored here like that :)
        // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-5.0
        // On the other hand, it's a good practice to have a base controller for your API controllers
        // so you can have a common place for common logic, routes etc.
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}