import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"

const categories = [
  { name: "Nhà ở", amount: 2450, percent: 32, color: "from-orange-500/70" },
  { name: "Thực phẩm", amount: 860, percent: 11, color: "from-emerald-500/70" },
  { name: "Ăn uống", amount: 640, percent: 8, color: "from-violet-500/70" },
  { name: "Di chuyển", amount: 410, percent: 5, color: "from-cyan-500/70" },
  { name: "Phong cách sống", amount: 970, percent: 13, color: "from-pink-500/70" },
  { name: "Đầu tư", amount: 1800, percent: 24, color: "from-amber-500/70" },
]

export const SpendingByCategoryChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Chi tiêu theo danh mục</CardTitle>
        <CardDescription>60 ngày gần nhất</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">{category.name}</span>
              <span className="text-muted-foreground">${category.amount.toLocaleString()} · {category.percent}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800/80">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${category.color} via-white/70 to-white/40`}
                style={{ width: `${category.percent}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
