import { useEffect } from "react";
import { useState } from "react";

function ShowData(){
    const API_URL = 'https://jsonplaceholder.typicode.com';

    const [items, setItems] = useState([]);
    const [isloading, setIsloading] = useState(true);
    const [type, setType] = useState('users');

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await fetch(`${API_URL}/${type}`);
            if (!response.ok) throw Error("Did not receive expected data");
            const listItems = await response.json();
            setItems(listItems);
          } catch (error) {
            console.log(error.message);
          } finally {
            setIsloading(false);
          }
        };

        fetchItems()
      }, [type]);

    const setTypeData = (data) => {
        setType(data);
    }

    return(
        <div>
            <nav>
                <ul>
                    <li><button onClick={()=>setTypeData('users')}>users</button></li>
                    <li><button onClick={()=>setTypeData('posts')}>posts</button></li>
                    <li><button onClick={()=>setTypeData('comments')}>comments</button></li>
                </ul>
            </nav>
            {
                isloading && <p>Cargando data ....</p>
            }
            {
                !isloading && (
                    <ul>
                        {
                            items.map((item)=>(
                                <li key={item.id}>{JSON.stringify(item)}</li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default ShowData;