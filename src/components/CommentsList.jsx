import React from 'react';
import CommentItem from './CommentItem';

const CommentsList = ({ comments }) => {
  if (!comments?.length) {
    return;
  }
  return (
    <div className="device-page__comments comments-device">
      <h4 className="comments-device__title">Отзывы</h4>
      <div className="comments-device__block">
        <ul className="comments-device__list">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentsList;
