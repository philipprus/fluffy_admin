import React from 'react';
import moment from 'moment';
import StatusOrder from './StatusOrder';
import { NavLink } from 'react-router-dom';
import { useDataApi, deleteById, removeByIdFromArr } from '../../utils/utils';
import Loader from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import ModalRemove from './review/ModalDelete';


const GiftCards = props => {
  const url = '/api/giftcard/';
  const [{ data, isLoading, isError }] = useDataApi(url, []);

  const [giftCards, setGiftCard] = React.useState([]);
  const [openModal, setModal] = React.useState(false);
  const [chooseGift, setChooseGift] = React.useState('');

  React.useEffect(() => {
    if (data) setGiftCard(data);
  }, [data]);

  const notify = text => {
    toast.info(text, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const handlerRemove = async () => {
    const deleteRes = await deleteById(url, chooseGift, id => notify('Problem with' + id));
    if (deleteRes) {
      const removed = removeByIdFromArr(chooseGift, giftCards);
      setModal(false);
      setGiftCard(removed);
      notify('Removed');
    }
  };
  return (
    <>
      {isError && <div>Something went wrong ...</div>}

        {isLoading && <Loader type="Circles" color="#00BFFF" height={20} width={100} />}
        {giftCards.length ? <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr className="text-left">
                <th scope="col">#</th>
                <th scope="col">Coupon</th>
                <th scope="col">Created Date</th>
                <th scope="col">To</th>
                <th scope="col">From</th>
                <th scope="col">Finish date</th>
                <th scope="col">Status</th>
                <th scope="col">Amount</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {giftCards &&
                giftCards.map((item, index) => (
                  <tr className="text-left" key={`item-${index}`}>
                    <th scope="row">
                      <NavLink to={`/admin/giftcard/${item._id}`}>#{index + 1} </NavLink>
                    </th>
                    <td>
                      {' '}
                      <NavLink to={`/admin/giftcard/${item._id}`}>{item.coupon} </NavLink>
                    </td>
                    <td>{moment(item.created).format('DD/MM/YYYY')}</td>
                    <td>
                      {item.to} {item.fullname}
                    </td>
                    <td>{item.from}</td>
                    <td>{moment(item.expireDate).format('DD/MM/YYYY')}</td>
                    <td>
                      <StatusOrder id={item._id} order={item} status={item.status || 'New'} />
                    </td>
                    <td>{item.amount}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setChooseGift(item._id);
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
        </div> : "Empty"
      }
    
      <ToastContainer autoClose={4000} />
      <ModalRemove open={openModal} onClose={() => setModal(false)} onChange={handlerRemove} />
    </>
  );
};

export default GiftCards;
