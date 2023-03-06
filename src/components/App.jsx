import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { addContact, deleteContact } from 'redux/actions';

import styles from './common.module.scss';

const App = () => {

  const contacts = useSelector(store => store.contacts);

  // const [contacts, setContacts] = useState(() => {
  //   const contacts = JSON.parse(localStorage.getItem("saved-contacts"));
  //   return contacts?.length ? contacts : []; 
  // });
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDuplicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const duplicate = contacts.find(({ name, number }) => {
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

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm  onSubmit={onAddContact}/>
      <h2 className={styles.title}>Contacts</h2>
      <Filter handleChange={handleFilter} />
      <ContactList contacts={filteredContacts} deleteContact={onDeleteContact} />
    </div>
  );

}

export default App;

