import React, { useEffect, useState } from 'react';

import { Rating } from 'react-simple-star-rating';

import Preloader from '../components/UI/Preloader';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDevice, selectSingleDevice } from '../store/slices/deviceSlice';
import { addProductToCart } from '../store/slices/cartSlice';
import { selectAuth } from '../store/slices/authSlice';
import { fetchDevicesComments } from '../store/slices/commentSlice';
import CommentForm from '../components/CommentForm';
import CartIcon from '../components/icons/CartIcon';
import CommentsList from '../components/CommentsList';
import { ROUTE_PATHS } from '../router';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DeviceInfoList from '../components/DeviceInfoList';

// const tempImagesArray = [1, 2, 3];
const DevicePage = () => {
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
  const infoList = [
    {
      id: 1,
      label: 'Тип',
      text: 'Телевизор',
    },
    {
      id: 2,
      label: 'Диагональ',
      text: '50',
    },
    {
      id: 3,
      label: 'Соотношение сторон экрана',
      text: '16:9',
    },
    {
      id: 4,
      label: 'Цвет корпуса',
      text: 'серый',
    },
    {
      id: 5,
      label: 'Интерактивное управление',
      text: 'голосове',
    },
    {
      id: 6,
      label: 'Вес',
      text: '10 кг.',
    },
    {
      id: 7,
      label: 'Ширина',
      text: '2 м.',
    },
    {
      id: 7,
      label: 'Высота',
      text: '100 см.',
    },
  ];
  ////

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
            <div className="content-device__rating rating">
              <Rating size="22" readonly allowFraction initialValue={device.rating} />
              <span className="rating__info">{device.rating.toFixed(1)}</span>
            </div>
            <div className="content-device__footer">
              <div className="content-device__price">{device.price} р.</div>
            </div>
            <button disabled={isInCart} onClick={handleAddCart} className="content-device__btn btn">
              <CartIcon />
              <span>{isInCart ? 'Добавлено' : 'Добавить в корзину'}</span>
            </button>
          </div>
        </div>
        <div className="device-page__tabs tabs-device">
          <div className="tabs-device__menu">
            {tabsItems.map((tab, i) => (
              <div key={i} onClick={() => setActiveTab(i)} className={`tabs-device__item ${activeTab == i ? 'active' : ''}`}>
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
                <DeviceInfoList list={infoList} />
              </div>
            </div>
          )}
        </div>
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
