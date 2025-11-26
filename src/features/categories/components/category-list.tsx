import type { Category } from "@core/types"
import { CategoryItem } from "../category-item"
import { motion } from "framer-motion"

interface CategoryListProps {
  categories: Category[]
  onEdit?: (category: Category) => void
  onDelete?: (id: string) => void
}

export const CategoryList = ({
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Không tìm thấy danh mục nào
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <CategoryItem
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  )
}

