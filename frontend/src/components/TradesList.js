import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrades } from '../reducers/tradesReducer';
import { useTable } from 'react-table';
import moment from 'moment';
import { toUSD } from '../helpers/formatting';
import EditableCell from './EditableCell';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  startEditTrade,
  startDeleteTrade,
  startSetTrades,
} from '../actions/tradesActions';

const TradesList = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state) => selectTrades(state));
  const [data, setData] = useState(trades);

  useEffect(() => {
    setData(
      trades.map((row) => ({
        ...row,
        isEditing: false,
      }))
    );
  }, [trades]);

  const tableColumns = [
    {
      Header: 'Date',
      accessor: 'tradeDate',
      className: 'user-input',
      Cell: ({ value }) => moment(value).format('Do MMM YYYY'),
    },
    {
      Header: 'Crypto',
      accessor: 'coinId',
      className: 'user-input',
      Cell: EditableCell,
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      className: 'table__number-cell user-input',
      //Cell: ({ value }) => value.toFixed(2),
      Cell: EditableCell,
    },
    {
      Header: 'Cost',
      accessor: 'cost',
      className: 'table__number-cell user-input',
      //Cell: ({ value }) => toUSD(value),
      Cell: EditableCell,
    },
    {
      Header: 'Fee',
      accessor: 'fee',
      className: 'table__number-cell user-input',
      // Cell: ({ value }) => {
      //   if (value === 0) return '-';
      //   return toUSD(value);
      // },
      Cell: EditableCell,
    },
    {
      Header: 'Total',
      accessor: 'total',
      className: 'table__number-cell',
      Cell: ({ value }) => toUSD(value),
    },
    {
      Header: 'Price',
      accessor: 'price',
      className: 'table__number-cell',
      Cell: ({ value }) => toUSD(value),
    },
  ];

  const updateMyData = (rowIndex, columnId, value) => {
    setData((prev) =>
      prev.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const columns = useMemo(() => tableColumns, []);
  const tableInstance = useTable({
    columns,
    data,
    autoPageReset: false,
    updateMyData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const onDelete = (tradeId) => {
    dispatch(startDeleteTrade(tradeId))
      .then(() => {
        dispatch(startSetTrades());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdate = (tradeId, { coinId, quantity, cost, fee }) => {
    dispatch(startEditTrade(tradeId, { coinId, quantity, cost, fee }))
      .then(() => {
        dispatch(startSetTrades());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setEditing = (row, rowIndex) => {
    console.log(row);
    const newData = data.map((row, index) => ({
      ...row,
      isEditing: index === rowIndex,
    }));
    setData(newData);
  };
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>TRADES LEDGER</span>
      </div>
      <div className="ui-card__content">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th>Edit</th>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps({
                      className: column.className,
                    })}
                  >
                    {column.render('Header')}
                  </th>
                ))}
                <th>Delete</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps({
                    className: row.original.isEditing
                      ? 'table__row--editing'
                      : '',
                  })}
                >
                  <td className="table__icon-cell">
                    {row.original.isEditing ? (
                      <i
                        className={'material-icons md-18'}
                        id="checkCircle"
                        onClick={() => onUpdate(row.original._id, row.values)}
                      >
                        check_circle
                      </i>
                    ) : (
                      <i
                        className={'material-icons md-18'}
                        id="editTrade"
                        onClick={() => setEditing(row, row.index)}
                      >
                        edit
                      </i>
                    )}
                  </td>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          className: cell.column.className,
                        })}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                  <td className="table__icon-cell">
                    <i
                      className="material-icons md-18"
                      id="deleteTrade"
                      onClick={() => onDelete(row.original._id)}
                    >
                      delete_forever
                    </i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradesList;
