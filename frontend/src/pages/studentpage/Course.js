import React, { useState, useEffect } from 'react';
import './course.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import {Button} from "@mui/material";


const Course = () => {
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { courseId } = useParams();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const streamlitURL = process.env.REACT_APP_STREAMLIT_URL;
  const [showChat, setShowChat] = useState(false);
  const chatAppURL = `${streamlitURL}?course_id=${courseId}&embed=True`;

  useEffect(() => {
    const fetchCourseMaterials = async () => {
      try {
        const response = await axios.get(
            `${backendUrl}/api/courses/${courseId}/materials`, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
              }}
        );

        if(response.data.length > 0){
          setCourseMaterials(response.data);
          setErrorMessage('');
        } else {
          setErrorMessage('Currently no lecture materials are uploaded at the moment!');
        }
      } catch (error) {
        console.error('Error fetching course materials:', error);
        setErrorMessage(error.response?.data?.message || 'An unexpected error occurred while fetching course materials.');
      }
    };

    fetchCourseMaterials();
  }, [courseId, backendUrl]);

  return (
      <div className="coursehome">
        <div className="content">
          <div className="welcome">
            <h2>Your selected course comes with the following list of course materials.</h2>
          </div>
          {errorMessage && <Alert severity="error" variant="filled">{errorMessage}</Alert>}
          {!errorMessage && courseMaterials.length > 0 && (
              <div className="courses">
                <div className="course">
                  <div className="material-list">
                    <strong>FileNames</strong>
                    {courseMaterials.map((material, index) => (
                        <div key={index} className="material">
                          <span>{material.file_name}</span>
                          <Button variant="contained" style={{backgroundColor: 'success'}}>
                            View Material
                          </Button>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}

          <div className="chat-home">
            <button className="chat-icon" onClick={() => setShowChat(true)}>💬</button>
            {showChat && (
                <div className="chat-popup">
                  <div className="chat-header">
                    <h3>Chat with Us!</h3>
                    <button onClick={() => setShowChat(false)} className="close-button">✖</button>
                  </div>
                  <iframe
                      src={chatAppURL}
                      height="540"
                      width="1450"
                      title="Chat"
                  ></iframe>
                </div>
            )}
          </div>

        </div>
      </div>
  );
};

export default Course;