using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public IUserAccessor _accessor { get; }

        public DataContext(DbContextOptions options, IUserAccessor accessor) : base(options)
        {
            _accessor = accessor;
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Adding user filter to product class.
            modelBuilder.Entity<Product>()
                .HasQueryFilter(p => p.AppUserId == _accessor.GetUserId());

            //Adding user filter to category class.
            modelBuilder.Entity<Category>()
                .HasQueryFilter(c => c.AppUserId == _accessor.GetUserId());

            //Define the relationship between Product and Category.
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}