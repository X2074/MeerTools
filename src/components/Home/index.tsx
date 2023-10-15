import frameUtil from "../../utils/frameUtil";
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


frameUtil.frameUtil.setRem(1440);
export default function Home() {
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
            
        </div>
    )
}