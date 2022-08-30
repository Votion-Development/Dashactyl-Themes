import React from 'react';

export default function CardDashboardInfo() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [info, setInfo] = React.useState(String);

    React.useEffect(() => {
        fetch('/api/admin/info', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => {
                setInfo(json);
                setIsLoading(false);
            });
        setInterval(function () {
            fetch('/api/admin/info', {
                credentials: 'include'
            })
                .then(response => response.json())
                .then(json => {
                    setInfo(json);
                    setIsLoading(false);
                });
        }, 1000);
    }, []);

    return (
        <>
          <div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Dashboard Information</h4>
					<hr/>
                {isLoading ? <h3 className="text-center">Loading</h3> :
                    <>
                    <p>Dashboard Version: {info.version}</p>
                    <p>Process ID: {info.pid}</p>
                    <p>Dashboard Ram Usage: {info.dashactylStats.ram}MB</p>
                    <p>Dashboard CPU Usage: {info.dashactylStats.cpu}%</p>
                    <p>Dashboard Uptime: {info.dashactylStats.uptime}</p>
                    </>
}
                </div>
                </div>
              </div>

              <div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">System Information</h4>
					<hr/>
                {isLoading ? <h3 className="text-center">Loading</h3> :
                    <>
                    <p>System CPU Model: {info.systemInfo.cpu_model}</p>
                    <p>System Platform: {info.systemInfo.platform}</p>
                    <p>System Uptime: {info.systemInfo.uptime}</p>
                    <p>System Ram Usage: {info.systemInfo.usedRam}/{info.systemInfo.totalRam}MB</p>
                    <p>System CPU Usage: {info.systemInfo.cpuUsage}%</p>
                    </>
}
                </div>
              </div>
              </div>
        </>
    );
}
