import { useEffect } from "react";
import { useState } from "react";
import '../styles/ShowData.css';

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
                <ul className="barra-nav">
                    <li><button onClick={()=>setTypeData('users')} className={`${type === 'users' ? 'selected' : ''}`}>users</button></li>
                    <li><button onClick={()=>setTypeData('posts')} className={`${type === 'posts' ? 'selected' : ''}`}>posts</button></li>
                    <li><button onClick={()=>setTypeData('comments')} className={`${type === 'comments' ? 'selected' : ''}`}>comments</button></li>
                </ul>
            </nav>
            {
                isloading && <p>Cargando data ....</p>
            }
            {
                !isloading && (
                    <ul className="list-items">
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