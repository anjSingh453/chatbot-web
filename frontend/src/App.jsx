// import './App.css';
// import Sidebar from "./sidebar.jsx";
// import ChatWindow from "./chatWindow.jsx";
// import {MyContext} from "./myContext.jsx";
// import { useState } from 'react';
// import {v1 as uuidv1} from "uuid";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState(null);
//   const [currThreadId, setCurrThreadId] = useState(uuidv1());
//   const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
//   const [newChat, setNewChat] = useState(true);
//   const [allThreads, setAllThreads] = useState([]);

//   const providerValues = {
//     prompt, setPrompt,
//     reply, setReply,
//     currThreadId, setCurrThreadId,
//     newChat, setNewChat,
//     prevChats, setPrevChats,
//     allThreads, setAllThreads
//   }; 

//   return (
//     <div className='app'>
//       <MyContext.Provider value={providerValues}>
//           <Sidebar></Sidebar>
//           <ChatWindow></ChatWindow>
//         </MyContext.Provider>
//     </div>
//   )
// }

// export default App

import './App.css';
import Sidebar from "./sidebar.jsx";
import ChatWindow from "./chatWindow.jsx";
import { MyContext } from "./myContext.jsx";
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./sign.jsx";    
import Login from "./login.jsx";   
import Setting from "./setting.jsx";  
import Upgrade from './upgrade.jsx';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
   
  };

  return (
    <Router>
      <MyContext.Provider value={providerValues}>
        <Routes>
          {/* Signup and Login routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
         <Route path="/setting" element={<Setting />} />
         <Route path="/upgrade" element={<Upgrade />} />


          {/* Default route: Dashboard with Sidebar + ChatWindow */}
          <Route path="/dashboard" element={
            <div className='app'>
              <Sidebar />
              <ChatWindow />
            </div>
          } />
          
          {/* Redirect root path to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
