'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IModifiendData {
    name: string,
    description: string,
    categories: any[],
}

const MakeRestaurant: React.FC = () => {

  const router = useRouter();

    useEffect(() => {
        const getAsyncData = async () => {
            const res = await axios.get('http://127.0.0.1:1337/api/categories');
            const categories = res.data;
            setAllCategories(categories)
        }
        getAsyncData();
    }, [])


    const [allCategories, setAllCategories] = useState<any>(null);
    const [modifiedData, setModifiedData] = useState<IModifiendData>({
        name: '',
        description: '',
        categories: [],
      });
      const [errorRestaurants, setErrorRestaurants] = useState(null);
    
      const handleChange = ({ target: { name, value } }: any) => {
        setModifiedData(prev => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e : any) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://127.0.0.1:1337/api/restaurants', {
            data: modifiedData,
          });
          console.log(response);
          router.push('/');
        } catch (error) {
         console.log(error);
        }
      };
    
      const renderCheckbox = (category: any) => {
        const { categories } = modifiedData;
        const isChecked = categories.includes(category.id);
        const handleCheckboxChange = () => {
          if (!categories.includes(category.id)) {
            handleChange({ target: { name: 'categories', value: categories.concat(category.id) } });
          } else {
            handleChange({
              target: { name: 'categories', value: categories.filter(v => v !== category.id) },
            });
          }
        };
        return (
          <div key={category.id}>
            <label htmlFor={category.id}>{category.attributes.name}</label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              name="categories"
              id={category.id}
            />
          </div>
        );
      };
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <h3>Restaurants</h3>
            <br />
            <label>
              Name:
              <input type="text" name="name" value={modifiedData.name} onChange={handleChange} />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={modifiedData.description}
                onChange={handleChange}
              />
            </label>
            <div>
              <br />
              <b>Select categories</b>
              <br />
              {allCategories && allCategories.data.map(renderCheckbox)}
            </div>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}

export default MakeRestaurant