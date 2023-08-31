using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SAAS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "appUserId",
                table: "Products",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_appUserId",
                table: "Products",
                column: "appUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_appUserId",
                table: "Products",
                column: "appUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_appUserId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_appUserId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "appUserId",
                table: "Products");
        }
    }
}
