/* eslint-disable react/prop-types */

const List = ({ onClick, text, menuHandler }) => {
  const onClickHandler = () => {
    console.log(+text);
    console.log("hsadfsdf");
    onClick(+text);
    menuHandler();
  };
  return (
    <>
      <li onClick={onClickHandler} className="nav__submenu-item font-[3rem]  ">
        <div
          className="flex m-2  px-5 text-3xl  text-gray-400 rounded-md hover:bg-gray-100
  hover:text-black cursor-pointer "
        >
          {text}
        </div>
      </li>
    </>
  );
};

export default List;
