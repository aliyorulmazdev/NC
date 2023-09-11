using Application.Categories;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Application.Tests.CategoryTest
{
    public class ListTest : TestBase
    {
        [Fact]
        public void List_Should_Contain_TestCategory1()
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

            context.Categories.Add(new Category
            {
                Id = Guid.NewGuid(),
                Title = "Test Category 1",
                Description = "Desc 1",               
                Thumbnail = "",
                AppUserId = userId
            });

            context.SaveChanges();

            #endregion

            #region Act

            var mockMapper = new MapperConfiguration(cfg => { cfg.AddProfile(new MappingProfiles()); });
            var mapper = mockMapper.CreateMapper();
            var handler = new GetAllCategories.Handler(context, mapper);

            #endregion

            #region Assert

            var value = handler.Handle(new GetAllCategories.Query(), CancellationToken.None, userAccessor).Result.Value;
            var categoryWithTitle = value.Find(category => category.Title == "Test Category 1");

            Assert.Contains(categoryWithTitle, value);

            #endregion
        }
    }
}