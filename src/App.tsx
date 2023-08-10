import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import './App.css'
import styles from './App.module.css';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// 可能用于组件样式的颜色表
const theme = createTheme({
  palette: {
    primary: {
      main: '#31EB31',
    },
    secondary: {
      main: '#090904',
      light: '#03a9f4',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#01579b',
    },
  },
});

function App() {
  // 决定页面是否英文的flag
  const [engFlag, setEngFlag] = React.useState<boolean|HTMLElement>(false);
  // 水龙头/生态/工具集的切换值（亦称选中值）
  const [topBtnIdx, setTopBtnIdx] = React.useState<number|HTMLElement>(0);
  const [topDiaIdx, setTopDiaIdx] = React.useState<number|HTMLElement>(0);
  const [flagone, setFlagOne] = React.useState<boolean|HTMLElement>(false);
  const [flagtwo, setFlagTwo] = React.useState<boolean|HTMLElement>(false);
  const [flagthr, setFlagThr] = React.useState<boolean|HTMLElement>(false);

  const handleTop = (idx : number) => {
    setTopBtnIdx(idx);
    switch(idx) {
      case 0:
        setFlagOne(true);
        setFlagTwo(false);
        setFlagThr(false);
        break;
      case 1:
        setFlagOne(false);
        setFlagTwo(true);
        setFlagThr(false);
        break;
      case 2:
        setFlagOne(false);
        setFlagTwo(false);
        setFlagThr(true);
        break;
      default:
        break;
    }
  };
  
  const handleDia = (idx : number) => {
    setTopDiaIdx(idx);
  }

  return (
    <div className={styles.root}>
      <ThemeProvider theme={theme}>
        <div className={styles.header}>
          <div className={styles.header_content}>
            {!engFlag && <div className={styles.top_buttons}>
              <button className={`${styles.top_button} ${topBtnIdx === 0 ? styles.active_top_btn : ''}`} onClick={() => handleTop(0)}>
                水龙头
                <div style={{display: flagone ? 'flex' : 'none'}} className={styles.top_dialog}>
                  <p className={`${topDiaIdx === 0 ? styles.active_top_dia : ''}`} onClick={() => handleDia(0)}>amama ajsd</p>
                  <p className={`${topDiaIdx === 1 ? styles.active_top_dia : ''}`} onClick={() => handleDia(1)}>dimai ljos</p>
                </div>
              </button>
              <button className={`${styles.top_button} ${topBtnIdx === 1 ? styles.active_top_btn : ''}`} onClick={() => handleTop(1)}>
                生态
              </button>
              <button className={`${styles.top_button} ${topBtnIdx === 2 ? styles.active_top_btn : ''}`} onClick={() => handleTop(2)}>
                工具集
              </button>
            </div>}
            {engFlag && <div className={styles.top_buttons}>
              <button className={styles.top_button}>Faucet</button>
              <button className={styles.top_button}>Ecosystem</button>
              <button className={styles.top_button}>Toolkit</button>
            </div>}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App
