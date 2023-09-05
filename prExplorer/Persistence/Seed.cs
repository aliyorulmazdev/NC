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
                    new AppUser{DisplayName = "Dawid Sibinski", UserName = "Dawid", Email = "dawidsibinski@gmail.com"},
                    new AppUser{DisplayName = "Ali Yorulmaz", UserName = "Ali", Email = "aliyrlmz@gmail.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Products.Any()) return;
            var dawid = await userManager.FindByNameAsync("Dawid");
            var ali = await userManager.FindByNameAsync("Ali");
            var products = new List<Product>
        {
            new Product
            {
                Title = "Deri Çanta",
                Description = "Şıklığı ve dayanıklılığı bir araya getiren deri çantamız, tarzınızı yansıtmanız için mükemmel bir seçenektir. Gerçek deri malzeme, çantanın hem zarif görünmesini sağlar hem de uzun ömürlü kullanım sunar. Fonksiyonel tasarımıyla günlük ihtiyaçlarınızı rahatça taşıyabilirsiniz. Hem profesyonel ortamlarda hem de günlük hayatta stilinizi tamamlamak için ideal bir aksesuardır.",
                Price = 1830.00m,
                DiscountPercentage = 10.0m,
                Rating = 4.5m,
                Stock = 50,
                Brand = "Dior",
                Category = "Aksesuar",
                Thumbnail = "https://static.ticimax.cloud/56311/uploads/urunresimleri/buyuk/dior-deri-siyah-canta--bbdb-.jpeg",
                appUserId = ali.Id
            },
            new Product
            {
                Title = "Abiye Elbise",
                Description = "Zarafetin ve şıklığın simgesi abiyemiz, özel anlarınıza unutulmaz bir dokunuş katmak için tasarlandı. İnce detaylarla süslenmiş tasarımı, sizi gece boyunca büyüleyici kılacak. Yüksek kaliteli kumaş ve dikkatle işlenmiş dikişler, konforunuzu ve güveninizi sağlar. Abiye elbisemiz, özel etkinliklerinizde göz kamaştırmanızı sağlayacak, en güzel anılarınıza eşlik edecektir.",
                Price = 740.00m,
                DiscountPercentage = 5.0m,
                Rating = 4.0m,
                Stock = 25,
                Brand = "Gucci",
                Category = "Giyim",
                Thumbnail = "https://kiyafetsepeti.com.tr/Content/ProductImage/Original/638092143829719650-IMG_3659.jpeg",
                appUserId = ali.Id
            },
            new Product
            {
                Title = "Vakko Cüzdan",
                Description = "Vakko'nun sofistike dokunuşunu taşıyan bu cüzdan, zarif tasarımı ve yüksek kaliteli derisiyle öne çıkıyor. Kartlarınızı düzenli tutmanızı sağlayan pratik iç yapısı ile şıklığı ve kullanışı bir araya getiriyor. Minimalist Vakko logosuyla imzalanan bu cüzdan, tarzınıza şıklık katmak için ideal bir seçenek.",
                Price = 360.00m,
                DiscountPercentage = 10.0m,
                Rating = 4.5m,
                Stock = 50,
                Brand = "Vakko",
                Category = "Aksesuar",
                Thumbnail = "https://images.gardrops.com/uploads/5425711/user_items/542571207-s1-file-618668ac62b29.jpeg",
                appUserId = ali.Id
            },
            new Product
            {
                Title = "Kot Pantolon",
                Description = "Zarif ve rahat stili bir araya getiren kot pantolon, günlük giyimde vazgeçilmez bir seçenek. Yüksek kaliteli kot kumaşı, rahatlığı ve dayanıklılığı bir araya getirirken, çeşitli kesim ve renk seçenekleri tarzınızı yansıtmanıza olanak tanır. Sokak modasından klasik tarza kadar her stile uyum sağlayan kot pantolonlar, gardırobunuzun vazgeçilmez parçalarından biri olacak.",
                Price = 400.00m,
                DiscountPercentage = 5.0m,
                Rating = 4.0m,
                Stock = 25,
                Brand = "Mavi",
                Category = "Giyim",
                Thumbnail = "https://static.ticimax.cloud/30682/uploads/urunresimleri/buyuk/denim-republic-erkek-mavi-regular-fit---f5b60.jpg",
                appUserId = ali.Id
            },
            new Product
            {
                Title = "Süet Ceket",
                Description = "Zarif ve modern tarzın mükemmel bir yansıması olan süet ceket, şıklığı ve rahatlığı bir araya getiriyor. Pürüzsüz dokusu ve sıcak tonlarıyla dikkat çeken bu ceket, her mevsimde ve her stilde rahatlıkla kullanılabilir. Hem casual hem de özel anlarda tarzınızı tamamlayan süet ceket, gardırobunuzun vazgeçilmez parçalarından biri olacak.",
                Price = 1200.00m,
                DiscountPercentage = 10.0m,
                Rating = 4.5m,
                Stock = 50,
                Brand = "Cotton",
                Category = "Giyim",
                Thumbnail = "https://img-morhipo.mncdn.com/mnresize/1200/1645/productimages/ii/8681872499455/[img][5][1].jpg?1919",
                appUserId = ali.Id
            },
            new Product
            {
                Title = "Converse Ayakkabı",
                Description = "Converse ayakkabıları, eşsiz tasarımı ve rahat yapısıyla öne çıkan klasik bir tercih. İkonik yıldız deseni ve geniş renk seçenekleri, her tarza ve duruma uyum sağlar. Hem sokak modasının hem de rahat giyimin vazgeçilmezi olan Converse ayakkabıları, zamansız stili ve kalitesiyle dikkat çeker. Ayaklarınıza şıklık ve rahatlık eklemek istiyorsanız, Converse ayakkabılar doğru tercih olacaktır.",
                Price = 800.00m,
                DiscountPercentage = 5.0m,
                Rating = 4.0m,
                Stock = 25,
                Brand = "Converse",
                Category = "Ayakkabı",
                Thumbnail = "https://images.journeys.com/images/products/1_609460_FS_ALT1C.JPG",
                appUserId = dawid.Id
            },
            new Product
            {
                Title = "Uzun Çorap",
                Description = "Sıcaklığı ve tarzı bir araya getiren uzun çoraplar, her mevsimde giyilebilir ve şıklığı tamamlar. Farklı desen, renk ve malzeme seçenekleri ile özgün tarzınızı yansıtmanıza yardımcı olur. Hem rahatlığı hem de estetiği ön planda tutan uzun çoraplar, ayaklarınızı sıcak tutarken görünümünüze zarif bir dokunuş ekler. Gardırobunuzun vazgeçilmez aksesuarlarından biri olarak uzun çorapları keşfedin.",
                Price = 45.00m,
                DiscountPercentage = 10.0m,
                Rating = 4.5m,
                Stock = 50,
                Brand = "Mavi",
                Category = "Giyim",
                Thumbnail = "https://m.media-amazon.com/images/I/61Ueq2+MqUL._AC_UF1000,1000_QL80_.jpg",
                appUserId = dawid.Id
            },
            new Product
            {
                Title = "Superstar Ayakkabı",
                Description = "Adidas Superstar ayakkabıları, spor ve modanın mükemmel bir kombinasyonunu sunuyor. Klasik tasarımı ve efsanevi üç şerit detayıyla öne çıkan bu ayakkabılar, sokak stili ve rahat giyimin vazgeçilmezleri arasında yer alıyor. Özgün tasarımı, dayanıklılığı ve rahat yapısıyla Adidas Superstar, her durumda rahatlıkla kullanabileceğiniz ve tarzınıza özgünlük katacağınız bir seçenek.",
                Price = 2100.00m,
                DiscountPercentage = 5.0m,
                Rating = 4.0m,
                Stock = 25,
                Brand = "Adidas",
                Category = "Ayakkabı",
                Thumbnail = "https://anindigoday.com/wp-content/uploads/2016/03/adidas-originals-street-style-My-Style-Vita-@mystylevita-31.webp",
                appUserId = dawid.Id
            },
            new Product
            {
                Title = "Miav Tshirt",
                Description = "Miav T-shirt, özgün tasarımı ve rahat kesimi ile tarzınıza renk katacak bir seçenek. Yüksek kaliteli pamuklu kumaşı sayesinde gün boyu konfor sağlarken, eğlenceli ve dikkat çekici grafikleri ile tarzınızı yansıtmanızı kolaylaştırır. Sokağın enerjisini gardırobunuza taşıyan Miav T-shirt, rahatlık ve özgünlüğü bir araya getiriyor.",
                Price = 240.00m,
                DiscountPercentage = 10.0m,
                Rating = 4.8m,
                Stock = 50,
                Brand = "Mavi",
                Category = "Tshirt",
                Thumbnail = "https://sky-static.mavi.com/sys-master/maviTrImages/h65/h2c/10074340327454/1610622-620_image_1.jpg_Default-ZoomProductImage",
                appUserId = dawid.Id
            },
            new Product
            {
                Title = "Polo Tshirt",
                Description = "Klasik tarzın modern yorumu olan Polo T-shirt, şıklığı ve rahatlığı bir araya getiriyor. Yaka detayı ve düğmeli tasarımı ile öne çıkan bu tişört, hem gündelik hem de daha resmi durumlar için ideal bir seçenek. Farklı renk ve kesim seçenekleri ile tarzınıza özgünlük katmanızı sağlayan Polo T-shirt, gardırobunuzun vazgeçilmez parçalarından biri olacak.",
                Price = 150.00m,
                DiscountPercentage = 5.0m,
                Rating = 4.0m,
                Stock = 25,
                Brand = "Polo",
                Category = "Giyim",
                Thumbnail = "https://skcfiles.mncdn.com/livephotos/8/S211800-600/679-10.jpg",
                appUserId = dawid.Id
            }
        };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}