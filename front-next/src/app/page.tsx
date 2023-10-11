import { Button } from '@/components/client/buttons';
import axios from 'axios';
import Header from '@/components/client/header';

export default async function Home() {

  console.log('message server');
  const restaurants = await getRestaurants();


  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify center">
      <Header />
      <div className="mb-32 text-center pt-32">
        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Добро пожаловать в HELP DESK!
          </h2>
        </div>
      </div>

    <Button/>
      <div>
            <ul>
            {restaurants && restaurants.data ? 
                restaurants.data.map((restaurant: any) => (
                <li key={restaurant.id}>{restaurant.attributes.name}</li>
            )) : <h3>Загрузка ...</h3>}
            </ul>
        </div>
    </main>
  )
}

async function getRestaurants () {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`,{
    withCredentials: false,
  });
  const restaurants = res.data;
  return restaurants;
}

