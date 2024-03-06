using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly StoreContext _context;
        public UserController(StoreContext context) {
            _context = context;
        }

        [HttpGet("login/{username}/{password}")]
        public async Task<ActionResult<User>> LoginUser(string username, string password)
        {
            //get basket || create basket
            var user = await RetrieveUser(username);
            if (user == null) {
                return BadRequest(new ProblemDetails { Title = "Username incorrect!" });
            } else
            {
                if (user.Password == HashPassword(password))
                {
                    return user;
                }
                else
                {
                    return BadRequest(new ProblemDetails { Title = "Password incorrect!" });
                }
            }

        }

        [HttpGet("changePwd/{username}/{password}")]
        public async Task<ActionResult<User>> ChangePwd(string username, string password)
        {
            //get basket || create basket
            var user = await RetrieveUser(username);
            if (user == null)
            {
                return BadRequest(new ProblemDetails { Title = "Username incorrect!" });
            }
            else
            {
                user.Password = HashPassword(password);
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return user;
                return BadRequest(new ProblemDetails { Title = "Problem occurs chaning password" });
            }

        }

        [HttpGet("check/{username}")]
        public async Task<ActionResult<User>> CheckUser(string username)
        {
            //get basket || create basket
            var user = await RetrieveUser(username);
            if (user == null)
            {
                return BadRequest(new ProblemDetails { Title = "Username incorrect!" });
            }
            else
            {
                return user;
            }

        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUser(string username, string password)
        {
            //get basket || create basket
            var user = await RetrieveUser(username);
            if (user == null) user = CreateUser(username, password);
            else return BadRequest(new ProblemDetails { Title = "Username exists" });

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return user;
            return BadRequest(new ProblemDetails { Title = "Problem occurs adding account" });
            /*//get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });
*/
            /*
            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
            */
        }

        

        private async Task<User> RetrieveUser(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }
        private User CreateUser(string username, string password)
        {
            /*
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            */

            var user = new User { Username = username, Password = HashPassword(password) };
            _context.Users.Add(user);
            return user;
        }

        public string HashPassword(string password)
        {
            // Create a SHA256   
            using SHA256 sha256Hash = SHA256.Create();

            // ComputeHash - returns byte array  
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Convert byte array to a string   
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }

            return builder.ToString();
        }
    }
}
