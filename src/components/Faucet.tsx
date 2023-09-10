import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import faucetContract from "../ethereum/faucet.js";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import en_png from "../assets/MainPage/btn_en.png";
import group_png from "../assets/MainPage/btn_group.png";
import qitmeer_png from "../assets/MainPage/qitmeer_logo.png";
import wallet_png from "../assets/MainPage/btn_wallet.png";
import logo1_png from "../assets/MainPage/logo_1.png";
import logo2_png from "../assets/MainPage/logo_2.png";
import logo3_png from "../assets/MainPage/logo_3.png";
import logo4_png from "../assets/MainPage/logo_4.png";
import copyright_png from "../assets/MainPage/btn_bottom.png";
import styles from './Faucet.module.css';
import { JsonRpcProvider } from '@ethersproject/providers/lib/json-rpc-provider.js';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'; 
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TablePagination } from '@material-ui/core';
import './Faucet.css'

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
// 用于样式
const tableRow = {
  border: '1px solid rgba(219, 219, 219, 1)',
  borderRadius: '8px',
  opacity: 1,
  background: 'rgba(9,9,4,1)'
}
const tableCol = {
  color: 'white'
}
const tableColSpecial = {
  color: 'rgba(36, 255, 36, 1)'
}
const tableStyle = {
  width: '17.2rem',
  // height: '7.8rem',
  margin: '.2rem auto'
}
// 表格 表头
// const columns: GridColDef[] = [
//   { field: 'idx', headerName: 'Number', width: 120 },
//   { field: 'tracsactionHash', headerName: 'TransactionHash', width: 1080 },
//   { field: 'amount', headerName: 'Amount', width: 258 },
//   { field: 'datetime', headerName: 'Last name', width: 258 },
// ];

