import React, { useRef } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import './styles/Contact.css';

/////////

// import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useState } from 'react';

///////
const Contact = () => {
  const form = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_wjjygvu',
        'template_6c1zcz8',
        form.current,
        'BpZNGDvbGqCCVsnYy'
      )
      .then(
        (result) => {
          console.log(result.text);
          setEmail('');
          setName('');
          setMessage('');

          console.log('request sent');
          setSuccess('message sent');
          setTimeout(() => {
            setSuccess('');
          }, 5000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <NavBar />
      <div class="contact-form">
        <h1>Contact Us</h1>

        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            name="from_name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="from_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            rows="5"
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <div style={{ color: 'green', fontSize: '14px' }}>
            {success ? success : ''}
          </div>
          <button type="submit" value="send">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
