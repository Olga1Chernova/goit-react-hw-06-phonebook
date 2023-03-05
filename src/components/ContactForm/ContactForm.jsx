import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './ContactForm.module.scss';
import initialState from './initialState';

const ContactForm = ({onSubmit}) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({target}) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setState({...initialState});
  }

  const { name, number } = state;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__wrapper}>
        <label className={styles.form__label}>Name</label>
        <input
          className={styles.form__input}
          value={name}
          placeholder="Contact name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
        <label className={styles.form__label}>Number</label>
        <input
          value={number}
          className={styles.form__input}
          placeholder="Contact number"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
        <button className={styles.form__button} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


/*
class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      name: '',
      number: '',
    });
  }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__wrapper}>
          <label className={styles.form__label}>Name</label>
          <input
            className={styles.form__input}
            value={name}
            placeholder="Contact name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          />
          <label className={styles.form__label}>Number</label>
          <input
            value={number}
            className={styles.form__input}
            placeholder="Contact number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          />
          <button className={styles.form__button} type="submit">
            Add contact
          </button>
        </div>
      </form>
    );
  }
}
*/
