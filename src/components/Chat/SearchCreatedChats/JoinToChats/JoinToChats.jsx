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
    socket.emit("getAllChats");

    socket.on("allChats", (chats) => {
      console.log("Получены все чаты:", chats);
      dispatch({ type: "chats/setAllChats", payload: chats });
    });

    socket.on("joinedChats", (updatedChats) => {
      console.log("Успешно присоединились к чатам:", updatedChats);
      // Обновляем createdChats для каждого присоединённого чата
      updatedChats.forEach((chat) => {
        console.log("Добавляем чат в createdChats:", chat);
        dispatch(updateChat(chat));
      });
      // Выбираем последний присоединённый чат
      if (updatedChats.length > 0) {
        dispatch(setSelectedChat(updatedChats[updatedChats.length - 1]));
      }
      dispatch(resetSelectedJoinChats());
      navigate("/chat");
    });

    socket.on("error", (error) => {
      console.error("Ошибка при присоединении:", error.message);
      alert(`Ошибка: ${error.message}`);
    });

    return () => {
      socket.off("allChats");
      socket.off("joinedChats");
      socket.off("error");
    };
  }, [dispatch, navigate]);

  // Фильтруем чаты, исключая те, в которых пользователь уже состоит
  const availableChats = allChats.filter(
    (chat) => !chat.users.some((user) => user.id === currentUser?.email)
  );
  const filteredChats = availableChats.filter((chat) =>
    chat.chatName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinChats = () => {
    if (!selectedJoinChats.length) {
      alert("Выберите хотя бы один чат!");
      return;
    }
    if (!currentUser?.email || !currentUser?.name) {
      alert("Ошибка: пользователь не авторизован");
      return;
    }

    const joinData = {
      chatIds: selectedJoinChats,
      user: { id: currentUser.email, name: currentUser.name },
    };
    console.log("Отправка joinChats:", joinData);
    socket.emit("joinChats", joinData);
  };

  return (
    <div className={classes.joinToChats}>
      <h2 className={classes.title}>Присоединиться к чату</h2>
      <input
        type="text"
        placeholder="Поиск чатов..."
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
                {chat.chatName} ({chat.users.length} участников)
              </label>
            </li>
          ))
        ) : (
          <p>Нет доступных чатов для присоединения</p>
        )}
      </ul>
      <FormButton
        onClick={handleJoinChats}
        buttonText="Присоединиться"
        className={classes.button}
      />
    </div>
  );
};
