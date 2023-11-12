import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { createComment } from '../store/slices/commentSlice';

const CommentForm = ({ deviceId, isAuth }) => {
  const dispatch = useDispatch();
  const [isComment, setIsComment] = useState();
  const [commentText, setCommentText] = useState();
  const [rating, setRating] = useState();
  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ deviceId, text: commentText }));
    setCommentText('');
    setIsComment(false);
  };
  return (
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
  );
};

export default CommentForm;
