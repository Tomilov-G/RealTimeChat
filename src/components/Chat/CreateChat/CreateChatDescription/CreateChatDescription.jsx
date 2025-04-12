import { useSelector, useDispatch } from "react-redux";
import { setChatDetails } from "../../../../store/Slices/chatsSlice";
import { CreateChatDescriptionTextArea } from "../../../../ui/TextArea/CreateChatDescriptionTextArea/CreateChatDescriptionTextArea";

export const CreateChatDescription = () => {
  const dispatch = useDispatch();
  const chatDescription = useSelector(
    (state) => state.chats.chatDetails.chatDescription
  );

  const handleChange = (event) => {
    dispatch(setChatDetails({ chatDescription: event.target.value }));
  };
  return (
    <CreateChatDescriptionTextArea
      label="2. Придумайте описание чата"
      id="chatDescription"
      placeholder="Описание чата"
      value={chatDescription}
      onChange={handleChange}
    />
  );
};
