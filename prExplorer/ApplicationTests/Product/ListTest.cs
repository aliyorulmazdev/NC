using Application.Core;
using Application.Interfaces;
using ApplicationTests;
using AutoMapper;
using Domain;
using Moq;
using System.Collections.Generic;
using Xunit;

namespace Application.Tests.Products
{

    public class ListTest : TestBase
    {
        [Fact]
        public void List_Should_Contain_TestProduct1()
        {
            var context = GetDbContext();

            var user1 = new AppUser { DisplayName = "Dawid Sibinski", UserName = "Dawid", Email = "dawidsibinski@gmail.com" };
            context.Users.Add(user1);
            context.SaveChanges();

            // IUserAccessor'ı sahtele
            var userAccessorMock = new Mock<IUserAccessor>();
            var user = context.Users.FirstOrDefault(x => x.UserName == user1.UserName);
            userAccessorMock.Setup(ua => ua.GetUserId()).Returns(user.Id);
            var userAccessor = userAccessorMock.Object;


            context.Products.Add(new Product
            {
                Id =  Guid.NewGuid(),
                Title = "Test Product 1",
                Description = "Desc 1",
                Stock = 10,
                DiscountPercentage = 5,
                Price = 2000,
                Brand = "Test Brand",
                Category = "Test Category",
                Thumbnail = "",
                Rating = 5,
                appUserId = user.Id
            });

            context.SaveChanges();

            var mockMapper = new MapperConfiguration(cfg => { cfg.AddProfile(new MappingProfiles()); });
            var mapper = mockMapper.CreateMapper();

            var sut = new GetAllProductsTest.Handler(context,mapper, userAccessor);
            var result = sut.Handle(new GetAllProductsTest.Query(), CancellationToken.None).Result;

            var productWithTitle = result.Value.Find(product => product.Title == "Test Product 1");
            Assert.Contains(productWithTitle, result.Value);
        }
    }
}
