namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountPercentage { get; set; }
        public decimal Rating { get; set; }
        public int Stock { get; set; }
        public string Brand { get; set; }
        public string Thumbnail { get; set; }
        public string AppUserId { get; set; }
        public Guid CategoryId { get; set; }
        public AppUser AppUser { get; set; }
        public Category Category { get; set; }
    }
}