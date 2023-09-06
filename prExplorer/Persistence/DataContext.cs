using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public IUserAccessor _accessor { get; }

        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DataContext(DbContextOptions options, IUserAccessor accessor) : base(options)
        {
            _accessor = accessor;
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Product sýnýfýna kullanýcý filtresi ekleme
            modelBuilder.Entity<Product>()
                .HasQueryFilter(p => p.AppUserId == _accessor.GetUserId());

            // Category sýnýfýna kullanýcý filtresi ekleme
            modelBuilder.Entity<Category>()
                .HasQueryFilter(c => c.AppUserId == _accessor.GetUserId());

            // Product ve Category arasýndaki iliþkiyi tanýmlama
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}