using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualBasic;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                #region UsersSeedAdded

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

                #endregion

                #region ProductsAndCategories

                foreach (var user in users)
                {
                    #region AddedCategoryInUser

                    var categories = new List<Category>
                    {
                        new Category { Title = "Clothes", Description = "", Thumbnail = "", AppUser = user },
                        new Category { Title = "Shoes", Description = "", Thumbnail = "", AppUser = user  },
                        new Category { Title = "Accessories", Description = "", Thumbnail = "", AppUser = user  }
                    };
                    await context.Categories.AddRangeAsync(categories);

                    #endregion

                    #region AddedProductInUser

                    var products = new List<Product>();
                    foreach (var category in categories)
                    {
                        for (int i = 1; i <= 3; i++)
                        {
                            products.Add(new Product
                            {
                                Title = $"Product {i} for {category.Title}",
                                Description = $"Description of Product {i} for {category.Title}",
                                Price = 50.00m + i * 10.0m,
                                DiscountPercentage = 10.0m,
                                Rating = 4.5m,
                                Stock = 10,
                                Brand = $"Brand {i}",
                                Thumbnail = $"Thumbnail {i}",
                                AppUser = user,
                                Category = category
                            });
                        }
                    }

                    await context.Products.AddRangeAsync(products);

                    #endregion
                }

                await context.SaveChangesAsync();

                #endregion
            }
        }
    }
}