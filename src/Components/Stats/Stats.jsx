import { useContext, useEffect, useState } from "react";
import { getUserStats, updateTimeSpent } from "../../helper/helper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authCtx } from "../../store/auth-context";

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
  return (
    <div className="bg-bgd h-full text-slate-50">
      <div>{loading && <p>Loading...</p>}</div>
      <div className="text-3xl">
        {!loading && <p>{JSON.stringify(stats)}</p>}
   
      </div>

      {!loading && (
    <div>
      {stats.map((stat, index) => (
        <p key={index}>Time Spent: {stat.timeSpent}</p>
      ))}
    </div>
  )}

 {!loading && stats.length > 0 ? (
    <div>
      <p>Last Time Spent: {stats[stats.length - 1].timeSpent}</p>
    </div>
  ) : (
    <p>No stats available</p>
  )}
     {/* dashboard navigation */}
      {/* <div>
        <Link className="text-3xl" to="/dashboard">
          Dashboard
        </Link>
      </div> */}
    </div>
  );
};

export default Stats;
