/* eslint-disable react/prop-types */
import Input from "../Input/Input";

const Panel = ({ showMenu, menuHandler }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center flex-col bg-[#021420] ">
        <Input showMenu={showMenu} menuHandler={menuHandler}></Input>
      </div>
    </div>
  );
};

export default Panel;
