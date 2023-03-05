import PropTypes from 'prop-types';

import styles from './ContactList.module.scss';

const ContactList = ({ contacts, deleteContact }) => {
  const contactInfo = contacts.map(({ id, name, number }) => {
    return (
      <li key={id} className={styles.contacts__item}>
        {name}: {number}
        <button
          onClick={() => deleteContact(id)}
          className={styles.contacts__button}
          type="button"
        >
          Delete
        </button>
      </li>
    );
  });

  return <ul className={styles.contacts}>{contactInfo}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  items: [],
};

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
 })) 
}