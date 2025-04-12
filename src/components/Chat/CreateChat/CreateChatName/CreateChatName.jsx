import { useSelector, useDispatch } from "react-redux";
import { setChatDetails } from "../../../../store/Slices/chatsSlice";
import { CreateChatNameInput } from "../../../../ui/Inputs/CreateChatNameInput/CreateChatNameInput";

export const CreateChatName = () => {
  const dispatch = useDispatch();
  const chatName = useSelector((state) => state.chats.chatDetails.chatName);

  // Handle input change
  const handleChange = (event) => {
    dispatch(setChatDetails({ chatName: event.target.value }));
  };

  return (
    <CreateChatNameInput
      label="1. Choose a chat name"
      type="text"
      id="chatName"
      placeholder="Chat name"
      onChange={handleChange}
      value={chatName}
    />
  );
};
