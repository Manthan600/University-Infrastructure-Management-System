// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import './App.css';
// // import Header from './common/Header'


// // function App() {
// //   return (
// //     <>
// //     <Header/>

// //     <div className="image">
        
// //     </div>
// //     </>
// //   );
// // }

// // export default App;


// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import Header from './common/Header';

// function App() {
//   const [showImage, setShowImage] = useState(true);

//   const handleButtonClick = () => {
//     setShowImage(false);
//   };

//   return (
//     <>
//       <Header />
//       {showImage && (
//         <div className="image">
//           <button onClick={handleButtonClick} className="welcome-button">
//             Welcome!
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './common/Header';

function App() {
  const [showImage, setShowImage] = useState(true);
  const [hideImage, setHideImage] = useState(false);

  const handleButtonClick = () => {
    setHideImage(true); // Trigger fade-out animation
    setTimeout(() => {
      setShowImage(false); // Hide image after fade-out animation completes
    }, 500); // Adjust this value to match the duration of your fade-out animation
  };

  return (
    <>
      <Header />
      {showImage && (
        <div className={`image ${hideImage ? 'slide-up' : ''}`}>
          <button className="button-29" role='button' onClick={handleButtonClick} >
            Welcome!
          </button>

        </div>
      )}
    </>
  );
}



export default App;
