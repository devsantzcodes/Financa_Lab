import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: React.ReactNode;
  slug: string;
}

export const ArticleCard = ({ title, description, category, readTime, icon, slug }: ArticleCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/artigo/${slug}`);
  };

  return (
    <Card 
      className="shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            {icon}
          </div>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <CardTitle className="text-xl mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{readTime} de leitura</span>
          </div>
          <Button variant="ghost" size="sm" className="group-hover:text-primary">
            Ler mais
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
