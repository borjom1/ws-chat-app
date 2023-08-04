import {createSlice} from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    stompClient: null,
    chats: [],
    selectedChat: null
  },
  reducers: {
    updateChat: ({chats}, {payload: {senderId, login, newMessage}}) => {

      const foundChat = chats.find(chat => chat.userId === senderId);

      if (!foundChat) {
        chats.push({
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
  }
});

export const {updateChat, addMessage, selectChat, setStompClient} = chatSlice.actions;
export default chatSlice.reducer;