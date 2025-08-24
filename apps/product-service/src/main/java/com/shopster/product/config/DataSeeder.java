package com.shopster.product.config;

import com.shopster.product.document.*;
import com.shopster.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;

@Component
@Profile("dev")
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            seedProducts();
        }
    }

    private void seedProducts() {
        List<Product> products = new ArrayList<>();

        // Electronics - with real product images
        products.add(createProductWithImage("iPhone 15 Pro", "Apple", "Electronics", "IPHONE15PRO128", 
            new BigDecimal("999.99"), new BigDecimal("949.99"), 
            "Latest iPhone with advanced camera system and A17 Pro chip", 
            Arrays.asList("smartphone", "apple", "mobile", "5g"), 50,
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Samsung Galaxy S24", "Samsung", "Electronics", "GALAXY-S24-256", 
            new BigDecimal("799.99"), null, 
            "Powerful Android smartphone with AI features and excellent camera", 
            Arrays.asList("smartphone", "samsung", "android", "ai"), 75,
            "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("MacBook Pro 14\"", "Apple", "Electronics", "MBP14-M3PRO-512", 
            new BigDecimal("1999.99"), null, 
            "Professional laptop with M3 Pro chip for demanding workflows", 
            Arrays.asList("laptop", "apple", "macbook", "professional"), 25,
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Dell XPS 13", "Dell", "Electronics", "XPS13-9340-I7", 
            new BigDecimal("1299.99"), new BigDecimal("1199.99"), 
            "Ultra-portable laptop with stunning InfinityEdge display", 
            Arrays.asList("laptop", "dell", "ultrabook", "portable"), 30,
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("iPad Air", "Apple", "Electronics", "IPADAIR-11-256", 
            new BigDecimal("749.99"), new BigDecimal("699.99"), 
            "Versatile tablet perfect for work and creativity", 
            Arrays.asList("tablet", "apple", "ipad", "creativity"), 40,
            "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Sony WH-1000XM5", "Sony", "Electronics", "WH1000XM5-BK", 
            new BigDecimal("399.99"), new BigDecimal("349.99"), 
            "Industry-leading noise canceling wireless headphones", 
            Arrays.asList("headphones", "sony", "wireless", "noise-canceling"), 60,
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("AirPods Pro", "Apple", "Electronics", "AIRPODS-PRO-USB", 
            new BigDecimal("249.99"), null, 
            "Active Noise Cancellation and Personalized Spatial Audio", 
            Arrays.asList("earbuds", "apple", "wireless", "noise-canceling"), 85,
            "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Nintendo Switch OLED", "Nintendo", "Electronics", "SWITCH-OLED-WHT", 
            new BigDecimal("349.99"), null, 
            "Gaming console with vibrant OLED screen", 
            Arrays.asList("gaming", "console", "nintendo", "portable"), 45,
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("PlayStation 5", "Sony", "Electronics", "PS5-CONSOLE", 
            new BigDecimal("499.99"), null, 
            "Next-gen gaming console with lightning-fast SSD", 
            Arrays.asList("gaming", "console", "sony", "playstation"), 20,
            "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("LG OLED C3 55\"", "LG", "Electronics", "OLED55C3PUA", 
            new BigDecimal("1299.99"), new BigDecimal("1099.99"), 
            "Premium OLED TV with perfect blacks and vibrant colors", 
            Arrays.asList("tv", "oled", "lg", "4k"), 15,
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop"));

        // Clothing - with real fashion images
        products.add(createProductWithImage("Nike Air Force 1", "Nike", "Clothing", "AF1-WHT-SIZE10", 
            new BigDecimal("110.00"), new BigDecimal("89.99"), 
            "Classic white leather sneakers, timeless design", 
            Arrays.asList("shoes", "sneakers", "nike", "casual"), 120,
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Levi's 501 Original Jeans", "Levi's", "Clothing", "LEVI501-34X32", 
            new BigDecimal("69.50"), null, 
            "The original blue jean since 1873, straight fit", 
            Arrays.asList("jeans", "denim", "levis", "classic"), 95,
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Adidas Ultraboost 22", "Adidas", "Clothing", "UB22-BLK-SIZE9", 
            new BigDecimal("180.00"), new BigDecimal("144.00"), 
            "Performance running shoes with responsive cushioning", 
            Arrays.asList("running", "shoes", "adidas", "boost"), 80,
            "https://images.unsplash.com/photo-1554735490-5974588f-2a0b?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Patagonia Down Jacket", "Patagonia", "Clothing", "PATAG-DOWN-M-BLU", 
            new BigDecimal("279.00"), null, 
            "Lightweight down insulation for cold weather adventures", 
            Arrays.asList("jacket", "down", "patagonia", "outdoor"), 55,
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Champion Reverse Weave Hoodie", "Champion", "Clothing", "CHAMP-HOODIE-L-GRY", 
            new BigDecimal("65.00"), new BigDecimal("52.00"), 
            "Classic heavyweight hoodie with iconic logo", 
            Arrays.asList("hoodie", "champion", "casual", "cotton"), 110,
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Ray-Ban Aviator Sunglasses", "Ray-Ban", "Clothing", "RB3025-GOLD", 
            new BigDecimal("154.00"), new BigDecimal("139.00"), 
            "Iconic aviator style with premium lenses", 
            Arrays.asList("sunglasses", "rayban", "aviator", "classic"), 75,
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Uniqlo Heattech Crew Neck", "Uniqlo", "Clothing", "UNIQ-HEAT-M-BLK", 
            new BigDecimal("14.90"), null, 
            "Ultra-warm base layer with moisture-wicking technology", 
            Arrays.asList("base-layer", "uniqlo", "heattech", "thermal"), 200,
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Converse Chuck Taylor All Star", "Converse", "Clothing", "CHUCK-HI-WHT-8", 
            new BigDecimal("55.00"), new BigDecimal("44.00"), 
            "High-top canvas sneakers, an American classic", 
            Arrays.asList("sneakers", "converse", "canvas", "classic"), 150,
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("North Face Resolve Jacket", "The North Face", "Clothing", "TNF-RESOLVE-L-BLK", 
            new BigDecimal("99.00"), new BigDecimal("79.20"), 
            "Waterproof, breathable rain jacket for outdoor activities", 
            Arrays.asList("jacket", "northface", "rain", "outdoor"), 65,
            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Vans Old Skool", "Vans", "Clothing", "VANS-OLDSKOOL-10", 
            new BigDecimal("65.00"), null, 
            "Skate-inspired sneakers with iconic side stripe", 
            Arrays.asList("sneakers", "vans", "skate", "casual"), 90,
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop"));

        // Home & Garden - with real product images
        products.add(createProductWithImage("Dyson V15 Detect", "Dyson", "Home & Garden", "DYSON-V15-DETECT", 
            new BigDecimal("749.99"), new BigDecimal("649.99"), 
            "Powerful cordless vacuum with laser dust detection", 
            Arrays.asList("vacuum", "dyson", "cordless", "cleaning"), 35,
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("KitchenAid Stand Mixer", "KitchenAid", "Home & Garden", "KSM150PSER", 
            new BigDecimal("379.99"), new BigDecimal("329.99"), 
            "5-quart tilt-head stand mixer for all your baking needs", 
            Arrays.asList("mixer", "kitchenaid", "baking", "appliance"), 42,
            "https://images.unsplash.com/photo-1585515656718-2e7ade7bd9e3?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Nespresso Vertuo Next", "Nespresso", "Home & Garden", "VERTUO-NEXT-GRY", 
            new BigDecimal("199.99"), new BigDecimal("159.99"), 
            "Coffee maker with one-touch brewing system", 
            Arrays.asList("coffee", "nespresso", "espresso", "brewing"), 55,
            "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Instant Pot Duo 7-in-1", "Instant Pot", "Home & Garden", "DUO60-7IN1", 
            new BigDecimal("99.99"), new BigDecimal("79.99"), 
            "Multi-functional pressure cooker for quick meals", 
            Arrays.asList("pressure-cooker", "instant-pot", "cooking", "multi-use"), 70,
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Philips Hue Smart Bulbs", "Philips", "Home & Garden", "HUE-A19-4PACK", 
            new BigDecimal("199.99"), new BigDecimal("169.99"), 
            "Color-changing smart LED bulbs, 4-pack", 
            Arrays.asList("smart-home", "philips", "led", "lighting"), 88,
            "https://images.unsplash.com/photo-1558882224-dda166733046?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("iRobot Roomba j7+", "iRobot", "Home & Garden", "ROOMBA-J7PLUS", 
            new BigDecimal("849.99"), new BigDecimal("699.99"), 
            "Smart robot vacuum that avoids obstacles and empties itself", 
            Arrays.asList("robot-vacuum", "irobot", "smart", "cleaning"), 25,
            "https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Ninja Foodi Air Fryer", "Ninja", "Home & Garden", "NINJA-AF101", 
            new BigDecimal("129.99"), new BigDecimal("99.99"), 
            "4-quart air fryer for crispy, guilt-free cooking", 
            Arrays.asList("air-fryer", "ninja", "cooking", "healthy"), 65,
            "https://images.unsplash.com/photo-1585032226651-4e875fb40711?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Breville Barista Express", "Breville", "Home & Garden", "BES870XL", 
            new BigDecimal("699.95"), new BigDecimal("599.95"), 
            "Espresso machine with built-in grinder", 
            Arrays.asList("espresso", "breville", "coffee", "grinder"), 28,
            "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Le Creuset Dutch Oven", "Le Creuset", "Home & Garden", "LC-DO-5.5QT-RED", 
            new BigDecimal("349.95"), null, 
            "5.5-quart enameled cast iron Dutch oven", 
            Arrays.asList("cookware", "le-creuset", "dutch-oven", "cast-iron"), 40,
            "https://images.unsplash.com/photo-1556909114-14df4ca59043?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Shark Navigator Lift-Away", "Shark", "Home & Garden", "NV356E", 
            new BigDecimal("179.99"), new BigDecimal("129.99"), 
            "Professional upright vacuum with lift-away canister", 
            Arrays.asList("vacuum", "shark", "upright", "lift-away"), 52,
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"));

        // Books - with real book cover images
        products.add(createProductWithImage("The Psychology of Money", "Harcourt", "Books", "POM-9780857197689", 
            new BigDecimal("16.99"), new BigDecimal("13.59"), 
            "Timeless lessons on wealth, greed, and happiness by Morgan Housel", 
            Arrays.asList("finance", "psychology", "investing", "bestseller"), 150,
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Atomic Habits", "Avery", "Books", "AH-9780735211292", 
            new BigDecimal("18.00"), new BigDecimal("14.40"), 
            "An easy & proven way to build good habits & break bad ones", 
            Arrays.asList("self-help", "habits", "productivity", "bestseller"), 200,
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("The Seven Husbands of Evelyn Hugo", "Atria Books", "Books", "7H-9781501161933", 
            new BigDecimal("16.99"), null, 
            "A reclusive Hollywood icon finally tells her story", 
            Arrays.asList("fiction", "romance", "hollywood", "bestseller"), 175,
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Educated", "Random House", "Books", "EDU-9780399590504", 
            new BigDecimal("17.00"), new BigDecimal("13.60"), 
            "A memoir about education, family, and the struggle for self-invention", 
            Arrays.asList("memoir", "education", "family", "bestseller"), 120,
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Where the Crawdads Sing", "G.P. Putnam's Sons", "Books", "CRAWDADS-9780735219090", 
            new BigDecimal("15.99"), new BigDecimal("12.79"), 
            "A mystery and coming-of-age story set in the marshes of North Carolina", 
            Arrays.asList("fiction", "mystery", "coming-of-age", "bestseller"), 180,
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Dune", "Ace", "Books", "DUNE-9780441172719", 
            new BigDecimal("16.99"), null, 
            "Frank Herbert's classic science fiction epic", 
            Arrays.asList("science-fiction", "classic", "epic", "space"), 95,
            "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("The Midnight Library", "Viking", "Books", "ML-9780525559474", 
            new BigDecimal("26.00"), new BigDecimal("20.80"), 
            "A novel about infinite possibilities and infinite regrets", 
            Arrays.asList("fiction", "philosophy", "life", "choices"), 140,
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Becoming", "Crown", "Books", "BEC-9781524763138", 
            new BigDecimal("32.50"), new BigDecimal("26.00"), 
            "Michelle Obama's deeply personal memoir", 
            Arrays.asList("memoir", "politics", "inspiration", "autobiography"), 110,
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("The Silent Patient", "Celadon Books", "Books", "SP-9781250301697", 
            new BigDecimal("27.99"), new BigDecimal("22.39"), 
            "A psychological thriller about a woman who refuses to speak", 
            Arrays.asList("thriller", "psychology", "mystery", "bestseller"), 165,
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Normal People", "Hogarth", "Books", "NP-9781984822178", 
            new BigDecimal("16.00"), new BigDecimal("12.80"), 
            "A story of mutual fascination, friendship and love", 
            Arrays.asList("literary-fiction", "romance", "coming-of-age", "contemporary"), 130,
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop"));

        // Sports & Outdoors - with real product images
        products.add(createProductWithImage("Yeti Rambler Tumbler 30oz", "Yeti", "Sports & Outdoors", "YETI-RAMB-30-BLK", 
            new BigDecimal("39.99"), new BigDecimal("34.99"), 
            "Insulated stainless steel tumbler that keeps drinks cold or hot", 
            Arrays.asList("drinkware", "yeti", "insulated", "tumbler"), 125,
            "https://images.unsplash.com/photo-1534056703900-9c5554ce1321?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Hydro Flask Water Bottle", "Hydro Flask", "Sports & Outdoors", "HF-32OZ-BLUE", 
            new BigDecimal("44.95"), null, 
            "32oz insulated water bottle with flex cap", 
            Arrays.asList("water-bottle", "hydro-flask", "insulated", "outdoor"), 160,
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Coleman Camping Chair", "Coleman", "Sports & Outdoors", "COLEMAN-CHAIR-RED", 
            new BigDecimal("24.99"), new BigDecimal("19.99"), 
            "Portable folding chair with cooler and cup holder", 
            Arrays.asList("camping", "chair", "coleman", "portable"), 85,
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("REI Co-op Trail 25 Backpack", "REI", "Sports & Outdoors", "REI-TRAIL25-GRN", 
            new BigDecimal("89.95"), new BigDecimal("71.96"), 
            "Lightweight daypack perfect for hiking and daily use", 
            Arrays.asList("backpack", "hiking", "rei", "daypack"), 70,
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Patagonia Houdini Jacket", "Patagonia", "Sports & Outdoors", "PAT-HOUDINI-M", 
            new BigDecimal("119.00"), null, 
            "Ultra-lightweight windbreaker jacket that packs into its own pocket", 
            Arrays.asList("jacket", "windbreaker", "patagonia", "packable"), 45,
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Garmin Forerunner 245", "Garmin", "Sports & Outdoors", "FR245-BLK", 
            new BigDecimal("299.99"), new BigDecimal("249.99"), 
            "GPS running watch with music and advanced training features", 
            Arrays.asList("smartwatch", "garmin", "running", "gps"), 55,
            "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Therm-a-Rest Sleeping Pad", "Therm-a-Rest", "Sports & Outdoors", "THERMAREST-XLITE", 
            new BigDecimal("189.95"), new BigDecimal("151.96"), 
            "Ultralight sleeping pad for backpacking", 
            Arrays.asList("sleeping-pad", "camping", "therm-a-rest", "ultralight"), 38,
            "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Black Diamond Headlamp", "Black Diamond", "Sports & Outdoors", "BD-SPOT400", 
            new BigDecimal("44.95"), null, 
            "400 lumen headlamp with red night vision", 
            Arrays.asList("headlamp", "black-diamond", "lighting", "outdoor"), 92,
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Osprey Atmos AG 65", "Osprey", "Sports & Outdoors", "OSPREY-ATMOS65", 
            new BigDecimal("269.95"), new BigDecimal("215.96"), 
            "Anti-gravity suspension backpack for multi-day treks", 
            Arrays.asList("backpack", "osprey", "backpacking", "suspension"), 25,
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"));

        products.add(createProductWithImage("Merrell Hiking Boots", "Merrell", "Sports & Outdoors", "MERRELL-MOAB3-10", 
            new BigDecimal("134.95"), new BigDecimal("107.96"), 
            "Waterproof hiking boots with Vibram sole", 
            Arrays.asList("hiking-boots", "merrell", "waterproof", "vibram"), 75,
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=400&fit=crop"));

        productRepository.saveAll(products);
        System.out.println("Successfully seeded " + products.size() + " products into the database");
    }

    private Product createProductWithImage(String name, String brand, String category, String sku, 
                                      BigDecimal price, BigDecimal salePrice, String description, 
                                      List<String> tagsList, int quantity, String imageUrl) {
        Product product = createProduct(name, brand, category, sku, price, salePrice, description, tagsList, quantity);
        
        // Update the primary image with the provided URL
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            ProductImage primaryImage = product.getImages().get(0);
            primaryImage.setUrl(imageUrl);
            primaryImage.setAlt(name + " product image");
        }
        
        return product;
    }

    private Product createProduct(String name, String brand, String category, String sku, 
                                BigDecimal price, BigDecimal salePrice, String description, 
                                List<String> tagsList, int quantity) {
        Product product = new Product();
        product.setName(name);
        product.setBrand(brand);
        product.setCategory(category);
        product.setSku(sku);
        product.setPrice(price);
        product.setSalePrice(salePrice);
        product.setDescription(description);
        product.setTags(new HashSet<>(tagsList));
        product.setCurrency("USD");
        product.setStatus(Product.ProductStatus.ACTIVE);
        product.setVisibility(Product.ProductVisibility.PUBLIC);
        
        // Set random featured/trending/recommended flags
        Random random = new Random();
        product.setFeatured(random.nextInt(10) == 0); // 10% chance
        product.setTrending(random.nextInt(15) == 0); // ~7% chance
        product.setRecommended(random.nextInt(8) == 0); // ~12% chance

        // Create product image
        List<ProductImage> images = new ArrayList<>();
        ProductImage primaryImage = new ProductImage();
        primaryImage.setUrl("https://via.placeholder.com/400x400?text=" + name.replace(" ", "+"));
        primaryImage.setAlt(name + " product image");
        primaryImage.setIsPrimary(true);
        primaryImage.setSortOrder(0);
        images.add(primaryImage);
        product.setImages(images);

        // Create inventory
        Inventory inventory = new Inventory();
        inventory.setQuantity(quantity);
        inventory.setInStock(quantity > 0);
        inventory.setLowStockThreshold(10);
        inventory.setTrackQuantity(true);
        inventory.setAllowBackorders(false);
        inventory.setReservedQuantity(0);
        product.setInventory(inventory);

        // Create rating with random values
        Rating rating = new Rating();
        if (random.nextBoolean()) { // 50% chance of having ratings
            BigDecimal avgRating = BigDecimal.valueOf(3.0 + random.nextDouble() * 2.0).setScale(1, BigDecimal.ROUND_HALF_UP);
            int reviewCount = random.nextInt(200) + 10;
            rating.setAverage(avgRating);
            rating.setCount(reviewCount);
            
            // Create rating distribution
            Map<Integer, Integer> distribution = new HashMap<>();
            int remaining = reviewCount;
            for (int i = 5; i >= 1 && remaining > 0; i--) {
                int count = i >= 4 ? random.nextInt(remaining / 2 + 1) : random.nextInt(remaining + 1);
                if (i == 1) count = remaining; // Ensure we use all remaining
                distribution.put(i, count);
                remaining -= count;
            }
            rating.setDistribution(distribution);
        }
        product.setRating(rating);

        return product;
    }
}