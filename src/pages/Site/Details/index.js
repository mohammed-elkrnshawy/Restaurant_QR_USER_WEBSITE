import React from 'react';
import { useHistory } from 'react-router-dom';
import Item from './item';
import Modal from 'react-modal';

import './style.css';

const customStyles = {
  content: {
    top: '20%',
    left: '40%',
    right: 'auto',
    bottom: 'auto',
    padding: 20,
    boxBorder: 'gray',
  },
};

const Details = () => {
  const history = useHistory();
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="details-container">
      <div className="details-panar" style={{}}>
        <div className="homeimageCont">
          <div
            className="homeimg"
            style={{
              backgroundImage: `url("/assets/mac.png")`,
            }}
          ></div>
        </div>
        <h3>Mc Donald's</h3>
        <p className="hometype">fast food</p>
        <div className="homestatus"></div>

        <p
          className=""
          style={{
            fontSize: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 2,
            margin: 5,
          }}
        >
          {' '}
          0100303030
        </p>
      </div>
      <div className="details-content">
        <div className="details-header">
          <div className="sub-nav">
            <p>About</p>
          </div>
          <input
            className="changePass "
            style={{
              display: 'inline',
              backgroundColor: 'white',
            }}
            value="Make New Reservation"
            onClick={(e) => {
              openModal();
            }}
            type="button"
          />
        </div>
        <div className="discrip">
          loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem{' '}
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem{' '}
          lorem lorem lorem lorem lorem{' '}
        </div>
        <div className="categories">
          <h4>categories</h4>
          <Item
            onClick={() => {
              history.push('/home/meals');
            }}
          />
          <Item
            onClick={() => {
              history.push('/home/meals');
            }}
          />
          <Item
            onClick={() => {
              history.push('/home/meals');
            }}
          />
          <Item
            onClick={() => {
              history.push('/home/meals');
            }}
          />
          <Item
            onClick={() => {
              history.push('/home/meals');
            }}
          />
          <Item
            onClick={() => {
              history.push('/home/meals');
            }}
          />
          <Item
            onClick={() => {
              history.push('/home/meals');
            }}
          />
          <Item
            onClick={() => {
              history.push('/home/meals');
            }}
          />
          <Item
            onClick={() => {
              history.push('/home/meals');
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h3>Waiting List</h3>
        <p className="p_">There's</p>
        <h4 className="h_">13</h4>
        <p className="p_">Guest Waiting</p>
        <div className="divider"></div>
        <h6 className="h_">You Next?</h6>
        <input
          className="changePass "
          style={{
            backgroundColor: 'white',
            width: 300,
            margin: 0,
            marginTop: 20,
          }}
          value="+ Join Waiting List"
          onClick={(e) => {
            openModal();
          }}
          type="button"
        />
      </Modal>
    </div>
  );
};

export default Details;
