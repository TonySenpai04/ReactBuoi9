import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/addCourse', { name, course, message })
      .then(response => {
        console.log(response.data);
        setName('');
        setCourse('');
        setMessage('');
      })
      .catch(error => {
        console.error('Error adding course:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div><h1>Thông tin đăng kí khóa học</h1></div>
      <div>
        <label htmlFor="nameInput">Họ và tên:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="courseSelect">Lựa chọn khóa học:</label>
        <select
          id="courseSelect"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
          required
        >
          <option value="">Chọn khóa học</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="Python">Python</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="messageTextarea">Message:</label>
        <textarea
          id="messageTextarea"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </div>
      <button type="submit">Cập nhật</button>
    </form>
  );
};

export default Form;
