using API.DTOs;
using API.Services;
using Application.Categories;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (result)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                var currentUser = await _userManager.FindByEmailAsync(registerDto.Email);
                await AddCategoryInUser(currentUser.Id);

                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        public async Task<ActionResult> AddCategoryInUser(string appUserId)
        {
            List<Category> categories = new List<Category>
            {
                new Category
                {
                    Title = "Clothes",
                    Description = "Description",
                    Thumbnail = "Thumbnail",
                    AppUserId = appUserId
                },
                new Category
                {
                    Title = "Shoes",
                    Description = "Description",
                    Thumbnail = "Thumbnail",
                    AppUserId = appUserId
                },
                new Category
                {
                    Title = "Accessories",
                    Description = "Description",
                    Thumbnail = "Thumbnail",
                    AppUserId = appUserId
                },
                new Category
                {
                    Title = "Watches",
                    Description = "Description",
                    Thumbnail = "Thumbnail",
                    AppUserId = appUserId
                }
            };

            foreach (var category in categories)
            {
                await Mediator.Send(new Create.Command { Category = category });
            }

            return Ok();
        }

        private ActionResult<UserDto> CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }
    }
}