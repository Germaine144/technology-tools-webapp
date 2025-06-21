import { ReactElement } from "react";
import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  title: string;
  icon?: ReactElement;
}

export default function CategoryCard({ title, icon }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center p-4 max-w-[20px]; bg-white shadow-md rounded-lg hover:shadow-lg transition">
      <div className="text-4xl text-gray-500 mb-2">{icon}</div>
      <h2 className="text-sm font-semibold text-gray-700 text-center">{title}</h2>
    </div>
  );
}
