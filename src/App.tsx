import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import en_png from "./assets/MainPage/btn_en.png";
import group_png from "./assets/MainPage/btn_group.png";
import qitmeer_png from "./assets/MainPage/qitmeer_logo.png";
import wallet_png from "./assets/MainPage/btn_wallet.png";
import logo1_png from "./assets/MainPage/logo_1.png";
import logo2_png from "./assets/MainPage/logo_2.png";
import logo3_png from "./assets/MainPage/logo_3.png";
import logo4_png from "./assets/MainPage/logo_4.png";
import copyright_png from "./assets/MainPage/background_bottom.png";
// import './App.css'
import styles from './App.module.css';

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

  const switchFlagEng = () => {
    setEngFlag(old => !old);
  }

  return (
    <div className={styles.root}>
      <ThemeProvider theme={theme}>
        <div className={styles.header}>
          <div className={styles.header_content}>
            {/* 图标 */}
            <div className={styles.logo_top_left}>
              <img src={qitmeer_png} />
            </div>
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
            <div className={styles.btns_header_right}>
              <img className={styles.btn_group} src={group_png} />
              <img className={styles.btn_en} onClick={() => switchFlagEng()} src={en_png} />
              <img className={styles.btn_wallet} src={wallet_png} />
            </div>
          </div>
        </div>
        {/* 内容部分 */}
        {!engFlag && <div className={styles.content}>
          <p>获取Qitmeer测试币</p>
          <p>获取测试网Meer以运行你的DAPP</p>
        </div>}
        {engFlag && <div className={styles.content}>
          <p>Get Qitmeer Test Coins</p>
          <p>Get Testnet MEER to run your DAPP</p>
        </div>}
        {/* 首选项 */}
        <div className={styles.btns_center}>
          <button className={styles.btn_middle_left}>QNG Testnet</button>
          <button className={styles.btn_middle_right}>Amana Testne</button>
        </div>
        {/* 搜索框 */}
        <div className={styles.search_line}>
          <div className={styles.search_area}>
            <input type="text" placeholder={!engFlag ? '请输入你的钱包地址(0x...)' : 'Please enter your wallet address (0x...)'} />
            <div>{!engFlag ? '领取5个测试MEER' : 'Claim 5 Test MEER'}</div>
          </div>
          <div className={styles.remark_area}>{!engFlag ? '每个地址限制20次，每次5 MEER。 同一IP或地址72小时内只能认领一次。' : 'Limit 20 times per address, 5 MEER each time. Same IP or address can only claim once within 72 hours.'}</div>
        </div>
        {/* 文字2 */}
        <div className={styles.content_two}>
          <p>{!engFlag ? '生态&工具' : 'Ecosystem & Tools'}</p>
          <div className={styles.routers}>
            <div className={styles.router}>
              <img src={logo1_png} />
              <div className={styles.router_content}>
                <p>DimAI</p>
                <p>{!engFlag ? '与DimAI一起释放你的想象力踏上元宇宙的创作之旅' : 'Ignite Your Creativity with DimAI: Embark on an Extraordinary Journey in the Metaverse'}</p>
              </div>
              <div className={styles.router_last}>
                <div className={styles.router_btn}>{!engFlag ? '立刻探索' : 'Explore Now'}</div>
              </div>
            </div>
            <div className={styles.router}>
              <img src={logo2_png} />
              <div className={styles.router_content}>
                <p>批量转账</p>
                <p>{!engFlag ? 'Qitmeer批量转账工具' : 'Ignite Your Creativity with DimAI: Embark on an Extraordinary Journey in the Metaverse'}</p>
              </div>
              <div className={styles.router_last}>
                <div className={styles.router_btn}>{!engFlag ? '开始使用' : 'Start Using'}</div>
              </div>
            </div>
            <div className={styles.router}>
              <img src={logo3_png} />
              <div className={styles.router_content}>
                <p>供应量查询</p>
                <p>{!engFlag ? 'Qitmeer供应量查询' : 'Ignite Your Creativity with DimAI: Embark on an Extraordinary Journey in the Metaverse'}</p>
              </div>
              <div className={styles.router_last}>
                <div className={styles.router_btn}>{!engFlag ? '前往查看' : 'Go to View'}</div>
              </div>
            </div>
            <div className={styles.router}>
              <img src={logo4_png} />
              <div className={styles.router_content}>
                <p>Kafh</p>
                <p>{!engFlag ? 'Qitmeer生态' : 'Ignite Your Creativity with DimAI: Embark on an Extraordinary Journey in the Metaverse'}</p>
              </div>
              <div className={styles.router_last}>
                <div className={styles.router_btn}>{!engFlag ? '前往下载' : 'Go to Download'}</div>
              </div>
            </div>
          </div>
          <div className={styles.copy_right}>
            <img src={copyright_png} />
          </div>
        </div>

      </ThemeProvider>
    </div>
  );
}

export default App