function Faucet() {
  // 决定页面是否英文的flag
  const [engFlag, setEngFlag] = useState(false);
  // 水龙头/生态/工具集的切换值（亦称选中值）
  const [topBtnIdx, setTopBtnIdx] = useState(0);
  const [topDiaIdx, setTopDiaIdx] = useState(0);
  const [flagone, setFlagOne] = useState(false);
  const [flagtwo, setFlagTwo] = useState(false);
  const [flagthr, setFlagThr] = useState(false);
  const [flagList, setFlagList] = useState(false);
  // etherjs相关变量，provider，contract，signer
  const [walletAddress, setWalletAddress] = useState("");
  // const [signer, setSigner] = useState<JsonRpcSigner | undefined>();
  const [wallet, setWallet] = useState<ethers.Wallet | undefined>();
  const [provider, setProvider] = useState<JsonRpcProvider | undefined>();
  const [fcContract, setFcContract] = useState<ethers.Contract | undefined>();
  // const [withdrawSucces, setWithdrawSuccess] = useState("");
  // const [withdreaError, setWithdrawError] = useState("");
  const [transactionData, setTransactionData] = useState<Array<any> | undefined>([]);
  const pKey = '53721201246f16a603f1926e26ebf6098ba2f190764d1c527c1259128e3f8af5';
  
  // 业务相关变量
  // const chains = useRef([
  //   {
  //     value: 0,
  //     label: 'QNG',
  //     name: 'QNG',
  //     unit: 'Meer',
  //     rpc: 'https://testnet-qng.rpc.qitmeer.io',
  //     browser: 'https://qng-testnet.meerscan.io'
  //   },
  //   {
  //     value: 1,
  //     label: 'Amana',
  //     name: 'Amana',
  //     unit: 'Meer',
  //     rpc: 'https://testnet-amana.rpc.qitmeer.io',
  //     browser: 'https://amana-testnet.meerscan.io'
  //   },
  // ])
  // const Web3 = require("web3");
  // let rpc = 'https://testnet-qng.rpc.qitmeer.io'
  // let browser = 'https://qng-testnet.meerscan.io'
  // let web3 = new Web3(rpc)
  // 表格 组件
  function PaginatedTable({ data, enFlag }) {  
    // console.log("表格组件",data)
    const [page, setPage] = useState(0);  
    const [rowsPerPage, setRowsPerPage] = useState(10);  
    const indexOfLastRow = page * rowsPerPage;  
    const indexOfFirstRow = (page + 1) * rowsPerPage;  
    const currentRows = data.slice(indexOfLastRow, indexOfFirstRow);  
    console.log("表格slice",currentRows)
    
    const handlePageChange = (event, newPage) => {
      console.log("nothing for need",event);  
      setPage(newPage);  
    };  
    
    const handleRowsPerPageChange = (event) => {  
      setRowsPerPage(event.target.value);  
      setPage(0);  
    };  
    
    return (  
      <TableContainer component={Paper} style={tableStyle} >  
        <Table>  
          <TableHead>  
            <TableRow style={tableRow}>  
              <TableCell style={tableColSpecial}>{enFlag ? "TransactionHash" : "交易Hash"}</TableCell>  
              <TableCell style={tableColSpecial}>{enFlag ? "Amount" : "数量"}</TableCell>
              <TableCell style={tableColSpecial}>{enFlag ? "Datetime" : "发放时间"}</TableCell>
            </TableRow>  
          </TableHead>  
          <TableBody>  
            {currentRows && currentRows.map((row, index) => (  
              <TableRow key={index} style={tableRow}>  
                <TableCell style={tableCol}>{row.tracsactionHash}</TableCell>  
                <TableCell style={tableCol}>{row.amount}</TableCell>
                <TableCell style={tableCol}>{row.datetime}</TableCell>
              </TableRow>  
            ))}  
          </TableBody>  
        </Table>  
        <TablePagination  
          style={{
            background: 'rgba(9,9,4,1)',
            color: 'white',
            border: "1px solid rgba(219, 219, 219, 1)",
            boxSizing: 'border-box'
          }}
          count={data.length}  
          rowsPerPageOptions={[10]}  
          rowsPerPage={10}
          page={page}  
          onPageChange={handlePageChange}  
          onRowsPerPageChange={handleRowsPerPageChange}  
        />  
      </TableContainer>  
    );  
  }  

  const handleTop = (idx : number, event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
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

  const clickWindow = () => {
    // console.log("11")
    setTopBtnIdx(-1);setFlagOne(false);setFlagTwo(false);setFlagThr(false);
  }

  const changeAddress = (e) => {
    // console.log(e.target.value);
    setWalletAddress(e.target.value);
  }

  const receiveMeer = async () => {
    try {

      // 判断地址是否存在
      if (typeof walletAddress === 'undefined' || walletAddress == "") {
        console.log("地址有误，请重新填写");
        showList();
        return;
      }
      // 发送货币
      const gasPrice = await provider.getGasPrice();

      const tx = {
        to: "0x01090CbC41805FaD0292a1c83af4eE35f0C38D2a",
        gasPrice: gasPrice.add(100000000),
        value: ethers.utils.parseEther('0'),
        data: fcContract.interface.encodeFunctionData('requestToken',[[walletAddress]])
      };

      const gasLimit = await fcContract.estimateGas.requestToken([walletAddress], {
        gasPrice: tx.gasPrice
      });
      tx['gasLimit'] = gasLimit;
      
      const txResponse = await wallet.sendTransaction(tx);
      console.log("发送结果",txResponse);

      showList();
      
    } catch( error ) {
      console.error(error.message);
    }
  }

  const showList = async () => {
    let eventName = "SendToken";
    // let eventArgs = {};
    fcContract.queryFilter(eventName).then(res => {
      // console.log(res);
      let allEvents = res.map((item, index) => {
        return {
          tracsactionHash: item.transactionHash,
          address: item.args.receiver,
          amount: item.args.amount / 1000000000000000000 + 'MEER',
          datetime: "",
          id: item.args.receiver,
          idx: index + 1
        }
      })

      res.map((item, index) => {
        provider.getBlock(item.blockNumber).then((res) => {
          allEvents[index].datetime = dayjs().to(dayjs.unix(res.timestamp));
        })
      })
      // console.log("times",datetimes);

      setTransactionData(allEvents);
      setFlagList(true);
      console.log(allEvents);
    });
  }

  useEffect(() => {
    dayjs.extend(relativeTime);
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      async function doit () {
        try {
          // const provider = new ethers.providers.Web3Provider(window.ethereum);
          const provider = new ethers.providers.JsonRpcProvider('https://testnet-qng.rpc.qitmeer.io');
          setProvider(provider);
          // const accounts = await provider.send('eth_requestAccounts', []);
          const wallet = new ethers.Wallet(pKey, provider);
          setWallet(wallet);

          const contract = faucetContract(wallet);
          setFcContract(contract);

          // if (accounts.length > 0) {
          //   setSigner(provider.getSigner());
          //   setFcContract(faucetContract(provider));
          //   setWalletAddress(accounts[0]);
          // } else {
          //   console.log("Connect to MetaMask using the Connect button");
          // }
        } catch (err) {
          console.log(err.message);
        }
      }
      doit();
    } else {
      console.log("Please install MetaMask");
    }
  }, [])

  return (
    <div className={styles.root} onClick={() => clickWindow()}>
        <ThemeProvider theme={theme}>
          <div className={styles.header}>
            <div className={styles.header_content}>
              {/* 图标 */}
              <div className={styles.logo_top_left}>
                <img src={qitmeer_png} />
              </div>
              {!engFlag && <div className={styles.top_buttons}>
                <button className={`${styles.top_button} ${topBtnIdx === 0 ? styles.active_top_btn : ''}`} onClick={(e) => handleTop(0,e)}>
                  水龙头
                  <div style={{display: flagone ? 'flex' : 'none'}} className={styles.top_dialog}>
                    <p className={`${topDiaIdx === 0 ? styles.active_top_dia : ''}`} onClick={() => handleDia(0)}>Amana Testnet</p>
                    <p className={`${topDiaIdx === 1 ? styles.active_top_dia : ''}`} onClick={() => handleDia(1)}>QNG Testnet</p>
                  </div>
                </button>
                <button className={`${styles.top_button} ${topBtnIdx === 1 ? styles.active_top_btn : ''}`} onClick={(e) => handleTop(1,e)}>
                  生态
                  <div style={{display: flagtwo ? 'flex' : 'none'}} className={styles.top_dialog}>
                    <p className={`${topDiaIdx === 0 ? styles.active_top_dia : ''}`} onClick={() => handleDia(0)}>DimAI</p>
                    <p className={`${topDiaIdx === 1 ? styles.active_top_dia : ''}`} onClick={() => handleDia(1)}>Kafh</p>
                  </div>
                </button>
                <button className={`${styles.top_button} ${topBtnIdx === 2 ? styles.active_top_btn : ''}`} onClick={(e) => handleTop(2,e)}>
                  工具集
                  <div style={{display: flagthr ? 'flex' : 'none'}} className={styles.top_dialog}>
                    <p className={`${topDiaIdx === 0 ? styles.active_top_dia : ''}`} onClick={() => handleDia(0)}>批量发送代币</p>
                    <p className={`${topDiaIdx === 1 ? styles.active_top_dia : ''}`} onClick={() => handleDia(1)}>供应量查询</p>
                  </div>
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
              <input type="text" value={walletAddress} onChange={(e)=>changeAddress(e)} placeholder={!engFlag ? '请输入你的钱包地址(0x...)' : 'Please enter your wallet address (0x...)'} />
              <div onClick={() => receiveMeer()}>{!engFlag ? '领取5个测试MEER' : 'Claim 5 Test MEER'}</div>
            </div>
            <div className={styles.remark_area}>{!engFlag ? '每个地址限制20次，每次5 MEER。 同一IP或地址72小时内只能认领一次。' : 'Limit 20 times per address, 5 MEER each time. Same IP or address can only claim once within 72 hours.'}</div>
          </div>
          {flagList && <PaginatedTable data={transactionData} enFlag={engFlag} />}
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

export default Faucet
