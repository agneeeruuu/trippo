import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
    // react Hooks
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    // replaced with Redux
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    // a function to send ajax request to backend and fetch data from there
    // and a list of dependencies, there is no dependencies in this case
    useEffect(() => {
        // const fetchData = async () => {
        //     try { 
        //         setLoading(true);
        //         const { data } = await axios.get('/api/products');
        //         setLoading(false);
        //         setProducts(data);
        //     } catch(err) {
        //         setError(err.message);
        //         setLoading(false);
        //     }
           
        // };
        // fetchData();
        dispatch(listProducts());
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <LoadingBox ></LoadingBox>
            ) : error ? (
                <MessageBox  variant="danger">{error}</MessageBox>
            ) : (
            <div className="row center">
                {products.map((product) => (
                <Product key={product._id} product={product}></Product>
                ))}
            </div>
            )}
        </div>
    );
}
