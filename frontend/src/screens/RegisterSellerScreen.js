import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { detailsUser, updateSellerUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import ProfileScreen from './ProfileScreen';

const RegisterSellerScreen = withRouter((props) => {


    //const [name, setName] = useState('');
    //const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    //const [isAdmin, setIsAdmin] = useState(false);
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    console.log(userDetails);
    const userId = userDetails.user._id;
    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/userlist');
        }
        if (!user) {
            dispatch(detailsUser(userId));
        } else {
            setIsSeller(user.isSeller);
            setSellerName(user.sellerName);
            setSellerLogo(user.sellerLogo);
            setSellerDescription(user.sellerDescription);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update user
        console.log(userId);
        console.log(props.match.params);
        dispatch(updateSellerUser({ _id: userId, sellerName, isSeller, sellerDescription }));
    };

    const element = <h1 style={{ color: 'white' }}>Become a Seller</h1>
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>{element}</h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                </div>
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <>
                                <h2>Seller Questionaire</h2>
                                <div>
                                    <label htmlFor="sellerName">Seller Name</label>
                                    <input
                                        id="sellerName"
                                        type="text"
                                        placeholder="Enter Seller Name"
                                        value={sellerName}
                                        onChange={(e) => setSellerName(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="sellerDescription">Seller Description</label>
                                    <input
                                        id="sellerDescription"
                                        type="text"
                                        placeholder="Enter Seller Description"
                                        value={sellerDescription}
                                        onChange={(e) => setSellerDescription(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="isSeller">Do you confirm to be a seller?</label>
                                    <input
                                        id="isSeller"
                                        type="checkbox"
                                        checked={isSeller}
                                        onChange={(e) => setIsSeller(e.target.checked)}
                                    ></input>
                                </div>
                                <div>
                                    <button type="submit" className="primary" onClick={event => window.location.href = '/profile'}
                                    >
                                        Become a Seller!
                                    </button>
                                </div>
                            </>
                        )}
            </form>
        </div>
    );
})

export default RegisterSellerScreen;