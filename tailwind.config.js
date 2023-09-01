/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  
    extend: {

      fontSize: {
        'xxl':'10rem'
      },
      fontWeight:{
        'la':'600'
      },
      width: {
        'x':'40rem'
      },
      height:{
        'x':'40rem'
      },
      borderRadius:{
        'round':'50%'
      },
      colors:{
        'bgl':'#156669'
      }
    },
    
  },
  plugins: [],
};

// input_container flex flex-col justify-center items-center gap-8 bg-[#00000093] w-[40rem] h-[40rem] rounded-[50%] z-10