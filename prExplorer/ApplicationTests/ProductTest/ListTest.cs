using Application.Core;
using Application.Products;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Application.Tests.ProductsTest
{
    public class ListTest : TestBase
    {
        [Fact]
        public void List_Should_Contain_TestProduct1()
        {
            #region Arrange

            var context = GetDbContext();

            var createdUser = new AppUser { DisplayName = "Dawid Sibinski", UserName = "Dawid", Email = "dawidsibinski@gmail.com" };
            context.Entry(createdUser).State = EntityState.Added;
            context.SaveChanges();

            //Fake IUserAccessor.
            var userAccessorMock = new Mock<IUserAccessor>();
            string? userId = context.Users.FirstOrDefault(x => x.UserName == createdUser.UserName)?.Id;
            userAccessorMock.Setup(ua => ua.GetUserId()).Returns(userId);
            var userAccessor = userAccessorMock.Object;

            context.Products.Add(new Product
            {
                Id = Guid.NewGuid(),
                Title = "Test Product 1",
                Description = "Desc 1",
                Stock = 10,
                DiscountPercentage = 5,
                Price = 2000,
                Brand = "Test Brand",
                Thumbnail = "",
                Rating = 5,
                AppUserId = userId
            });

            context.SaveChanges();

            #endregion

            #region Act

            var mockMapper = new MapperConfiguration(cfg => { cfg.AddProfile(new MappingProfiles()); });
            var mapper = mockMapper.CreateMapper();
            var handler = new GetAllProducts.Handler(context, mapper);

            #endregion

            #region Assert

            var value = handler.Handle(new GetAllProducts.Query(), CancellationToken.None).Result.Value;
            var productWithTitle = value.Find(product => product.Title == "Test Product 1");

            Assert.Contains(productWithTitle, value);

            #endregion
        }
    }
}