import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../../api/usersThunk";
import { toggleSelectedUser } from "../../../../store/Slices/usersSlice";
import { SearchUserInput } from "../../../../ui/Inputs/SearchUserInput/SearchUserInput";
import { SelectChatUsersList } from "./SelectChatUsersList/SelectChatUsersList";

export const AddChatUsers = () => {
  const [searchUser, setSearchUser] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, []);
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().startsWith(searchUser.toLowerCase()) ||
          user.phone.includes(searchUser)
      ),
    [users, searchUser]
  );

  const handleSearchUser = useCallback((event) => {
    setSearchUser(event.target.value.trim());
  }, []);

  const handleToggleUser = (user) => {
    dispatch(toggleSelectedUser(user));
  };

  return (
    <>
      <SearchUserInput
        label="3. Выбрать участников чата"
        id="searchUsers"
        placeholder="Поиск по имени или номеру"
        type="text"
        value={searchUser}
        onChange={handleSearchUser}
      />
      {searchUser !== "" && (
        <SelectChatUsersList
          users={filteredUsers}
          onToggleUser={handleToggleUser}
        />
      )}
    </>
  );
};
