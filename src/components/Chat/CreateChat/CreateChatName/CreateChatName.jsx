import { useSelector, useDispatch } from "react-redux";
import { setChatDetails } from "../../../../store/Slices/chatsSlice";
import { CreateChatNameInput } from "../../../../ui/Inputs/CreateChatINameInput/CreateChatNameInput";

export const CreateChatName = () => {
  const dispatch = useDispatch();
  const chatName = useSelector((state) => state.chats.chatDetails.chatName);

  const handleChange = (event) => {
    dispatch(setChatDetails({ chatName: event.target.value }));
  };

  return (
    <CreateChatNameInput
      label="1. Придумайте название чата"
      type="text"
      id="chatName"
      placeholder="Название чата"
      onChange={handleChange}
      value={chatName}
    />
  );
};
