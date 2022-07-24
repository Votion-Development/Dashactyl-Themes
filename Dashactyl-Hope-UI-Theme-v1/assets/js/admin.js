async function userInfo(id) {
    if (!id) return { error: "You have not provided a user ID." }; //temp err

    let req = await fetch(`/api/users/user_info/${id}`, {
        method: "get"
    });

    return await req.json();
};

async function setCoins(id, coins) {
    if (!id) return { error: "You have not provided a user ID." }; //temp err

    let req = await fetch(`/api/users/set_coins/${id}`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            coins: coins
        })
    });

    return await req.json();
};

async function setPackage(id, package) {
    if (!id) return { error: "You have not provided a user ID." }; //temp err

    let req = await fetch(`/api/users/set_package/${id}`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            package: package
        })
    });

    return await req.json();
};

async function setResources(id, memory, disk, cpu, servers) {
    if (!id) return { error: "You have not provided a user ID." }; //temp err

    let req = await fetch(`/api/users/set_resources/${id}`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            memory: memory,
            disk: disk,
            cpu: cpu,
            servers: servers
        })
    });

    return await req.json();
}

async function asyncAlert(func) { //temp func
    alert(JSON.stringify(await func));
};