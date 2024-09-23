import useAxios from "#/helpers/hook/use-axios";
import React, { Key, useCallback, useEffect, useState } from "react";
import { Metadata, UserData, UserResponse } from "../util";
import { AxiosResponse } from "axios";
import { useDisclosure } from "@nextui-org/react";

/**
 * Custom hook for managing user table data and behaviors.
 * @returns An object containing users, metadata, loading state, selected item, visibility state, and related functions.
 */
const useTableCustom = () => {
  const axiosRequest = useAxios();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [item, setItem] = useState<UserData | null>(null);

  const [users, setUsers] = useState<UserData[]>([]);
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    pageSize: 1,
    total: 0,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(true);

  const INITIAL_VISIBLE_COLUMNS = [
    { key: "names", label: "Nombres y apellidos" },
    { key: "email", label: "Correo electrónico" },
    { key: "phone", label: "Número telefónico" },
    { key: "actions", label: "Acciones" }
  ];

  /**
   * Fetches users from the API based on the specified page number.
   * @param page - The page number to fetch.
   */
  const loadUsers = async (page: number) => {
    setIsLoading(true);
    try {
      const res: AxiosResponse<UserResponse> = await axiosRequest(
        `/user?page=${page}&pageSize=${metadata.pageSize}`
      );
      const { status, data } = res;

      if (status === 200) {
        setUsers(data.users);
        setMetadata(data.metadata);
      }
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Renders the content of a table cell based on the column key.
   * @param user - The user data for the current row.
   * @param columnKey - The key of the column being rendered.
   * @returns A React node representing the cell content.
   */
  const renderCell = useCallback(
    (user: UserData, columnKey: Key) => {
      switch (columnKey) {
        case "names":
          return <span className="font-semibold text-sm">{`${user.names} ${user.surnames}`}</span>;
        case "email":
          return <span>{user.email}</span>;
        case "phone":
          return <span>{user.phone}</span>;
        case "actions":
          return (
            <span
              className="text-sm text-[#2754F7] underline font-semibold"
              onClick={() => {
                setItem(user);
                onOpen();
              }}
            >
              Ver detalle
            </span>
          );
        default:
          break;
      }
    },
    [onOpen]
  );

  /* eslint-disable */
  useEffect(() => {
    void (async () => loadUsers(1))();
  }, []);

  /* eslint-enable */
  return {
    INITIAL_VISIBLE_COLUMNS,
    users,
    metadata,
    isLoading,
    item,
    isOpen,
    renderCell,
    loadUsers,
    onOpenChange
  };
};

export { useTableCustom };
