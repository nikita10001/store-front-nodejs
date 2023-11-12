import React, { useEffect, useState } from 'react';
import star from '../assets/icons/star.svg';

import { Rating } from 'react-simple-star-rating';

import Preloader from '../components/UI/Preloader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, fetchDevicesComments, fetchSingleDevice, selectDevices } from '../store/slices/deviceSlice';
import { addProductToCart } from '../store/slices/cartSlice';
import { selectAuth } from '../store/slices/authSlice';

function formatDate(dateStr) {
  const date = new Date(dateStr);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('ru-RU', options);
  return formattedDate;
}

// const tempImagesArray = [1, 2, 3];
const DevicePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, device, comments } = useSelector(selectDevices);
  const { isAuth } = useSelector(selectAuth);
  const [rating, setRating] = useState();
  const [isComment, setIsComment] = useState();
  const [commentText, setCommentText] = useState();

  useEffect(() => {
    dispatch(fetchSingleDevice(id));
    dispatch(fetchDevicesComments(id));
  }, []);

  const handleAddCart = (e) => {
    dispatch(addProductToCart(id));
  };

  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ deviceId: id, text: commentText }));
    setCommentText('');
    setIsComment(false);
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="page__device device-page">
      <div className="device-page__container">
        <div className="device-page__block block-device">
          <div className="block-device__images images-device">
            <img src={device.img} alt="" />
            {/* <div className="images-device__list">
              {tempImagesArray.map((image) => (
                <div //
                  key={image}
                  className={'images-device__item'}
                  style={{ backgroundImage: `url(${device.img})` }}
                />
              ))}
            </div> */}
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
            <button onClick={handleAddCart} className="content-device__btn btn">
              <svg width="20" height="22" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.65214 2.24957H0V0.749573H4.65214C6.00406 0.749573 7.15546 1.73221 7.36796 3.06732L7.99688 7.01882H29.7121C30.8545 7.01882 31.6906 8.09558 31.4076 9.20234L29.5067 16.6364C29.0823 18.2963 27.5869 19.4574 25.8736 19.4574H9.9766L10.3874 22.0383C10.484 22.6452 11.0073 23.0918 11.6218 23.0918H28.203V24.5918H11.6218C10.2699 24.5918 9.11852 23.6092 8.90602 22.2741L5.8866 3.3031C5.79002 2.69623 5.26665 2.24957 4.65214 2.24957ZM9.73786 17.9574H25.8736C26.9016 17.9574 27.7988 17.2607 28.0535 16.2648L29.9543 8.83075C29.9948 8.67264 29.8753 8.51882 29.7121 8.51882H8.23562L9.73786 17.9574Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.5695 31.8258C14.3183 31.8258 15.0189 31.1799 15.0189 30.2656C15.0189 29.3513 14.3183 28.7054 13.5695 28.7054C12.8207 28.7054 12.1201 29.3513 12.1201 30.2656C12.1201 31.1799 12.8207 31.8258 13.5695 31.8258ZM13.5695 33.3258C15.1984 33.3258 16.5189 31.9557 16.5189 30.2656C16.5189 28.5755 15.1984 27.2054 13.5695 27.2054C11.9406 27.2054 10.6201 28.5755 10.6201 30.2656C10.6201 31.9557 11.9406 33.3258 13.5695 33.3258Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.5466 31.8258C27.2954 31.8258 27.996 31.1799 27.996 30.2656C27.996 29.3513 27.2954 28.7054 26.5466 28.7054C25.7977 28.7054 25.0972 29.3513 25.0972 30.2656C25.0972 31.1799 25.7977 31.8258 26.5466 31.8258ZM26.5466 33.3258C28.1755 33.3258 29.496 31.9557 29.496 30.2656C29.496 28.5755 28.1755 27.2054 26.5466 27.2054C24.9177 27.2054 23.5972 28.5755 23.5972 30.2656C23.5972 31.9557 24.9177 33.3258 26.5466 33.3258Z"
                  fill="white"
                />
              </svg>
              <span>Добавить в корзину</span>
            </button>
          </div>
        </div>

        <div className="device-page__leave leave-comment">
          {!isComment ? (
            isAuth && (
              <button onClick={() => setIsComment(true)} className="btn outline">
                Оставить отзыв
              </button>
            )
          ) : (
            <div className="leave-comment__block">
              <form className="leave-comment__form" action="" onSubmit={handleAddComment}>
                <p className="leave-comment__subtitle">Отзыв:</p>
                <textarea
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                  className="leave-comment__textarea input"
                  placeholder="Введите текст"
                  rows={10}
                  type="text"
                />
                <div className="leave-comment__rating">
                  <Rating size="23" allowFraction />
                </div>

                <button className="btn outline">Отправить</button>
              </form>
            </div>
          )}
        </div>
        {comments?.isLoading ? (
          <Preloader />
        ) : (
          comments.items.length != 0 && (
            <div className="device-page__comments comments-device">
              <h4 className="comments-device__title">Отзывы</h4>
              <div className="comments-device__block">
                <ul className="comments-device__list">
                  {comments?.items.map((comment) => (
                    <li key={comment._id} className="comments-device__item item-comment">
                      <div className="item-comment__top">
                        <h4 className="item-comment__author">{comment.user.name}</h4>
                        <p className="item-comment__date">{formatDate(comment.createdAt)}</p>
                      </div>
                      <p className="item-comment__text">{comment.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DevicePage;
