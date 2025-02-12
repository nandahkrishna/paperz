"use client";
import { Skeleton, Table, TableTdProps, TableThProps } from "@mantine/core";
import React from "react";

type TColumn<T> = {
  thProps?: TableThProps; // Applied to the header <th> element
  tdProps?: (item: T) => TableTdProps; // Applied to inner data cell <td> element
  render?: (item: T) => React.ReactNode; // Optional render function for cell content
}[];

export function PTable<T>({
  items,
  columns,
  isLoading,
}: {
  items: T[];
  columns: TColumn<T>;
  isLoading?: boolean;
}) {
  const rows = items.map((deck, index) => (
    <Table.Tr key={index}>
      {columns.map((col, id2) => (
        <Table.Td
          key={id2}
          {...(col.tdProps ? col.tdProps(deck) : {})}
          style={{
            height: 10,
            maxHeight: 10,
            overflow: "hidden",
            ...(col.tdProps?.(deck)?.style || {}),
          }}
        />
      ))}
    </Table.Tr>
  ));

  const headers = columns.map((col, id) => (
    <Table.Th key={id} {...col.thProps} />
  ));

  return (
    <Table stickyHeader>
      <Table.Thead>
        <Table.Tr>{headers}</Table.Tr>
      </Table.Thead>
      {isLoading ? (
        <Table.Tbody>
          {Array.from({ length: 20 }).map((_, index) => (
            <Table.Tr key={`skeleton-${index}`}>
              {columns.map((col, id2) => (
                <Table.Td key={id2}>
                  <Skeleton height={20} />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      ) : (
        <Table.Tbody>{rows}</Table.Tbody>
      )}
    </Table>
  );
}
