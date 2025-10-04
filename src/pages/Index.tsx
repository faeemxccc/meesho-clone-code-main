import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard, Product } from "@/components/ProductCard";
import { CartSheet } from "@/components/CartSheet";
import { ProductDialog } from "@/components/ProductDialog";
import { toast } from "sonner";
import { 
  Shirt, 
  Home, 
  Sparkles, 
  Smartphone, 
  Gem,
  Utensils
} from "lucide-react";

import fashionImg from "@/assets/product-fashion.jpg";
import homeImg from "@/assets/product-home.jpg";
import beautyImg from "@/assets/product-beauty.jpg";
import electronicsImg from "@/assets/product-electronics.jpg";
import jewelryImg from "@/assets/product-jewelry.jpg";
import kitchenImg from "@/assets/product-kitchen.jpg";

const categories = [
  { title: "Fashion", icon: Shirt, color: "280 70% 50%" },
  { title: "Home & Living", icon: Home, color: "320 70% 55%" },
  { title: "Beauty", icon: Sparkles, color: "25 95% 55%" },
  { title: "Electronics", icon: Smartphone, color: "200 70% 50%" },
  { title: "Jewelry", icon: Gem, color: "350 70% 55%" },
  { title: "Kitchen", icon: Utensils, color: "160 60% 45%" },
];

const products: Product[] = [
  {
    id: 1,
    name: "Trendy Women's Dress Collection",
    price: 599,
    originalPrice: 1999,
    discount: 70,
    image: fashionImg,
    rating: 4.3,
  },
  {
    id: 2,
    name: "Modern Home Decor Set",
    price: 899,
    originalPrice: 2499,
    discount: 64,
    image: homeImg,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Premium Beauty & Cosmetics Kit",
    price: 799,
    originalPrice: 1899,
    discount: 58,
    image: beautyImg,
    rating: 4.4,
  },
  {
    id: 4,
    name: "Wireless Electronics Bundle",
    price: 1299,
    originalPrice: 3999,
    discount: 68,
    image: electronicsImg,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Elegant Jewelry Collection",
    price: 499,
    originalPrice: 1499,
    discount: 67,
    image: jewelryImg,
    rating: 4.2,
  },
  {
    id: 6,
    name: "Kitchen Essentials Combo",
    price: 699,
    originalPrice: 1799,
    discount: 61,
    image: kitchenImg,
    rating: 4.4,
  },
];

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success("Updated cart quantity");
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success("Added to cart");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      
      <Hero />

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Trending Products</h2>
          <span className="text-sm text-muted-foreground">Showing {products.length} products</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      </section>

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <ProductDialog
        product={selectedProduct}
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Index;
