// src/app/products/[id]/page.tsx
import ProductDetailsPage from "@/components/Home/ProductDetailsPage";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductDetailsPage productId={id} />;
}

// Alternative: If you prefer to handle the Promise in the component
// export default function ProductPage({ params }: ProductPageProps) {
//   return <ProductDetailsPageWrapper params={params} />;
// }

// If you're using pages directory instead of app directory:
// import { useRouter } from 'next/router';
// import ProductDetailsPage from '@/components/ProductDetailsPage';
// 
// export default function ProductPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   
//   return <ProductDetailsPage productId={id} />;
// }