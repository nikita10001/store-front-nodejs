import React, { useEffect, useState } from 'react';
import { CommentService } from '../../../api/CommentService';
import Preloader from '../../../components/UI/Preloader';
import CommentsList from '../../../components/CommentsList';

export const AdminComments = () => {
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const fetched = await CommentService.getAllComments();
      setItems(fetched);
    } catch (error) {
      console.log(error.message);
    } finally {
      setCommentsLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="page__admin admin-comments">
      <div className="admin-comments__container">
        {commentsLoading ? (
          <Preloader /> //
        ) : (
          <CommentsList comments={items} />
        )}
      </div>
    </div>
  );
};
