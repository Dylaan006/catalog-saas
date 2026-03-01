import { getProducts, getCategories } from '@/lib/data';
import { getStoreConfig } from '@/lib/store-config';
import { HomeView } from '@/components/home/home-view';


export default async function Home(props: {
  params: Promise<{ storeSlug: string }>;
  searchParams?: Promise<{ query?: string; category?: string; sort?: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const query = searchParams?.query || '';
  const category = searchParams?.category || '';
  const sort = searchParams?.sort || '';

  // 1. Fetch config based on storeSlug
  const config = await getStoreConfig(params.storeSlug);

  // 2. Fetch products and categories using the storeId from the config
  const storeId = config?.storeId || ''; // We need storeId, fallback to empty string if not found
  const products = await getProducts(storeId, query, category, sort);
  const categories = await getCategories(storeId);

  return (
    <HomeView
      storeSlug={params.storeSlug}
      products={products}
      categories={categories}
      config={config}
      query={query}
      category={category}
      sort={sort}
    />
  );
}
