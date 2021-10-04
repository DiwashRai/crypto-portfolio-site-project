import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrades } from '../reducers/tradesReducer';
import { useTable } from 'react-table';
import { parseISO } from 'date-fns';
import { toUSD } from '../helpers/formatting';
import { regex } from '../helpers/constants';
import { Input } from 'semantic-ui-react';
import EditableCell from './EditableCell';
import DatePicker from 'react-datepicker';
import {
  startAddTrade,
  startEditTrade,
  startDeleteTrade,
  startSetTrades,
} from '../actions/tradesActions';
import { startSetUser } from '../actions/userActions';

const TradesList = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state) => selectTrades(state));
  const [data, setData] = useState(trades);

  const [addTradeDate, setAddTradeDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [addTradeCoinId, setAddTradeCoinId] = useState('');
  const [addTradeQuantity, setAddTradeQuantity] = useState('');
  const [addTradeCost, setAddTradeCost] = useState('');
  const [addTradeFee, setAddTradeFee] = useState('');
  const [addTradeTotal, setAddTradeTotal] = useState('');
  const [addTradePrice, setAddTradePrice] = useState('');

  const onAddTradeDateChange = (addTradeDate) => {
    setAddTradeDate(addTradeDate);
  };

  const onAddTradeCoinIdChange = (e) => {
    const coinId = e.target.value;
    if (!coinId || coinId.match(regex.coinId)) {
      setAddTradeCoinId(coinId);
    }
  };

  const onAddTradeQuantityChange = (e) => {
    const quantity = e.target.value;
    if (!quantity || quantity.match(regex.quantity)) {
      setAddTradeQuantity(e.target.value);
    }
  };

  const onAddTradeCostChange = (e) => {
    const cost = e.target.value;
    if (!cost || cost.match(regex.currency)) {
      setAddTradeCost(cost);
    }
  };

  const onAddTradeFeeChange = (e) => {
    const fee = e.target.value;
    if (!fee || fee.match(regex.currency)) {
      setAddTradeFee(fee);
    }
  };

  useEffect(() => {
    const cost = addTradeCost ? parseFloat(addTradeCost) : 0;
    const fee = addTradeFee ? parseFloat(addTradeFee) : 0;
    setAddTradeTotal(cost + fee);
  }, [addTradeCost, addTradeFee]);

  useEffect(() => {
    if (!addTradeQuantity) return setAddTradePrice('');
    const total = parseFloat(addTradeTotal);
    const quantity = parseFloat(addTradeQuantity);
    if (quantity === 0) return setAddTradePrice('');
    else setAddTradePrice((total / quantity).toFixed(2));
  }, [addTradeTotal, addTradeQuantity]);

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
      Cell: (props) => (
        <DatePicker
          dateFormat={'dd-MM-yyyy'}
          selected={parseISO(props.value)}
          onChange={(date) => {
            updateMyData(props.row.index, props.column.id, date.toISOString());
          }}
          readOnly={!props.row.original.isEditing}
        />
      ),
    },
    {
      Header: 'Crypto',
      accessor: 'coinId',
      className: 'user-input',
      Cell: (props) => (
        <EditableCell
          {...props}
          toStoreType={(string) => string}
          toDisplayFormat={(string) => string}
          valueRegex={regex.coinId}
          defaultValue={'...'}
        />
      ),
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      className: 'table__number-cell user-input',
      Cell: (props) => (
        <EditableCell
          {...props}
          toStoreType={(string) => parseFloat(string)}
          toDisplayFormat={(string) => string}
          valueRegex={regex.quantity}
          defaultValue={0}
        />
      ),
    },
    {
      Header: 'Cost',
      accessor: 'cost',
      className: 'table__number-cell user-input',
      Cell: (props) => (
        <EditableCell
          {...props}
          toStoreType={(string) => parseFloat(string)}
          toDisplayFormat={toUSD}
          valueRegex={regex.currency}
          defaultValue={0}
        />
      ),
    },
    {
      Header: 'Fee',
      accessor: 'fee',
      className: 'table__number-cell user-input',
      Cell: (props) => (
        <EditableCell
          {...props}
          toStoreType={(string) => parseFloat(string)}
          toDisplayFormat={toUSD}
          valueRegex={regex.currency}
          defaultValue={0}
        />
      ),
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
          const newRow = {
            ...row,
            [columnId]: value,
          };
          newRow.total = newRow.cost + newRow.fee;
          newRow.price = newRow.total / newRow.quantity;
          return newRow;
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

  const onAdd = () => {
    const tradeData = {
      tradeDate: addTradeDate.toISOString(),
      coinId: addTradeCoinId,
      quantity: addTradeQuantity,
      cost: addTradeCost,
      fee: addTradeFee,
    };
    console.log(tradeData);
    dispatch(startAddTrade(tradeData))
      .then(() => {
        dispatch(startSetTrades());
        dispatch(startSetUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = (tradeId) => {
    dispatch(startDeleteTrade(tradeId))
      .then(() => {
        dispatch(startSetTrades());
        dispatch(startSetUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdate = (tradeId, { coinId, quantity, cost, fee }) => {
    dispatch(startEditTrade(tradeId, { coinId, quantity, cost, fee }))
      .then(() => {
        dispatch(startSetTrades());
        dispatch(startSetUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setEditing = (rowIndex) => {
    const newData = data.map((row, index) => ({
      ...row,
      isEditing: index === rowIndex,
    }));
    setData(newData);
  };

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>TRADES LEDGER</span>
      </div>
      <div className="ui-card__content">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th></th>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps({
                      className: column.className,
                    })}
                  >
                    {column.render('Header')}
                  </th>
                ))}
                <th></th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            <tr className={'table__add-trade-row'}>
              <td></td>
              <td>
                <DatePicker
                  dateFormat={'dd-MM-yyyy'}
                  selected={addTradeDate}
                  onChange={onAddTradeDateChange}
                />
              </td>
              <td>
                <Input
                  type="text"
                  placeholder="..."
                  value={addTradeCoinId}
                  onChange={onAddTradeCoinIdChange}
                />
              </td>
              <td>
                <Input
                  type="text"
                  placeholder="0"
                  value={addTradeQuantity}
                  onChange={onAddTradeQuantityChange}
                />
              </td>
              <td>
                <Input
                  type="text"
                  placeholder="$0.00"
                  value={addTradeCost}
                  onChange={onAddTradeCostChange}
                />
              </td>
              <td>
                <Input
                  type="text"
                  placeholder="$0.00"
                  value={addTradeFee}
                  onChange={onAddTradeFeeChange}
                />
              </td>
              <td>
                <span>{addTradeTotal}</span>
              </td>
              <td>
                <span>{addTradePrice}</span>
              </td>
              <td className="table__icon-cell">
                <button className="ui icon button green" onClick={onAdd}>
                  <i className="plus icon"></i>
                </button>
              </td>
            </tr>
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
                        onClick={() => setEditing(row.index)}
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
