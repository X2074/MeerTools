import { useState } from "react";
// import frameUtil from "../../utils/frameUtil";
import styles from "./index.module.css";
import headerPng from "./assets/header.png";
import titlePng from "./assets/title.png";
// 浮标
import qitmeerPng from "./assets/qitmeer.png";
import harmerPng from "./assets/harmer.png";
import coinPng from "./assets/coin.png";
import boxPng from "./assets/box.png";
import gearPng from "./assets/gear.png";
import nutPng from "./assets/nut.png";
import screwPng from "./assets/screw.png";
import ball01Png from "./assets/ball01.png";
import ball02Png from "./assets/ball02.png";
import ball03Png from "./assets/ball03.png";
// 路由入口图标
import img01Png from "./assets/img01.png";
import img02Png from "./assets/img02.png";
import img03Png from "./assets/img03.png";
import img04Png from "./assets/img04.png";
import img05Png from "./assets/img05.png";


// frameUtil.frameUtil.setRem(1440);
export default function Home() {
    const [activeId, setActiveId] = useState(0);
    const route_list = ['批量转账','批量转账','批量转账','批量转账'];
    const content_list = [
        { id : 1, img : img01Png,text: '水龙头', span: '水龙头是一款内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容' },
        { id : 2, img : img02Png, text: 'DimAI', span: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内' },
        { id : 3, img : img03Png, text: '批量转账', span: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内' },
        { id : 4, img : img04Png, text: '区块浏览器', span: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内' },
        { id : 5, img : img05Png, text: 'Kafh', span: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内' },
    ]
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <img src={headerPng} />
            </div>
            {/* 带手的部分 */}
            <div className={styles.content}>
                {/* 光束 */}
                <div className={styles.light}></div>
                {/* title */}
                <div className={styles.title}>
                    <img src={titlePng} />
                </div>
                {/* 各种浮动图标 */}
                <div className={styles.floatU_T + " " + styles.png_qitmeer}>
                    <img src={qitmeerPng} />
                </div>
                <div className={styles.floatU_O + " " + styles.png_harmer}>
                    <img src={harmerPng} />
                </div>
                <div className={styles.floatD_T + " " + styles.png_coin}>
                    <img src={coinPng} />
                </div>
                <div className={styles.floatD_O + " " + styles.png_box}>
                    <img src={boxPng} />
                </div>
                <div className={styles.floatU_T + " " + styles.png_nut}>
                    <img src={nutPng} />
                </div>
                <div className={styles.floatU_O + " " + styles.png_screw01}>
                    <img src={screwPng} />
                </div>
                <div className={styles.floatU_O + " " + styles.png_screw02}>
                    <img src={screwPng} />
                </div>
                <div className={styles.floatD_T + " " + styles.png_gear}>
                    <img src={gearPng} />
                </div>
                <div className={styles.floatD_T + " " + styles.png_ball01}>
                    <img src={ball01Png} />
                </div>
                <div className={styles.floatD_O + " " + styles.png_ball02}>
                    <img src={ball02Png} />
                </div>
                <div className={styles.floatD_O + " " + styles.png_ball03}>
                    <img src={ball03Png} />
                </div>

            </div>
            <div className={styles.routers}>
                <div className={styles.router_title}>工具集合</div>
                <div className={styles.router_in}>
                    {route_list.map((item, idx) => (
                        <div key={idx} onClick={() => {setActiveId(Number(idx))}} className={idx == activeId? styles.router_active : styles.router}>{item}</div>
                    ))}
                </div>
                <div className={styles.router_grid}>
                    {content_list.map(item => (
                        <div key={item.id} className={styles[`grid_item0${item.id}`] + " " + styles.grid_item}>
                            <div className={styles.grid_item_icon}>
                                <img src={item.img} />
                            </div>
                            <div className={styles.grid_item_content}>
                                <div className={styles.grid_item_title}>{item.text}</div>
                                <div className={styles.grid_item_text}>{item.span}</div>
                            </div>
                            <div className={styles.grid_item_btn}>去领取</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
