import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { createSellerReview, detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import ProductRating from '../components/ProductRating';
import { SELLER_REVIEW_CREATE_RESET } from '../constants/userConstants';


export default function SellerScreen(props) {
  const dispatch = useDispatch();
  const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const sellerReviewCreate = useSelector((state) => state.sellerReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = sellerReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  useEffect(() => {
    if (successReviewCreate) {

      setRating('');
      setComment('');
      dispatch({ type: SELLER_REVIEW_CREATE_RESET });
    }
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId, successReviewCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      if (userInfo.name === user.name) {
        alert('You cannot give yourself a review');
      }
      else {
        console.log("should not be here")
        dispatch(
          createSellerReview(sellerId, { rating, comment, name: userInfo.name })
        );
      }
    } else {
      alert('Please enter comment and rating');
    }
  };

  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <ul className="card card-body">
                <li>
                  <div className="row start">
                    <div className="p-1">
                      <img
                        className="small"
                        src={user.seller.logo}
                        alt={user.seller.name}
                      ></img>
                    </div>
                    <div className="p-1">
                      <h1>{user.seller.name}</h1>
                    </div>
                  </div>
                </li>
                <li>
                  <Rating
                    rating={user.seller.rating}
                    numReviews={user.seller.numReviews}
                  ></Rating>
                </li>
                <li>
                  <a href={`mailto:${user.email}`}>Contact Seller</a>
                </li>

                <li>{user.seller.description}</li>
                <div>
                  <h2 id="review">Reviews</h2>
                  {user.seller.reviews.length === 0 && (
                    <MessageBox>There is no review</MessageBox>
                  )}
                  <ul>
                    {user.seller.reviews.map((review) => (
                      <li key={review._id}>
                        <strong>{review.name}</strong>
                        <ProductRating rating={review.rating} caption=" "></ProductRating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                    <li>
                      {userInfo ? (
                        <form className="form" onSubmit={submitHandler}>
                          <div>
                            <h2>Write a customer review</h2>
                          </div>
                          <div>
                            <label htmlFor="rating">Rating</label>
                            <select
                              id="rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very good</option>
                              <option value="5">5- Excelent</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="comment">Comment</label>
                            <textarea
                              id="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </div>
                          <div>
                            <label />
                            <button className="primary" type="submit">
                              Submit
                      </button>
                          </div>
                          <div>
                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                            {errorReviewCreate && (
                              <MessageBox variant="danger">
                                {errorReviewCreate}
                              </MessageBox>
                            )}
                          </div>
                        </form>
                      ) : (
                          <MessageBox>
                            Please <Link to="/signin">Sign In</Link> to write a review
                          </MessageBox>
                        )}
                    </li>
                  </ul>
                </div>
              </ul>
            )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
              <>
                {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                <div className="row center">
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                </div>
              </>
            )}
      </div>
    </div>
  );
}
