import React, { useEffect } from 'react';
import { Baseurl } from './Baseurl';
import axios from 'axios';
//
import Menu from './Menu';

function Home() {

    // const [username, setUsername] = useState('');
    const [mainTypes, setMainTypes] = React.useState([]);
    const [dataProducts, setDataProducts] = React.useState([]); // State for products if needed


    async function selectmaintypesid(id) {

        console.log('selectmaintypesid function called' + id);
      
        try {
            const response = await axios.get(`${Baseurl}/app_getmaintypes/${id}`);
            // You can set state here if you want to use the data
            // console.log('Fetched maintype data:', response.data);
        } catch (error) {
            console.error('Error fetching maintype by id:', error);
        }
    }

    useEffect(() => {
        axios.get(Baseurl + '/app_maintypes')
            .then(response => {
                setMainTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching main types:', error);
            });
    }, []);


    useEffect(() => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const iduserCookie = cookies.find(cookie => cookie.startsWith('iduser='));
        if (!iduserCookie) {
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
            <aside className="w-64 bg-white shadow-xl rounded-r-3xl flex flex-col">
                <Menu />
            </aside>
            <main className="flex-1 flex flex-col items-center justify-start py-12 px-10 border-l border-gray-200">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 drop-shadow-sm">List Price</h2>
                <div className="w-full">
                    <div className="flex flex-wrap gap-6 mb-10 justify-center">
                        {mainTypes.map((type) => (
                            <button
                                key={type.id}
                                className="px-8 py-4 bg-white rounded-2xl shadow-lg hover:bg-blue-100 hover:scale-105 transition-all border border-blue-200 text-blue-700 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                onClick={() => {
                                    selectmaintypesid(type.id);
                                }
                                }
                            >
                                {type.name_mtype}
                               
                                
                            </button>
                        ))}
                    </div>
                    {/* ส่วนอื่นๆ ของหน้า Home */}
                </div>
            </main>
        </div>
    );
}

export default Home;