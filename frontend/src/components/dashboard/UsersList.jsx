import React, { useContext } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AXIOS_INSTANCE from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/utils/apiPath";
import { UserContext } from "@/context/userContext";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log("User from global:", user.id);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AXIOS_INSTANCE.delete(
        API_ENDPOINTS.ADMIN.DELETE_USER(id)
      );
      if (response.status === 200) {
        toast.success(response.data.message || "User deleted successfully");
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      setError(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await AXIOS_INSTANCE.get(
        API_ENDPOINTS.ADMIN.GETALL_USERS
      );
      if (response.status === 200) {
        if (response.data.users) {
          const currentUser = response.data.users.find(
            (userID) => userID._id === user.id
          );
          if (currentUser) {
            setUsers(
              response.data.users.filter((user) => user._id !== currentUser._id)
            );
          } else {
            setUsers(response.data.users);
          }
        } else {
          toast.error(response.data.message || "No users found");
        }
      }
    };
    fetchUsers();
  }, []);
  return (
    <DashboardLayout activeMenu="Users">
      <div className="card">
        <h1 className="text-2xl font-bold mb-5">Users List</h1>

        <div className="flex justify-between items-center">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[100px] font-medium">
                  Username
                </TableHead>
                <TableHead className="font-medium">Email</TableHead>
                <TableHead className="font-medium">Role</TableHead>
                <TableHead className="text-right font-medium">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    <button
                      className="btn-primary"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersList;
