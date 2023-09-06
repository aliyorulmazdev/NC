using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser { DisplayName = "Dawid Sibinski", UserName = "Dawid", Email = "dawidsibinski@gmail.com" },
                    new AppUser { DisplayName = "Ali Yorulmaz", UserName = "Ali", Email = "aliyrlmz@gmail.com" },
                    new AppUser { DisplayName = "Berat Arpa", UserName = "Berat", Email = "beratarpa@hotmail.com" }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
                await context.SaveChangesAsync();

                foreach (var user in users)
                {
                    var categories = new List<Category>
                    {
                        new Category { Title = "Clothes", Description = "", Thumbnail = "", AppUser = user },
                        new Category { Title = "Shoes", Description = "", Thumbnail = "", AppUser = user  },
                        new Category { Title = "Accessories", Description = "", Thumbnail = "", AppUser = user  }
                    };

                    await context.Categories.AddRangeAsync(categories);
                    await context.SaveChangesAsync();

                    var products = new List<Product>();
                    foreach (var cat in categories)
                    {
                        for (int i = 1; i <= 3; i++)
                        {
                            products.Add(new Product
                            {
                                Title = $"Product {i} for {cat.Title}",
                                Description = $"Description of Product {i} for {cat.Title}",
                                Price = 50.00m + i * 10.0m,
                                DiscountPercentage = 10.0m,
                                Rating = 4.5m,
                                Stock = 10,
                                Brand = $"Brand {i}",
                                Thumbnail = $"Thumbnail {i}",
                                AppUser = user,
                                Category = cat,
                            });
                        }
                    }

                    await context.Products.AddRangeAsync(products);
                }

                await context.SaveChangesAsync();
            }
        }
    }
}