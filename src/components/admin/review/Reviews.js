import React from 'react';
import CreateReview from './CreateReview';
import EditReview from './EditReview';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import ModalRemove from './ModalDelete';
import { useDataApi, removeByIdFromArr, deleteById } from '../../../utils/utils';
import Loader from 'react-loader-spinner';

const Reviews = props => {
  const url = '/api/review/';

  const [{ data, isLoading, isError }, fetch, setFetch] = useDataApi(url, []);

  const [reviews, setReviews] = React.useState([]);

  const [openModal, setModal] = React.useState(false);
  const [openModalEdit, setModalEdit] = React.useState(false);
  const [chooseReview, setChooseReview] = React.useState('');

  React.useEffect(() => {
    if (data) setReviews(data);
  }, [data]);

  const notify = text => {
    toast.info(text, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const handlerRemove = async () => {
    const deleteRes = await deleteById(url, chooseReview, id => notify('Problem with' + id));
    console.log(deleteRes);
    if (deleteRes) {
      const removed = removeByIdFromArr(chooseReview, reviews);
      setModal(false);
      setReviews(removed);
      notify('Removed');
    }
  };

  const handlerOpen = (index) => {
        setChooseReview(index);
        setModalEdit(true)
  }
  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      <>
        {isLoading && <div><Loader type="Circles" color="#00BFFF" height={20} width={100} /></div>}
        <CreateReview callback={() => setFetch(fetch + 1)} />
        <EditReview
            open={openModalEdit}
            handleClose={setModalEdit}
            item={reviews[chooseReview]}
            callback={() => setFetch(fetch + 1)}
            handlerDelete={handlerRemove}
          />
        {!reviews.length && <div>Empty</div>}
        {reviews.length ? <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr className="text-left">
                  <th scope="col">#</th>
                  <th scope="col">Content</th>
                  <th scope="col">Full name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Thumbnail</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {reviews &&
                  reviews.map((item, index) => (
                    <tr className="text-left" key={`item-${index}`}>
                      <th scope="row">{index + 1}</th>
                      <td className="text-left"><div onClick={()=>{handlerOpen(index)}}>{item.content}</div></td>
                      <td className="text-left">{moment(item.created).format('DD/MM/YYYY')}</td>
                      <td className="text-left">{item.fullName}</td>
                      <td className="text-left">{item.email}</td>
                      <td>
                        {!item.thumbnails.length ? (
                          'No'
                        ) : (
                          'Yes'
                        )}{' '}
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            setChooseReview(item._id);
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
          </div> : ""}
      </>
      
      <ToastContainer autoClose={4000} />
      <ModalRemove open={openModal} onClose={() => setModal(false)} onChange={handlerRemove} />
    </>
  );
};

export default Reviews;
