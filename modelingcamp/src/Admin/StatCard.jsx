// components/StatCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Optional: utility for styling

const StatCard = ({ title, value, icon, className }) => {
  return (
    <Card className={cn("flex items-center justify-between p-4", className)}>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className="text-3xl text-primary">{icon}</div>
    </Card>
  );
};

export default StatCard;