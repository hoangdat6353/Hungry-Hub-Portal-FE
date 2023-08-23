import React from 'react';
import { TablePaginationConfig } from 'antd';
import { Table } from '@app/components/common/Table/Table';
import { ColumnsType } from 'antd/es/table';
import { SortType } from '@app/constants/enums/common';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import * as S from './BasicTables.style';

export const initialPagination: TablePaginationConfig = {
  showSizeChanger: true,
  defaultPageSize: 10,
  pageSizeOptions: ['10', '25', '50', '100'],
  size: 'small',
  position: ['bottomRight'],
};

export interface TableSortConfig {
  sortBy: string;
  sortType: SortType;
}

export interface TableData<T> {
  data: T[];
  pagination?: TablePaginationConfig;
  loading: boolean;
  sorter?: SorterResult<T>;
}

export interface BasicTableData<T> {
  data: T[];
  pagination: TablePaginationConfig;
}

export interface ICustomTable<T> {
  columns: ColumnsType<T>;
  tableData: TableData<T>;
  onTableChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T>,
    extra: TableCurrentDataSource<T>,
  ) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BasicTable: React.FC<ICustomTable<any>> = (props) => {
  return (
    <S.FormItem>
      <Table
        rowKey="id"
        columns={props.columns}
        dataSource={props.tableData.data}
        pagination={props.tableData.pagination ? props.tableData.pagination : undefined}
        loading={props.tableData.loading}
        onChange={props.onTableChange}
        scroll={{ x: 800 }}
      />
    </S.FormItem>
  );
};
