import { getProducts, getCategories } from '@/lib/data';
import { getStoreConfig } from '@/lib/store-config';
import { HomeView } from '@/components/home/home-view';


export default async function Home(props: {
  searchParams?: Promise<{ query?: string; category?: string; sort?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';
  const sort = searchParams?.sort || '';

  const products = await getProducts(query, category, sort);
  const categories = await getCategories();
  const config = await getStoreConfig();

  return (
    <HomeView
      products={products}
      categories={categories}
      config={config}
      query={query}
      category={category}
      sort={sort}
    />
  );
}
