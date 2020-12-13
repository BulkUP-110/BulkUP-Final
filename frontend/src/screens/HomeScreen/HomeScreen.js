import React, { useEffect } from 'react';

import Product from '../../components/Product';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import "./HomeScreen.css";
import Featured from '../../components/Featured';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <>
      <div className="marketplace-bar">
        <div className="row center">
          <h1 className="bar-title">MARKETPLACE</h1>
        </div>
      </div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <>

                <div className="row center" style={{ margin: "2rem" }}>
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                </div>
              </>
            )}
      </div>
    </>
  );
}
