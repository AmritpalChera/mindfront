

export default function Stats() {

  const stats = [
    { name: 'Total Subscribers', stat: '71,897' },
    { name: 'Avg. Open Rate', stat: '58.16%' },
    { name: 'Avg. Click Rate', stat: '24.57%' },
  ]

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 ">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-l px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight ">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
