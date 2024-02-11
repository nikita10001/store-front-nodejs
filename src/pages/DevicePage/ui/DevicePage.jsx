import React, { useEffect, useState } from 'react';

import { Rating } from 'react-simple-star-rating';

import Preloader from '../../../components/UI/Preloader';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDevice, selectSingleDevice } from '../../../store/slices/deviceSlice';
import { addProductToCart } from '../../../store/slices/cartSlice';
import { selectAuth } from '../../../store/slices/authSlice';
import { fetchDevicesComments } from '../../../store/slices/commentSlice';
import CommentForm from '../../../components/CommentForm';
import CommentsList from '../../../components/CommentsList';

import { ROUTE_PATHS } from 'shared/config/router';

import { ReactComponent as CartIcon } from 'shared/assets/icons/cart-icon.svg';

import 'react-tabs/style/react-tabs.css';
import DeviceInfoList from '../../../components/DeviceInfoList';

// const tempImagesArray = [1, 2, 3];
export const DevicePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading: deviceLoading, item: device } = useSelector(selectSingleDevice);
  const { isLoading: commentsLoading, items } = useSelector((state) => state.comment);

  const { cart } = useSelector((state) => state.cart);
  const isInCart = cart?.some((item) => item._id === id);
  const { isAuth } = useSelector(selectAuth);

  //temp tabs logic
  const tabsItems = ['Отзывы', 'Характеристики'];
  const [activeTab, setActiveTab] = useState(0);
  ///

  useEffect(() => {
    dispatch(fetchSingleDevice(id));
    dispatch(fetchDevicesComments(id));
  }, []);

  const handleAddCart = (e) => {
    if (!isAuth) {
      navigate(ROUTE_PATHS.LOGIN);
      return;
    }
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
            {device?.brand && <p className="content-device__descr">Производитель: {device?.brand.name}</p>}
            <div className="content-device__rating rating">
              <Rating size="22" readonly allowFraction initialValue={device.rating} />
              <span className="rating__info">{device.rating.toFixed(1)}</span>
            </div>
            <div className="content-device__footer">
              <div className="content-device__price">{device.price} р.</div>
            </div>
            <button disabled={isInCart} onClick={handleAddCart} className="content-device__btn btn">
              <CartIcon className={'cart-icon'} />
              <span>{isInCart ? 'Добавлено' : 'Добавить в корзину'}</span>
            </button>
          </div>
        </div>
        <div className="device-page__tabs tabs-device">
          <div className="tabs-device__menu">
            {tabsItems.map((tab, i) => (
              <div //
                key={i}
                onClick={() => setActiveTab(i)}
                className={`tabs-device__item ${activeTab == i ? 'active' : ''}`}
              >
                {tab}
              </div>
            ))}
          </div>
          {activeTab == 0 ? (
            <div className="tabs-device__tab">
              <CommentForm deviceId={id} isAuth={isAuth} />
              {commentsLoading ? (
                <Preloader /> //
              ) : (
                <CommentsList comments={items} />
              )}
            </div>
          ) : (
            <div className="tabs-device__tab">
              <div className="device-page__info info-device">
                <DeviceInfoList list={device.characteristics} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
