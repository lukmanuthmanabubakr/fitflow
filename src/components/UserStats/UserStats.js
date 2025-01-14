import React, { useEffect, useState } from "react";
import InfoBox from "../InfoBox/InfoBox";
import Search from "../Search/Search";
import "./UserStats.css";
import { FaTrashAlt } from "react-icons/fa";
import ChangeRole from "../ChangeRole/ChangeRole";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/features/auth/authSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { shortenText } from "../../Pages/Profile/UserProfile/UserProfile";
import Loader from "../Loader/Loader";
import { FILTER_USERS, selectUsers } from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";


const UserStats = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const filteredUsers = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to do delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  return (
    <>
    {isLoading && <Loader />}
      <div className="userStats">
      <InfoBox />

      <>
      {isLoading && <Loader />}
      <div className="UserList">
        <div className="userCon">
          <h2>All Users</h2>
          <Search 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {!isLoading && users.length === 0 ? (
          <p>No user found...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => {
                const { _id, name, email, role } = user;

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{shortenText(name, 8)}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td>
                      <ChangeRole _id={_id} email={email} />
                    </td>
                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color="red"
                          onClick={() => confirmDelete(_id)}
                          style={{cursor: "pointer"}}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <hr />
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="activePage"
          />
      </div>
      </>
    </div>
    </>
  );
};

export default UserStats;
