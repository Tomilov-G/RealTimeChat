import { useSelector, useDispatch } from "react-redux";
import { setChatDetails } from "../../../../store/Slices/chatsSlice";
import { CreateChatDescriptionTextArea } from "../../../../ui/TextArea/CreateChatDescriptionTextArea/CreateChatDescriptionTextArea";

export const CreateChatDescription = () => {
  const dispatch = useDispatch();
  const chatDescription = useSelector(
    (state) => state.chats.chatDetails.chatDescription
  );

  // Handle input change
  const handleChange = (event) => {
    dispatch(setChatDetails({ chatDescription: event.target.value }));
  };
  return (
    <CreateChatDescriptionTextArea
      label="2. Write a chat description"
      id="chatDescription"
      placeholder="Chat description"
      value={chatDescription}
      onChange={handleChange}
    />
  );
};
