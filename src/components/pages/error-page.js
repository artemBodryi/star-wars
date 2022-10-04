import React from 'react'
import '../error-indicator/error-indicator.css';
import icon from '../error-indicator/death-star.png';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="error-indicator">
            <img src={icon} alt="error-icon" />
            <span className="boom">SORRY!</span>
            <span>
                we do not have this page in our application!
            </span>
            <span>
                (But maybe in future out droids will create something same as your request!)
            </span>
            <button className="btn btn-warning " onClick={() => navigate('/')}>Go back to main page</button>
        </div>
  )
}

export default ErrorPage