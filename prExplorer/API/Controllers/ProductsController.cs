using Application.Products;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        // [CR 19-08-2023] You don't need to add "Product" to all actions in this controller.
        // Imagine how your API URL looks like now: https://localhost:5001/api/products/GetProducts
        // "products" is there twice. You can think of better names, like "All", "Details", "Create", "Update", "Delete"
        // In effect, the URLs would look more RESTful, e.g. https://localhost:5001/api/products/all, https://localhost:5001/api/products/details/1 etc.
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await Mediator.Send(new List.Query());
        }

        // [CR 19-08-2023] What about errors handling in all these methods below?
        // What should the API consumer receive when there was an internal errors when fetching from/saving something to the database?
        // On the other hand: what should be the API response if the user provides a wrong data (e.g. wrong product ID)?
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult> CreateProduct(Product product)
        {
            return Ok(await Mediator.Send(new Create.Command { Product = product }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(Guid id, Product product)
        {
            product.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Product = product }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}