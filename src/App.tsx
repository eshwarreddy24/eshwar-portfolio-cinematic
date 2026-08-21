import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import MainContainer from "./components/MainContainer";
import "./index.css";

const App = () => {
  return (
    <>
      <MainContainer />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App;