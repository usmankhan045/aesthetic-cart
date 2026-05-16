import { scrapeAmazonProduct } from "../src/lib/amazon-scraper";

const url = process.argv[2] ?? "https://www.amazon.com/dp/B08N5WRWNW";

console.log(`Testing scraper with: ${url}\n`);

scrapeAmazonProduct(url)
  .then((p) => {
    console.log("✓ SUCCESS");
    console.log("  ASIN:        ", p.asin);
    console.log("  Title:       ", p.title.slice(0, 80));
    console.log("  Rating:      ", p.rating, `(${p.reviewCount} reviews)`);
    console.log("  Price:       ", p.price);
    console.log("  Bullets:     ", p.bullets.length);
    console.log("  Images:      ", p.imageUrls.length);
    console.log("  Reviews:     ", p.reviews.length);
    console.log("\n  First bullet:", p.bullets[0]?.slice(0, 80));
    console.log("  First image: ", p.imageUrls[0]);
  })
  .catch((err) => {
    console.log("✗ FAILED");
    console.log("  Error:", err.message);
    process.exit(1);
  });
