import React, { useEffect } from "react";
import { HistoryCard } from "../../Components/HistoryCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchHistory } from "../../actions/UserAction";

export const History = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.history);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (error) {
      toast.error(error);
    }
    dispatch(fetchHistory());
  }, []);

  return (
    <div className="p-10 ">
      {loading && loading ? (
        <>
          <p className="mt-24"> Nothing Here to show,Please watch the videos</p>
        </>
      ) : (
        <>
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
        </>
      )}
    </div>
  );
};
