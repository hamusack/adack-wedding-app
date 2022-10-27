import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from 'login/Login';
import Admin from 'admin/Admin';
import Home from 'home/Home';
import Mission from 'mission/Misson';

import { db } from 'common/Firebase'
import { collection ,onSnapshot, query, doc, orderBy } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#3f50b5',
        main: '#afe0fd',
        dark: '#afe0fd',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffffff',
        main: '#ffffff',
        dark: '#ffffff',
        contrastText: '#fff',
      },
      background: {
        default: '#030244',
        primary: '#ffffff'
      },
      text: { primary: '#fff', secondary: '#fff' },
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-indicator': {
              backgroundColor: '3f50b5',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: '#666666',
            '&.Mui-selected': {
              color: '#ffffff',
            },
            '&:hover': {
              color: '#ffffff',
            },
          },
        }
      },
    }
  })

  const [missions, setMissions] = useState([]);
  const [answereds, setAnswereds] = useState([]);
  const [game, setGame] = useState({ status: 0 });

  useEffect(() => {
    const gameRef = doc(db, 'game', 'zJAO26VHA79cVuL3fuoM');
    const unsub = onSnapshot(gameRef, (docSnapShot) => {
      setGame(docSnapShot.data());
    });
    return unsub;
  },[])

  useEffect(() => {
    const answeredRef = collection(db, 'answered');
    const unsubscribe = onSnapshot(answeredRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          answereds.push({
            ...change.doc.data(),id: change.doc.id
          })
        }
        if (change.type === "modified") {
          answereds.forEach(function (item, index) {
            if (item.id === change.doc.id) {
              answereds[index] = {...change.doc.data(), id: change.doc.id}
            }
          })
        }
        if (change.type === "removed") {
          answereds.forEach(function (item, index) {
            if (item.id === change.doc.id) {
              answereds.splice(index, 1)
            }
          })
        }
        setAnswereds([...answereds]);
      });
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  useEffect(() => {
    const missionsRef = collection(db, 'missions');
    const q = query (missionsRef, orderBy("createTime"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            missions.push({
              ...change.doc.data(),id: change.doc.id
            })
          }
          if (change.type === "modified") {
            missions.forEach(function (item, index) {
              if (item.id === change.doc.id) {
                missions[index] = {...change.doc.data(), id: change.doc.id}
              }
            })
          }
          if (change.type === "removed") {
            missions.forEach(function (item, index) {
              if (item.id === change.doc.id) {
                missions.splice(index, 1)
              }
            })
          }
          setMissions([...missions]);
        });
      });
      return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home game={game} missions={missions} answereds={answereds} />} / >
          <Route path='/mission' element={<Mission game={game} missions={missions} answereds={answereds} />} / >
          <Route path='/login/*' element={<Login game={game} />} />
          <Route path='/admin/*' element={<Admin game={game} missions={missions} answereds={answereds} />} />

      </Routes>
      </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
