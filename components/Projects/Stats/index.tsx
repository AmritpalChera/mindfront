"use client";

import federateUserBackend from "@/hooks/useUserBackend";
import useUserBackend from "@/hooks/useUserBackend";
import { selectUser } from "@/redux/features/UserSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Stats() {
  const [stats, setStats] = useState([
    { name: 'Total Requests', stat: '-' },
    { name: 'Total Projects', stat: '-' },
    { name: 'Total Vectors', stat: '-' },
  ]);

  const userBackend = useUserBackend();

  const getStats = async () => {
    const metrics = await userBackend.post('/stats', {}).then(res => res.data).catch(err => {
      console.log(err)
      console.log(err?.repsonse?.data);
    });

    const _stats = [...stats];
    _stats[0].stat = metrics?.data?.totalRequests;
    _stats[1].stat = metrics?.data?.totalProjects;
    _stats[2].stat = metrics?.data?.totalVectors;
    setStats(_stats);
  }

  useEffect(() => {
    getStats();
  }, [])

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 ">Key Metrics</h3>
      <dl className="mt-5 max-w-6xl grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-l px-4 py-5 shadow sm:p-6 text-white dark:text-black dark:bg-white bg-secondary rounded-xl">
            <dt className="truncate text-sm font-medium">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight ">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
