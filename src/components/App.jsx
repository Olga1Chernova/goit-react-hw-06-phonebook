import { useSelector, useDispatch } from 'react-redux';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { setFilter } from 'redux/filter/filter-slice';
import { getFilter } from 'redux/filter/filter-selectors';
import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { getFilteredContacts, getAllContacts } from 'redux/contacts/contacts-selectors';


import styles from './common.module.scss';

const App = () => {

  const allContacts = useSelector(getAllContacts);
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  // const [contacts, setContacts] = useState(() => {
  //   const contacts = JSON.parse(localStorage.getItem("saved-contacts"));
  //   return contacts?.length ? contacts : []; 
  // });
  
  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const isDuplicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const duplicate = allContacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(duplicate);
  }

  const onAddContact = ({ name, number }) => {
    if (isDuplicate(name, number)) {
      return alert(`${name} (${number}) is already in your contacts!`);
    }
    
    const action = addContact({ name, number });
    dispatch(action);
  }

  const onDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action)
  }

  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm  onSubmit={onAddContact}/>
      <h2 className={styles.title}>Contacts</h2>
      <Filter value={filter} handleChange={handleFilter} />
      <ContactList contacts={filteredContacts} deleteContact={onDeleteContact} />
    </div>
  );

}

export default App;

