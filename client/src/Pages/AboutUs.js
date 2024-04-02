import React from 'react';
import Header from '../common/Header';
import abtImage from '../images/abt.jpg'; // Require the image
import personImage from '../images/person.png'; // Require the image
import './AboutUs.css'

export default function AboutUs() {
  return (
    <div>
      <Header/>
      <h2>ABOUT US</h2>
      
      <div className="about">
        <div className="left">
            <img src={abtImage} alt="abt" />
        </div>
        <div className="right">
            <h3>About our project &gt;&gt; </h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, dolores. Odio possimus officia, itaque illo quae praesentium quo deleniti aliquid ratione dicta eligendi amet obcaecati perferendis est tempore assumenda voluptatibus incidunt doloremque beatae consequatur ex consequuntur nobis adipisci. Blanditiis voluptatem officiis, ullam quaerat beatae nesciunt tempora at nisi temporibus sit.</p>
            <div className="git">
              <h3><a href="https://github.com/Manthan600/University-Infrastructure-Management-System.git" target="_blank" rel="noopener noreferrer">~ GitHub</a></h3>
            </div>
            
        </div>
      </div>


        <h2>Contributors</h2>
      <div className="contri">

        <div className="person">
            <div className="Pimg">
            <img src={personImage} alt="person" />
            </div>
            <div className="info">
            <h3>Manthan Kshetrapal</h3>
            <h3>112103086</h3>
            </div>
        </div>

        
        <div className="person">
            <div className="Pimg">
            <img src={personImage} alt="person" />
            </div>
            <div className="info">
            <h3>Sanchit Rajmane</h3>
            <h3>112103113</h3>
            </div>
        </div>

        <div className="person">
            <div className="Pimg">
            <img src={personImage} alt="person" />
            </div>
            <div className="info">
            <h3>Aditya Raskar</h3>
            <h3>112103114</h3>
            </div>
        </div>


      </div>


      <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} SE2-PROJECT</p>
      </div>
    </footer> 
    </div>
  );
}
