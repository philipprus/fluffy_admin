import React from 'react';
import moment from 'moment';
import StatusOrder from './StatusOrder';
import { NavLink } from 'react-router-dom';
import { useDataApi, removeByIdFromArr, deleteById } from '../../utils/utils';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import ModalRemove from './review/ModalDelete';

const AdminApp = props => {
  const url = '/api/order/';
  const [{ data, isLoading, isError }] = useDataApi(url, []);

  const [orders, setOrders] = React.useState([]);
  const [openModal, setModal] = React.useState(false);
  const [chooseOrder, setChooseOrder] = React.useState('');

  React.useEffect(() => {
    if (data) setOrders(data);
  }, [data]);

  const notify = text => {
    toast.info(text, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const handlerRemove = async () => {
    const deleteRes = await deleteById(url, chooseOrder, id => notify('Problem with' + id));
    console.log(deleteRes);
    if (deleteRes) {
      const removed = removeByIdFromArr(chooseOrder, orders);
      setModal(false);
      setOrders(removed);
      notify('Removed');
    }
  };

  return (
    <>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr className="text-left">
                <th scope="col">#</th>
                <th scope="col">Created Date</th>
                <th scope="col">Image</th>
                <th scope="col">Dispatch date</th>
                <th scope="col">Status</th>
                <th scope="col">Payments</th>
                <th scope="col">Shipping</th>
                <th scope="col">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((item, index) => (
                  <tr className="text-left" key={`item-${index}`}>
                    <th scope="row">
                      <NavLink to={`/admin/${item._id}`}>
                        #{index + 1} {item.billingAddress_firstName} {item.billingAddress_lastName}{' '}
                      </NavLink>
                    </th>
                    <td>{moment(item.created).format('DD/MM/YYYY')}</td>
                    <td className="text-left">
                      <a href={item.photo[0].secure_url} target="_blank" rel="noopener noreferrer">
                        Open image
                      </a>
                      <br />
                      <small>
                        Style: {item.style} <br />
                        Size: {item.canvasSize} <br />
                        Position: {item.canvasPosition} <br />
                        Pets: {item.extraPet}
                        <br />
                      </small>
                    </td>
                    <td>{moment(item.dispatch_date).format('DD/MM/YYYY')}</td>
                    <td>
                      <StatusOrder id={item._id} order={item} status={item.status || 'New'} />
                    </td>
                    <td>
                      <small>
                        {item.billingAddress_firstName} {item.billingAddress_lastName},<br />
                        {item.billingAddress_email} {item.billingAddress_phone}, <br />
                        {item.billingAddress_address} {item.billingAddress_address2},{' '}
                        {item.billingAddress_country} {item.billingAddress_zip}
                        <span className="description"> ({item.payment_type})</span>
                      </small>
                    </td>
                    <td>
                      <small>
                        {item.shippingAddress_firstName
                          ? item.shippingAddress_firstName
                          : item.billingAddress_firstName}{' '}
                        {item.isSameShippingAddress
                          ? item.shippingAddress_lastName
                          : item.billingAddress_lastName}
                        , <br />
                        {item.shippingAddress_email
                          ? item.shippingAddress_email
                          : item.billingAddress_email}{' '}
                        {item.isSameShippingAddress
                          ? item.shippingAddress_phone
                          : item.billingAddress_phone}
                        , <br />
                        {item.shippingAddress_address
                          ? item.shippingAddress_address
                          : item.billingAddress_address}
                        {item.shippingAddress_address2
                          ? item.shippingAddress_address2
                          : item.billingAddress_address2 !== ''
                          ? item.billingAddress_address2
                          : ''}
                        ,
                        {item.shippingAddress_country
                          ? item.shippingAddress_country
                          : item.billingAddress_country}
                        ,
                        {item.shippingAddress_zip
                          ? item.shippingAddress_zip
                          : item.billingAddress_zip}
                        <span className="description"> ({item.shipping_type || 'Post'})</span>
                      </small>
                    </td>
                    <td>{item.order_total}₪</td>
                    <td>
                      <Button
                        onClick={() => {
                          setChooseOrder(item._id);
                          setModal(true);
                        }}
                      >
                        x
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer autoClose={4000} />
      <ModalRemove open={openModal} onClose={() => setModal(false)} onChange={handlerRemove} />
    </>
  );
};

export default AdminApp;
