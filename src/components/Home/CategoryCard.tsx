import { ReactElement } from "react";
// import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  title: string;
  icon?: ReactElement;
  onClick?: () => void;
}

export default function CategoryCard({ title, icon, onClick }: CategoryCardProps) {
  return (
    <div
      className="flex flex-col items-center py-2 px-2 max-w-[20px]; bg-white shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={e => { if (e.key === 'Enter' && onClick) onClick(); }}
    >
      <div className="text-4xl text-gray-500 mb-2">{icon}</div>
      <h2 className="text-sm font-semibold text-gray-700 text-center">{title}</h2>
    </div>
  );
}
