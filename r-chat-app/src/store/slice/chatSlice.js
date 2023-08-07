import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import env from 'react-dotenv';
import {getUser, setUser} from "../../utils/localStorage";
import {getTime} from "../../utils/dateParser";
import {useNavigate} from "react-router-dom";

export const getDuoChats = createAsyncThunk(
  'chat/getDuoChats',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${env.API_URL}/user/chats`, {
        headers: {
          Authorization: `Bearer ${getUser().access}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    stompClient: null,
    chats: [],
    selectedChat: null,
    isRequestRejected: false
  },
  reducers: {
    setChats: (state, {payload: {targetChats}}) => {
      state.chats = targetChats;
    },
    updateChat: ({chats}, {payload: {senderId, login, newMessage}}) => {

      const foundChat = chats.find(chat => chat.userId === senderId);

      if (!foundChat) {
        chats.push({
          username: 'Unknown',
          userId: senderId,
          login,
          messages: [newMessage]
        });
      } else {
        foundChat.messages.push(newMessage);
      }
    },
    addMessage: ({chats}, {payload: {destinationUserId, newMessage}}) => {

      const foundChat = chats.find(chat => chat.userId === destinationUserId);
      if (foundChat) {
        foundChat.messages.push(newMessage);
      }
    },
    selectChat: (state, {payload: userId}) => {
      state.selectedChat = userId;
    },
    setStompClient: (state, {payload: newStompClient}) => {
      state.stompClient = newStompClient;
    }
  },
  extraReducers: {
    [getDuoChats.rejected]: (state) => {
      console.log('getDuoChats.rejected')
      state.isRequestRejected = true;
      state.chats = [];
      setUser(null);

      const navigate = useNavigate();
      navigate('/sign_in');
    },
    [getDuoChats.fulfilled]: (state, {payload: retrievedChats}) => {
      state.isRequestRejected = false;
      state.chats = retrievedChats.map(chat => {
        const {lastMessage: {timestamp, senderId, senderLogin}} = chat;

        return {
          username: chat.name,
          userId: senderId,
          login: senderLogin,
          messages: [{
            id: timestamp,
            text: chat.lastMessage.text,
            time: getTime(new Date(timestamp)),
            isOwn: senderId === getUser().id
          }]
        };
      });
    }
  }
});

export const {updateChat, addMessage, selectChat, setStompClient} = chatSlice.actions;
export default chatSlice.reducer;