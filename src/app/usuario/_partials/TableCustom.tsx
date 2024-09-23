import React from "react";
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { UserData } from "./util";
import { useTableCustom } from "./hook/use-tableCustom";
import ModalCustom from "./modalCustom";

const TableCustom = () => {
  const {
    INITIAL_VISIBLE_COLUMNS,
    metadata,
    users,
    isLoading,
    item,
    isOpen,
    renderCell,
    loadUsers,
    onOpenChange
  } = useTableCustom();

  return (
    <div className="overflow-x-auto min-h-[calc(100vh-14.5rem)]">
      <Table
        aria-label="Example table with user side pagination"
        selectionMode="single"
        removeWrapper
        classNames={{
          th: ["bg-transparent text-[16px] font-normal"],

          td: [
            "border-b before:bg-white data-[selected=true]:!text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-[#F2F4FF]"
          ]
        }}
        bottomContent={
          <div className="py-2 px-4 flex justify-end items-center">
            <Pagination
              showControls
              showShadow
              isCompact
              page={metadata.page}
              total={metadata.totalPages}
              onChange={(page) => loadUsers(page)}
              color="default"
              variant="light"
              classNames={{
                cursor: "!bg-white !shadow-none rounded border border-primary font-semibold"
              }}
            />
          </div>
        }
        bottomContentPlacement="outside"
      >
        <TableHeader columns={INITIAL_VISIBLE_COLUMNS}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody
          emptyContent="No users found"
          items={users}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: UserData) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {item && <ModalCustom user={item} isOpen={isOpen} onOpenChange={onOpenChange} />}
    </div>
  );
};

export default TableCustom;
