import create from 'zustand';

const useConversations = create((set) => ({
  selectedConversations: null,
  messages: [], 
  setSelectedConversations: (conversations) => set({ selectedConversations: conversations }),
  setMessages: (newMessages) => set({ messages: newMessages }), 
}));

export default useConversations;