import type { Category } from "@core/types"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { Trash2, Edit } from "lucide-react"
import { cn } from "@lib/utils"

interface CategoryItemProps {
  category: Category
  onEdit?: (category: Category) => void
  onDelete?: (id: string) => void
}

export const CategoryItem = ({
  category,
  onEdit,
  onDelete,
}: CategoryItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border",
        "hover:bg-accent transition-colors"
      )}
    >
      <div className="flex items-center gap-3">
        {category.icon && (
          <span className="text-2xl">{category.icon}</span>
        )}
        <div>
          <p className="font-medium">{category.name}</p>
          <Badge
            variant={category.type === "income" ? "default" : "secondary"}
            className="mt-1"
          >
            {category.type}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(category)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(category.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        )}
      </div>
    </div>
  )
}

