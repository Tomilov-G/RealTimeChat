import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./JoinToChats.module.scss";
import { socket } from "../../../../socket";
import {
  resetSelectedJoinChats,
  toggleSelectedJoinChat,
  updateChat,
  setSelectedChat,
} from "../../../../store/Slices/chatsSlice";
import { FormButton } from "../../../../ui/Buttons/FormButton/FormButton";

export const JoinToChats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allChats = useSelector((state) => state.chats.allChats) || [];
  const selectedJoinChats =
    useSelector((state) => state.chats.selectedJoinChats) || [];
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    // Request all chats from the server
    socket.emit("getAllChats");

    // Handle receiving all chats
    socket.on("allChats", (chats) => {
      console.log("Received all chats:", chats);
      dispatch({ type: "chats/setAllChats", payload: chats });
    });

    // Handle successful joining of chats
    socket.on("joinedChats", (updatedChats) => {
      console.log("Successfully joined chats:", updatedChats);
      // Update createdChats for each joined chat
      updatedChats.forEach((chat) => {
        console.log("Adding chat to createdChats:", chat);
        dispatch(updateChat(chat));
      });
      // Select the last joined chat
      if (updatedChats.length > 0) {
        dispatch(setSelectedChat(updatedChats[updatedChats.length - 1]));
      }
      dispatch(resetSelectedJoinChats());
      navigate("/chat");
    });

    // Handle server errors
    socket.on("error", (error) => {
      console.error("Error joining chats:", error.message);
      alert(`Error: ${error.message}`);
    });

    // Cleanup socket listeners
    return () => {
      socket.off("allChats");
      socket.off("joinedChats");
      socket.off("error");
    };
  }, [dispatch, navigate]);

  // Filter chats to exclude those the user is already in
  const availableChats = allChats.filter(
    (chat) => !chat.users.some((user) => user.id === currentUser?.email)
  );
  const filteredChats = availableChats.filter((chat) =>
    chat.chatName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle joining selected chats
  const handleJoinChats = () => {
    if (!selectedJoinChats.length) {
      alert("Select at least one chat!");
      return;
    }
    if (!currentUser?.email || !currentUser?.name) {
      alert("Error: user not authenticated");
      return;
    }

    const joinData = {
      chatIds: selectedJoinChats,
      user: { id: currentUser.email, name: currentUser.name },
    };
    console.log("Sending joinChats:", joinData);
    socket.emit("joinChats", joinData);
  };

  return (
    <div className={classes.joinToChats}>
      <h2 className={classes.title}>Join a Chat</h2>
      <input
        type="text"
        placeholder="Search chats..."
        value={searchQuery}
        className={classes.input}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul className={classes.chatList}>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <li key={chat.id} className={classes.chatItem}>
              <label>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  checked={selectedJoinChats.includes(chat.id)}
                  onChange={() => dispatch(toggleSelectedJoinChat(chat.id))}
                />
                {chat.chatName} ({chat.users.length} participants)
              </label>
            </li>
          ))
        ) : (
          <p>No chats available to join</p>
        )}
      </ul>
      <FormButton
        onClick={handleJoinChats}
        buttonText="Join"
        className={classes.button}
      />
    </div>
  );
};
