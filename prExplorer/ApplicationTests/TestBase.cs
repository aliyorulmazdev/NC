using System;
using System.Linq;
using Application.Core;
using Domain;
using Microsoft.EntityFrameworkCore;
using Moq;
using Persistence;

namespace Application.Tests
{
    public class TestBase
    {
        protected DataContext GetDbContext(bool useSqlite = false)
        {
            var builder = new DbContextOptionsBuilder<DataContext>();
            if (useSqlite)
            {
                builder.UseSqlite("Data Source=:memory:", x => { });
            }
            else
            {
                builder.UseInMemoryDatabase(Guid.NewGuid().ToString());
            }

            var dbContextOptions = builder.Options;
            var userAccessor = CreateUserAccessorMock("123").Object;
            var context = new DataContext(dbContextOptions, userAccessor);

            if (useSqlite)
            {
                context.Database.OpenConnection();
            }

            context.Database.EnsureCreated();

            return context;
        }

        protected Mock<IUserAccessor> CreateUserAccessorMock(string userId)
        {
            var userAccessorMock = new Mock<IUserAccessor>();
            userAccessorMock.Setup(ua => ua.GetUserId()).Returns(userId);
            return userAccessorMock;
        }
    }
}
