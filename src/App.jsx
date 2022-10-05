import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from 'login/Login';
import Admin from 'admin/Admin';
import Home from 'home/Home';
import Mission from 'mission/Misson';

import { db } from 'common/Firebase'
import { collection ,onSnapshot, getDocs, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        light: '#3f50b5',
        main: '#afe0fd',
        dark: '#afe0fd',
        contrastText: '#fff',
      },
      background: {
        default: '#030244',
      },
      text: { primary: '#fff' },
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
            color: '#2f40a5',
            '&.Mui-selected': {
              color: '3f50b5',
            },
            '&:hover': {
              color: '3f50b5',
            },
          },
        }
      },
    }
  })

  const [missionMaster, setMissionMaster] = useState(null);
  const [missionGroups, setMissionGroups] = useState(null);
  const [missions, setMissions] = useState(null);
  const [game, setGame] = useState({status:0});

  useEffect(() => {
    const groupRef = collection(db, 'missionGroups');
    const setMaster = [];
    getDocs(groupRef).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        setMaster.push({ ...doc.data(), id:doc.id });
      });
      setMissionMaster(setMaster);
    });
  },[])


  useEffect(() => {
    const gamepRef = doc(db, 'game', 'zJAO26VHA79cVuL3fuoM');
    const unsub = onSnapshot(gamepRef, (docSnapShot) => {
      setGame(docSnapShot.data());
    });
    return unsub;
  },[])


  useEffect(() => {
    if (missionMaster != null) {
    const missionsRef = collection(db, 'missions');
    const unsub = onSnapshot(missionsRef, (collectionSnapShot) => {
      const missionList = [];
      const groupList = [];
      collectionSnapShot.forEach((doc) => {
        missionList.push({ ...doc.data() ,id: doc.id});
        const element = groupList.find(value => value.group === doc.data().group.path);
        const plusPoint = doc.data().status === 3 ? Number(doc.data().point) : 0;
        if (element) {
          element.nowPoint += plusPoint;
        } else {
          const mas = missionMaster.find(value => value.id === doc.data().group.path.substr(doc.data().group.path.lastIndexOf('/') + 1));
          if (mas)
            groupList.push({
              group:doc.data().group.path,
              name: mas.name,
              pointArr: mas.pointArr,
              status: mas.status,
              nowPoint: plusPoint
            })
        }
      }
      );
      setMissions(missionList);
      setMissionGroups(groupList);
    });
      return unsub;
    }
  }, [missionMaster]);

  if (game.status === 0) {
    return <div>ゲーム開始前です。</div>;
  } else {
  return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home game={game} missions={missions} missionGroups={missionGroups} />} / >
          <Route path='/mission' element={<Mission game={game} missions={missions} />} / >
          <Route path='/login/*' element={<Login game={game} />} />
        <Route path='/admin/*' element={<Admin />} / >
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
  );
  }
}

export default App;
