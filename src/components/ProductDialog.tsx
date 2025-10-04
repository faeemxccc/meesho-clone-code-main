import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "./ProductCard";
import { useState } from "react";

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDialog = ({ product, open, onOpenChange, onAddToCart }: ProductDialogProps) => {
  const [liked, setLiked] = useState(false);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg object-cover aspect-square"
            />
            <Badge className="absolute top-3 left-3 bg-accent hover:bg-accent text-lg">
              {product.discount}% OFF
            </Badge>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">(1.2k reviews)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
              </div>
              <p className="text-green-600 font-medium">You save ₹{product.originalPrice - product.price}</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Product Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• High-quality materials</li>
                <li>• Fast delivery available</li>
                <li>• 7-day return policy</li>
                <li>• Cash on delivery available</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                size="lg"
                onClick={() => {
                  onAddToCart(product);
                  onOpenChange(false);
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={liked ? 'text-red-500 border-red-500' : ''}
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Delivery Options</h4>
              <p className="text-sm text-muted-foreground">
                Enter pincode to check delivery availability and faster delivery options
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
