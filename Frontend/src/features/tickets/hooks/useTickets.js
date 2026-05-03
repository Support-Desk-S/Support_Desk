import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getTicketsApi } from '../services/ticket.service';
import { setTickets, setTicketsLoading, setActiveFilter, appendTickets } from '../state/ticketSlice';
import toast from 'react-hot-toast';

export const useTickets = () => {
  const dispatch = useDispatch();
  const { tickets, loading, activeFilter, total, lastFetchedTickets } = useSelector((state) => state.tickets);
  const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

  const fetchTickets = useCallback(async (params = {}, force = false) => {
    if (!force && lastFetchedTickets && Date.now() - lastFetchedTickets < CACHE_TIME) return;
    try {
      dispatch(setTicketsLoading(true));
      const res = await getTicketsApi(params);
      // Backend returns: { data: { tickets: [...], total: N, page: N, totalPages: N } }
      const result = res.data.data;
      const ticketsArray = Array.isArray(result) ? result : result?.tickets ?? [];
      const total = result?.total ?? ticketsArray.length;
      dispatch(setTickets({ tickets: ticketsArray, total }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch tickets');
    } finally {
      dispatch(setTicketsLoading(false));
    }
  }, [dispatch]);

  const loadMoreTickets = useCallback(async (params = {}) => {
    try {
      const res = await getTicketsApi(params);
      const result = res.data.data;
      const ticketsArray = Array.isArray(result) ? result : result?.tickets ?? [];
      const total = result?.total ?? ticketsArray.length;
      dispatch(appendTickets({ tickets: ticketsArray, total }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load more tickets');
    }
  }, [dispatch]);


  const changeFilter = (filter) => {
    dispatch(setActiveFilter(filter));
  };

  return {
    tickets,
    loading,
    activeFilter,
    total,
    fetchTickets,
    loadMoreTickets,
    changeFilter,
  };
};
