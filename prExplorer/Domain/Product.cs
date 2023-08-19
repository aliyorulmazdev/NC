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
    public string Category { get; set; }
    public string Thumbnail { get; set; }
    
    // [CR 19-08-2023] Why didn't you add Images array as well? :)
    // public List<string> Images { get; set; }
}
}