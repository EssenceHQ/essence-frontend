import Panel from "../Panel/Panel";
import { useState } from "react";
import AsmrPanel from "../ASMR/AsmrPanel";
const DashBoard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuHandler = () => {
    setShowMenu((state) => {
      return !state;
    });
  };
  console.log(showMenu);
  return (
    <div className="bg-[#021420] relative w-full h-screen flex items-center justify-center">
      {/**panel  */}
      <div className="w-1/2 h-1/3  ">
        <Panel showMenu={showMenu} menuHandler={menuHandler}></Panel>
      </div>
      {/*panel end */}

      {/* SoundPanel */}
      {showMenu && (
        <div
          className="absolute w-full h-full z-20  "
          onClick={menuHandler}
        ></div>
      )}
      <AsmrPanel></AsmrPanel>
    </div>
  );
};

export default DashBoard;
