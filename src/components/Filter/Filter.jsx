import PropTypes from 'prop-types';

import styles from './Filter.module.scss';

const Filter = ({ handleChange, value }) => {
  return (
    <div className={styles.contacts__wrapper}>
      <label className={styles.contacts__label}>Find contacts by name</label>
      <input
        value={value}
        className={styles.contacts__input}
        placeholder="Type to find a contact..."
        name="filter"
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
}