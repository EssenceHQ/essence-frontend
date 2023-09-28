import { useContext, useEffect, useState } from "react";
import { getUserStats, updateTimeSpent } from "../../helper/helper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authCtx } from "../../store/auth-context";
import { div } from "@tensorflow/tfjs";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const authContext = useContext(authCtx);
  console.log(stats);
  useEffect(() => {
    const updateUserTime = async () => {
      try {
        const storageData = JSON.parse(localStorage.getItem("essence"));

        if (storageData?.timeSpent && authContext.userInfo.isLoggedIn) {
          //updating user time from the last login
          await updateTimeSpent(
            authContext.userInfo.userId,
            storageData.timeSpent,
            storageData.notified,
            storageData.date
          );
          localStorage.setItem(
            "essence",
            JSON.stringify({
              ...storageData,
              timeSpent: 0,
              notified: 0,
            })
          );
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    const getStats = async () => {
      try {
        const data = await getUserStats(params.id);
        console.log(data);
        if (data.code == 1) {
          setLoading(false);
          setStats(data.stats);
        } else {
          setLoading(false);
          throw new Error("user not found");
        }
      } catch (err) {
        console.log(err.message);
        navigate("/dashboard", { replace: true });
      }
    };
    const userAndStatHandler = async () => {
      await updateUserTime();
      await getStats();
    };
    setLoading(true);
    userAndStatHandler();
  }, []);

  //  tabs

  const calculateStatistics = () => {
    let totalSpentTime = 0;
    let totalNotified = 0;
    let last7DaysAvg = "0:00"; 
    let lastDayTimeSpent = 0;

    if (stats.length > 0) {
      stats.forEach((stat) => {
        totalSpentTime += stat.timeSpent;
        totalNotified += stat.notified;
      });

      const last7DaysStats = stats.slice(-7);
      if (last7DaysStats.length > 0) {
        const totalTimeSpentInLast7Days = last7DaysStats.reduce(
          (total, stat) => total + stat.timeSpent,
          0
        );
        const avgTimeSpentInMinutes =
          totalTimeSpentInLast7Days / last7DaysStats.length;
        const avgHours = Math.floor(avgTimeSpentInMinutes / 60);
        const avgMinutes = avgTimeSpentInMinutes % 60;
        last7DaysAvg = `${avgHours}:${avgMinutes < 10 ? "0" : ""}${avgMinutes}`;
      }

      lastDayTimeSpent = stats[stats.length - 1].timeSpent;

      const totalHours = Math.floor(totalSpentTime / 3600);
      const totalMinutes = Math.floor((totalSpentTime % 3600) / 60);
      totalSpentTime = `${totalHours}:${
        totalMinutes < 10 ? "0" : ""
      }${totalMinutes}`;

      const lastDayHours = Math.floor(lastDayTimeSpent / 3600);
      const lastDayMinutes = Math.floor((lastDayTimeSpent % 3600) / 60);
      lastDayTimeSpent = `${lastDayHours}:${
        lastDayMinutes < 10 ? "0" : ""
      }${lastDayMinutes}`;
    }

    return [
      { label: "Total Time Spent", value: totalSpentTime },
      { label: "Number of Notifications", value: totalNotified },
      { label: "Average Time Spent(Last 7 Days)", value: last7DaysAvg },
      { label: "Current Day Time Spent", value: lastDayTimeSpent },
    ];
  };

  const statistics = calculateStatistics();

  return (
    <div className="bg-bgd h-full text-slate-50">
      {/* <div className="">{loading && <p></p>}</div> */}
      {/* <div className="text-1xl mx-48">
        {!loading && <p>{JSON.stringify(stats)}</p>}
      </div> */}

      {/* {!loading && (
    <div>
      {stats.map((stat, index) => (
        <p key={index}>Time Spent: {stat.timeSpent}</p>
      ))}
    </div>
  )} */}

      {/* {!loading && stats.length > 0 ? (
    <div>
      <p>Last Time Spent: {stats[stats.length - 1].timeSpent}</p>
    </div>
  ) : (
    <p>No stats available</p>
  )} */}
      {/* dashboard navigation */}
      {/* <div>
        <Link className="text-3xl" to="/dashboard">
          Dashboard
        </Link>
      </div> */}

      {/* start */}
      <div className="stats-frame px-48 py-28 flex flex-col gap-11 ">
        <div className="upper-tabs">
          
            <div className="flex items-center justify-between gap-11 w-full ">
              {statistics.map((stat, index) => (
                <div className="flex" key={index}>
                  <div className="flex flex-col items-center justify-center gap-4 border border-bgl w-[34.5rem] tabShadow p-10 rounded-xl ">
                    {!loading ?(
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="text-8xl font-bold text-bght">{stat.value}</div>
                               <div className="text-[1.3rem] font-bold text-bgl">{stat.label}</div>
                      </div>
                               
           
                    ):(
                      <div className="text-[2.6rem] p-10">
                        Loding...
                      </div>
                    )}
                    
                  </div>
                </div>
              ))}
            </div>
        </div>
        <div className="charts flex gap-11">
          <div className="left w-[70%] h-[50rem] border border-bgl rounded-xl tabShadow2 "></div>
          <div className="right w-[30%] h-[50rem] border border-bgl rounded-xl tabShadow2"></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
