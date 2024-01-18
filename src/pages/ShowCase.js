import { useState, useEffect, useRef } from "react";
import FlipPage from "react-flip-page";

import { config } from "assets/configs/routes";

import "assets/css/ShowCase.css";

export default function ShowCase() {
  const ref_FlipBackground = useRef();

  const [flipPageWidth, setFlipPageWidth] = useState("");
  const [flipPageHeight, setFlipPageHeight] = useState("");

  useEffect(() => {
    console.log(ref_FlipBackground.current.clientHeight);
    console.log(ref_FlipBackground.current.clientWidth);
    //49:26
    const h = Math.floor(
      (ref_FlipBackground.current.clientHeight / 100) * 80 * 0.9
    );
    const w_withH = Math.floor((h / 26) * 49);
    console.log("(withH)w:h=>" + w_withH + ":" + h + ` =>${h / w_withH}`);
    const w = ref_FlipBackground.current.clientWidth * 0.9;
    const h_withW = Math.floor((w / 49) * 26);
    console.log("(withW)w:h=>" + w + ":" + h_withW + ` =>${h_withW / w}`);
    if (h < h_withW) {
      setFlipPageHeight(h);
      setFlipPageWidth(w_withH);
    } else {
      setFlipPageHeight(h_withW);
      setFlipPageWidth(w);
    }
  }, []);

  return (
    <div
      className="page-background"
      //   style={{ backgroundImage: "url(`./images/BookWell.jpg`)" }}
    >
      <div
        className="flip-background"
        // style={{ backgroundImage: "url(`./images/OpenBook.png`)" }}
        ref={ref_FlipBackground}
      >
        <FlipPage
          orientation="horizontal" // 設置翻頁的方向，可以是 'horizontal' 或 'vertical'
          uncutPages // 開啟此選項以顯示未分割的頁面，模擬書本的翻頁效果
          height={flipPageHeight}
          width={flipPageWidth}
          style={{ margin: "auto" }}
        >
          <article>
            <h1>Show Cases</h1>
            <p>請翻動書頁查看</p>
          </article>
          {config.map((v, i) => {
            return (
              <article key={`page_${i}`}>
                <h1>{v.title}</h1>
                {v.directions ? <p>{v.directions}</p> : ""}
                <a href={v.url} target="_blank" style={{ overflowY: "hidden" }}>
                  {/* GO➢ */}
                  <img src={v.img} style={{ width: "100%" }} />
                </a>
              </article>
            );
          })}
        </FlipPage>
      </div>
    </div>
  );
}
