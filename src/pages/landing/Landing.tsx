import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Button, Flex, Text, Tooltip } from "@mantine/core";
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
};


import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Landing: FC = () => {
  const navigate = useNavigate();

  function useGetUsers() {
    return useQuery<User[]>({
      queryKey: ['users'],
      queryFn: async () => {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();
        return data.users as User[];
      },
      refetchOnWindowFocus: false,
    });
  }
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 70
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 80

      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "address.address",
        header: "Address",
      },
      {
        accessorKey: "address.city",
        header: "City",
        size: 80

      },
      {
        accessorKey: "address.state",
        header: "State",
        size: 80

      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data:fetchedUsers,
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Tooltip label="View Details" withArrow>
        <ActionIcon color="red" onClick={() => navigate(`/home/${row.original.id}`)}>
          <IconEye />
        </ActionIcon>
      </Tooltip>
    ),
    mantineToolbarAlertBannerProps: isLoadingUsersError
    ? {
        color: 'red',
        children: 'Error loading data',
      }
    : undefined,
    mantineTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
  });


  return <MantineReactTable  table={table} />;
};

export default Landing;
