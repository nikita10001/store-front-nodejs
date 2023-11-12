import React, { useEffect, useState } from 'react';
import star from '../assets/icons/star.svg';

import { Rating } from 'react-simple-star-rating';

import Preloader from '../components/UI/Preloader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDevice, selectDevices } from '../store/slices/deviceSlice';
import { addProductToCart } from '../store/slices/cartSlice';
import { selectAuth } from '../store/slices/authSlice';
import { fetchDevicesComments } from '../store/slices/commentSlice';
import CommentForm from '../components/CommentForm';
import CartIcon from '../components/icons/CartIcon';
import CommentsList from '../components/CommentsList';

// const tempImagesArray = [1, 2, 3];
const DevicePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading: deviceLoading, device } = useSelector(selectDevices);
  const { isLoading: commentsLoading, items } = useSelector((state) => state.comment);
  const { cart } = useSelector((state) => state.cart);
  const isInCart = cart?.some((item) => item._id === id);
  const { isAuth } = useSelector(selectAuth);
  useEffect(() => {
    dispatch(fetchSingleDevice(id));
    dispatch(fetchDevicesComments(id));
  }, []);

  const handleAddCart = (e) => {
    dispatch(addProductToCart(id));
  };

  if (deviceLoading) {
    return <Preloader />;
  }
  return (
    <div className="page__device device-page">
      <div className="device-page__container">
        <div className="device-page__block block-device">
          <div className="block-device__images images-device">
            <img src={device.img} alt="" />
          </div>
          <div className="block-device__content content-device">
            <h3 className="content-device__title">{device.name}</h3>
            <p className="content-device__descr">{device.description}</p>
            <div className="content-device__rating rating">
              <Rating size="22" readonly allowFraction initialValue={device.rating} />
              <span className="rating__info">{device.rating}</span>
            </div>
            <div className="content-device__footer">
              <div className="content-device__price">{device.price} р.</div>
            </div>
            <button disabled={isInCart} onClick={handleAddCart} className="content-device__btn btn">
              <CartIcon />
              <span>{isInCart ? 'Добавлено' : 'Добавить в коризину'}</span>
            </button>
          </div>
        </div>

        <CommentForm deviceId={id} isAuth={isAuth} />
        {commentsLoading ? (
          <Preloader /> //
        ) : (
          <CommentsList comments={items} />
        )}
      </div>
    </div>
  );
};

export default DevicePage;

{
  /* <div className="images-device__list">
              {tempImagesArray.map((image) => (
                <div //
                  key={image}
                  className={'images-device__item'}
                  style={{ backgroundImage: `url(${device.img})` }}
                />
              ))}
            </div> */
}
