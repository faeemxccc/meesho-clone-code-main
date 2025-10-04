import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart, onProductClick }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 cursor-pointer">
      <div className="relative overflow-hidden" onClick={() => onProductClick(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-accent hover:bg-accent">
          {product.discount}% OFF
        </Badge>
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-card ${liked ? 'text-red-500' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
        </Button>
      </div>
      <CardContent className="p-4 space-y-2" onClick={() => onProductClick(product)}>
        <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm">⭐</span>
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
