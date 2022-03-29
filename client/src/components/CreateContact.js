import { useState } from "react";

const CreateContact = (props) => {

    const [contact, setContact] = useState({
        firstname: "",
        lastname: "",
        notes: ""
    });

    const [phoneNumber, setPhoneNumber] = useState({
        phonenumber: "",
        emailaddress: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleNameChange = (event) => {
        const firstname = event.target.value;
        setContact((contact) => ({ ...contact, firstname }));

    }

    const handleLastnameChange = (event) => {
        const lastname = event.target.value;
        setContact((contact) => ({ ...contact, lastname }));

    }

    const handleNotesChange = (event) => {
        const notes = event.target.value;
        setContact((contact) => ({ ...contact, notes }));

    }    

    const handlePhoneNumberChange = (event) => {
        const phonenumber = event.target.value;
        setPhoneNumber((contact) => ({ ...contact, phonenumber }));

    }

    const handleEmailAddressChange = (event) => {
        const emailaddress = event.target.value;
        setPhoneNumber((contact) => ({ ...contact, emailaddress }));

    }


    //A function to handle the post request
    const postContact = (newContact) => {
        return fetch('http://localhost:8080/api/contacts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(newContact)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log("From the post ", data);
        props.addContact(data);
      
    });
    }

    const postPhoneNumber = (newPhoneNumber) => {
        return fetch('http://localhost:8080/api/phonenumbers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(newPhoneNumber)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log("From the post ", data);
        props.addContact(data);
      
    });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postContact(contact);
        postPhoneNumber(phoneNumber);
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset id="create-contactForm">
                <label>First Name</label>
                <input
                    type="text"
                    id="add-user-name"
                    placeholder="First Name"
                    required
                    value={contact.firstname}
                    onChange={handleNameChange}

                /> <br/>
                <label>Last Name</label>
                <input
                    type="text"
                    id="add-user-lastname"
                    placeholder="Last Name"
                    required
                    value={contact.lastname}
                    onChange={handleLastnameChange}
                /> <br/>
                <label>Phone Number</label>
                <input
                    type="text"
                    id="add-user-lastname"
                    placeholder="Phone Number"
                    required
                    value={phoneNumber.phonenumber}
                    onChange={handlePhoneNumberChange}
                /> <br/>
                <label>Email Address</label>
                <input
                    type="text"
                    id="email-address"
                    placeholder="Email Address"
                    required
                    value={phoneNumber.emailaddress}
                    onChange={handleEmailAddressChange}
                /> <br/>
                <label>Notes</label>
                <input
                    type="text"
                    id="notes"
                    placeholder="Notes"
                    value={contact.notes}
                    onChange={handleNotesChange}
                /> <br/>
                <button type="submit">Add Contact</button>
            </fieldset>
            
        </form>
    );
};

export default CreateContact;