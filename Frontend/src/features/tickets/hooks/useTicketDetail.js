import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  getTicketByIdApi,
  getAgentMessagesApi,
  agentReplyApi,
  getAISuggestionApi,
  updateTicketStatusApi,
  assignTicketApi,
} from '../services/ticket.service';
import {
  setActiveTicket,
  setActiveTicketMessages,
  appendMessage,
  setTicketDetailLoading,
  setMessagesLoading,
  setSending,
  setAiLoading,
  updateTicketStatus,
  clearActiveTicket,
} from '../state/ticketSlice';

const POLL_INTERVAL = 5000; // 5s polling for new messages

export const useTicketDetail = (ticketId) => {
  const dispatch = useDispatch();
  const {
    activeTicket,
    activeTicketMessages,
    ticketDetailLoading,
    messagesLoading,
    sending,
    aiLoading,
    fetchedTicketDetails,
    fetchedTicketMessages,
  } = useSelector((state) => state.tickets);
  const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

  const pollRef = useRef(null);
  const lastCountRef = useRef(0);

  const fetchTicket = useCallback(async (force = false) => {
    if (!ticketId) return;
    const cached = fetchedTicketDetails[ticketId];
    if (!force && cached && Date.now() - cached.timestamp < CACHE_TIME) {
      dispatch(setActiveTicket(cached.data));
      return;
    }
    try {
      dispatch(setTicketDetailLoading(true));
      const res = await getTicketByIdApi(ticketId);
      dispatch(setActiveTicket(res.data.data));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch ticket');
    } finally {
      dispatch(setTicketDetailLoading(false));
    }
  }, [dispatch, ticketId]);

  const fetchMessages = useCallback(async (silent = false, force = false) => {
    if (!ticketId) return;
    const cached = fetchedTicketMessages[ticketId];
    if (!force && !silent && cached && Date.now() - cached.timestamp < CACHE_TIME) {
      const msgs = cached.data;
      if (msgs.length !== lastCountRef.current) {
        lastCountRef.current = msgs.length;
        dispatch(setActiveTicketMessages(msgs));
      }
      return;
    }
    try {
      if (!silent) dispatch(setMessagesLoading(true));
      const res = await getAgentMessagesApi(ticketId);
      const msgs = res.data.data || [];
      // Only update if new messages arrived (avoids re-render flicker)
      if (msgs.length !== lastCountRef.current) {
        lastCountRef.current = msgs.length;
        dispatch(setActiveTicketMessages(msgs));
      }
    } catch (err) {
      if (!silent) toast.error(err.response?.data?.message || 'Failed to fetch messages');
    } finally {
      if (!silent) dispatch(setMessagesLoading(false));
    }
  }, [dispatch, ticketId]);

  // Start polling when hook mounts
  useEffect(() => {
    if (!ticketId) return;
    fetchTicket();
    fetchMessages();

    pollRef.current = setInterval(() => {
      fetchMessages(true); // silent poll
    }, POLL_INTERVAL);

    return () => {
      clearInterval(pollRef.current);
      dispatch(clearActiveTicket());
    };
  }, [ticketId, fetchTicket, fetchMessages, dispatch]);

  const sendReply = useCallback(
    async (message) => {
      if (!message.trim()) return false;
      try {
        dispatch(setSending(true));
        const res = await agentReplyApi(ticketId, message);
        dispatch(appendMessage(res.data.data));
        lastCountRef.current += 1;
        return true;
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to send reply');
        return false;
      } finally {
        dispatch(setSending(false));
      }
    },
    [dispatch, ticketId]
  );

  const fetchAISuggestion = useCallback(async () => {
    try {
      dispatch(setAiLoading(true));
      const res = await getAISuggestionApi(ticketId);
      return res.data.data?.suggestion || '';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate AI suggestion');
      return '';
    } finally {
      dispatch(setAiLoading(false));
    }
  }, [dispatch, ticketId]);

  const changeStatus = useCallback(
    async (status) => {
      try {
        await updateTicketStatusApi(ticketId, status);
        dispatch(updateTicketStatus({ ticketId, status }));
        toast.success(`Ticket marked as ${status}`);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to update status');
      }
    },
    [dispatch, ticketId]
  );

  const reassignTicket = useCallback(
    async (agentId) => {
      try {
        const res = await assignTicketApi(ticketId, agentId);
        dispatch(setActiveTicket(res.data.data));
        toast.success('Ticket reassigned successfully');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to reassign ticket');
      }
    },
    [dispatch, ticketId]
  );

  return {
    ticket: activeTicket,
    messages: activeTicketMessages,
    loading: ticketDetailLoading,
    messagesLoading,
    sending,
    aiLoading,
    fetchTicket,
    fetchMessages,
    sendReply,
    fetchAISuggestion,
    changeStatus,
    reassignTicket,
  };
};
