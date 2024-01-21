import { useState, useEffect, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FlipPage from "react-flip-page";

import SwitchBetweenTowCase from "components/SwitchBetweenTowCase";
import { config } from "assets/configs/routes";

import "assets/css/ShowCase.css";

export default function ShowCase() {
  const ref_FlipBackground = useRef();

  const switch_cases = ["翻頁效果", "清單"];
  const [switch_case, setSwitch_case] = useState(switch_cases[0]);

  useEffect(() => {
    console.log(switch_case);
  }, [switch_case]);

  const [flipPageWidth, setFlipPageWidth] = useState("");
  const [flipPageHeight, setFlipPageHeight] = useState("");

  useEffect(() => {
    if (ref_FlipBackground.current) {
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
    }
  }, []);

  return (
    <div>
      <Box>
        <SwitchBetweenTowCase
          case1={switch_cases[0]}
          case2={switch_cases[1]}
          value={switch_case}
          setValue={setSwitch_case}
        />
      </Box>
      <Box className="page-background">
        {switch_case === switch_cases[0] ? (
          <div className="flip-background" ref={ref_FlipBackground}>
            <FlipPage
              orientation="horizontal" // 設置翻頁的方向，可以是 'horizontal' 或 'vertical'
              uncutPages // 開啟此選項以顯示未分割的頁面，模擬書本的翻頁效果
              height={flipPageHeight}
              width={flipPageWidth}
              style={{ margin: "auto", display: "flex" }}
            >
              <article>
                <h1>Show Cases</h1>
                <p>請翻動書頁查看</p>
              </article>
              {config.map((v, i) => {
                return (
                  <article
                    key={`page_${i}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <h1>{v.title}</h1>
                    {v.directions ? <p>{v.directions}</p> : ""}
                    <div style={{ overflowY: "hidden", flex: "1" }}>
                      <img src={v.img} style={{ width: "100%" }} alt="" />
                    </div>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      alt="go"
                    >
                      GO➢
                    </a>
                  </article>
                );
              })}
            </FlipPage>
          </div>
        ) : (
          <Paper
            elevation={3}
            className="paper-background"
            sx={{ overflowY: "scroll" }}
          >
            <Grid container spacing={2} sx={{ p: 1 }}>
              {config.map((v, i) => {
                return (
                  <Grid xs={12} sm={6} key={`page_${i}`} sx={{ p: 1 }}>
                    <Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ border: "1px solid grey", marginBottom: 0 }}
                      >
                        {v.title}
                      </Typography>
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        alt="go"
                      >
                        <img
                          src={v.img}
                          style={{
                            width: "calc(100% - 6mm)",
                            border: "3mm ridge rgba(128, 128, 128, .6)",
                          }}
                          alt=""
                        />
                      </a>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        )}
      </Box>
    </div>
  );
}
