import React from 'react';
import { formatDate } from '../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../store/slices/authSlice';
import { removeComment } from '../store/slices/commentSlice';

const CommentItem = ({ comment }) => {
  const { user } = useSelector(selectAuth);
  const isAdmin = user?.role === 'admin';
  const dispatch = useDispatch();
  const handleRemoveComment = () => {
    dispatch(removeComment(comment._id));
  };
  return (
    <li className="comments-device__item item-comment">
      <div className="item-comment__top">
        <div className="item-comment__content">
          <h4 className="item-comment__author">{comment.user.name}</h4>
          <p className="item-comment__date">{formatDate(comment.createdAt)}</p>
        </div>
        {(comment.user.id == user?.id || isAdmin) && (
          <button onClick={handleRemoveComment} className="item-comment__delete ">
            ×
          </button>
        )}
      </div>
      <p className="item-comment__text">{comment.text}</p>
    </li>
  );
};

export default CommentItem;
