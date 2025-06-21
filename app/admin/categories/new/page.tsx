import { CategoryForm } from "../category-form";

export default function NewCategoryPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Новая категория</h1>
            <CategoryForm />
        </div>
    );
} 