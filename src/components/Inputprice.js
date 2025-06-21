import React, { useEffect } from 'react';
import Menu from './Menu'; // Adjust the import path as necessary
import axios from 'axios';
import { Baseurl } from './Baseurl'; // Uncomment if you need to use Baseurl

function InputPrice() {

    // State for main types
    const [mainTypes, setMainTypes] = React.useState([]);
    const [dataProducts, setDataProducts] = React.useState([]); // State for products if needed
    const [loading, setLoading] = React.useState(false);

    // Fetch main types from backend

    function selectmaintypesid(id) {
        console.log('selectmaintypesid function called' + id);
        setLoading(true);
        axios.get(`${Baseurl}/app_getmaintypes/${id}`)
            .then(response => {
                console.log('Fetched maintype data:', response.data);
                // You can set state here if you want to use the data
                setLoading(false);
                setDataProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching maintype by id:', error);
            });
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

    // State for date input
    const [date, setDate] = React.useState(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    });

    return (
        // <div className="w-screen h-screen flex flex-row bg-gray-100">
        <div className="flex flex-row bg-gray-100">
            <div className="w-64 bg-white shadow-md h-full">
                <Menu />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 h-full p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Input Price</h2>
                <div className="flex flex-row space-x-4 w-full">
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="price-date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="price-date"
                            name="price-date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                        <label className="block mb-2 text-sm font-medium text-gray-700 font-kanit font-normal" htmlFor="main-type" >
                            ประเภทหลัก
                        </label>
                        <select
                            id="main-type"
                            name="main-type"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => selectmaintypesid(e.target.value)}
                        >
                            <option value="">เลือกประเภท</option>
                            {mainTypes.map((type, index) => (
                                <option key={type.id_mtype} value={type.id_maintype}>
                                    {type.name_mtype}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-1 w-full mt-8 rounded-lg shadow-md bg-white p-4">
                    <div className="w-full">
                        <h3 className="text-lg font-semibold mb-4">Products</h3>
                        {loading ? (
                            <p>Loading products...</p>
                        ) : (
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        {/* <th className="py-2 px-4 border-b">Product ID</th> */}
                                        <th className="py-2 px-4 border-b">Product Name</th>
                                        <th className="py-2 px-4 border-b">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataProducts.map((product, index) => (
                                        <tr key={index}>
                                            {/* <td className="py-2 px-4 border-b">{product.id_prod}</td> */}
                                            <td className="py-2 px-4 border-b">{product.name_type}</td>
                                            <td className="py-2 px-4 border-b">
                                                <input
                                                    type="number"
                                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter price"
                                                    min="0"
                                                    step="0.01"
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            const next = document.querySelector(
                                                                `input[data-input-index='${index}-1']`
                                                            );
                                                            if (next) next.focus();
                                                        }
                                                    }}
                                                    data-input-index={`${index}-0`}
                                                />
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                <input
                                                    type="number"
                                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter price 2"
                                                    min="0"
                                                    step="0.01"
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            const next = document.querySelector(
                                                                `input[data-input-index='${index + 1}-0']`
                                                            );
                                                            if (next) next.focus();
                                                        }
                                                    }}
                                                    data-input-index={`${index}-1`}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputPrice;