import React, { useEffect, useState } from 'react';
import Preloader from '../../../shared/ui/Preloader';
import { CommentsList } from 'entities/Comment';
import { CommentService } from 'shared/api/CommentService';

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
