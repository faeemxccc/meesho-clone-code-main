import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
}

export const CategoryCard = ({ title, icon: Icon, color }: CategoryCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
        <div 
          className="rounded-full p-4 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `hsl(${color})` }}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="font-semibold text-center">{title}</h3>
      </CardContent>
    </Card>
  );
};
