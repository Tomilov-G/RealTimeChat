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

  // Fetch users if not loaded
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, []);

  // Filter users based on search query
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().startsWith(searchUser.toLowerCase()) ||
          user.phone.includes(searchUser)
      ),
    [users, searchUser]
  );

  // Handle search input change
  const handleSearchUser = useCallback((event) => {
    setSearchUser(event.target.value.trim());
  }, []);

  // Toggle user selection
  const handleToggleUser = (user) => {
    dispatch(toggleSelectedUser(user));
  };

  return (
    <>
      <SearchUserInput
        label="3. Select chat participants"
        id="searchUsers"
        placeholder="Search by name or phone"
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
