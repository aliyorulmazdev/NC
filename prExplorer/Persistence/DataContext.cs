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

            // Product s�n�f�na kullan�c� filtresi ekleme
            modelBuilder.Entity<Product>()
                .HasQueryFilter(p => p.AppUserId == _accessor.GetUserId());

            // Category s�n�f�na kullan�c� filtresi ekleme
            modelBuilder.Entity<Category>()
                .HasQueryFilter(c => c.AppUserId == _accessor.GetUserId());

            // Product ve Category aras�ndaki ili�kiyi tan�mlama
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}