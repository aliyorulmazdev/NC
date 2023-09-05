using Application.Core;
using Application.Interfaces;
using Application.Products;
using AutoMapper;
using Domain;
using Moq;
using System.Linq;
using Xunit;

namespace Application.Tests.Products
{
    public class ListTest : TestBase
    {
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public ListTest()
        {
            var mockMapper = new MapperConfiguration(cfg => { cfg.AddProfile(new MappingProfiles()); });
            _mapper = mockMapper.CreateMapper();

            var userAccessorMock = new Mock<IUserAccessor>();
            userAccessorMock.Setup(ua => ua.GetUserId()).Returns("qwe123");
            _userAccessor = userAccessorMock.Object;
        }

        [Fact]
        public void List_Should_Contain_TestProduct1()
        {
            var context = GetDbContext();

            // Örnek bir ürün ekleyin
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
                appUserId = "qwe123"
            });

            context.SaveChanges();

            var sut = new List.Handler(context, _mapper, _userAccessor);
            var result = sut.Handle(new List.Query(), CancellationToken.None).Result;

            var productWithTitle = result.Value.Find(product => product.Title == "Test Product 1");
            Assert.Contains(productWithTitle, result.Value);
        }
    }
}
