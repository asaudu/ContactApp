import { useState, useEffect } from "react";
import CreateContact from "./CreateContact";

function Contacts() {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/contacts")
        .then((response) => response.json())
        .then(students =>{
            //setStudents((students[3]));
            //console.log("Testing", typeof students);
            for (let index in students){
               if( index !== "3"){
                setContacts(students);
               }
            };       
        })
        
    }, []);

    

    const addContact = (newContact) => {
        //console.log(newStudent);
        //postStudent(newStudent);
        setContacts((contacts) => [...contacts, newContact]);
    }


    return (
      <div className="students">
        <h2> List of Contacts </h2>
        <ul>
            {contacts.map(contact =>
                <li key={contact.id}> {contact.firstname} {contact.lastname}</li>)}
        </ul>
        <CreateContact addContact={addContact} />
      </div>
    );
  }
  
  export default Contacts;