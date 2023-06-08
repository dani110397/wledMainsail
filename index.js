const axios = require('axios');

console.log(process.argv[2]);

axios.get('http://mainsail.local/printer/objects/query?print_stats')
    .then(res =>{
        var state = res.data.result.status.print_stats.state;
        console.log(state)
        switch(state){
            case "printing":
                console.log("Print active");
                axios.post('http://192.168.200.71/json/state', {
                    // on: 't',
                    ps: 7
                })
            break;

            case "standby":
                console.log("Print active");
                axios.post('http://192.168.200.71/json/state', {
                    // on: 't',
                    ps: 2
                })
            break;

            case "cancelled":
                console.log("Print active");
                axios.post('http://192.168.200.71/json/state', {
                    // on: 't',
                    ps: 5
                })
            break;

            case "completet":
                console.log("Print active");
                axios.post('http://192.168.200.71/json/state', {
                    // on: 't',
                    ps: 4
                })
            break;

            case "error":
                console.log("Print active");
                axios.post('http://192.168.200.71/json/state', {
                    // on: 't',
                    ps: 6
                })
            break;

            case "paused":
                console.log("Print active");
                axios.post('http://192.168.200.71/json/state', {
                    // on: 't',
                    ps: 3
                })
            break;

            default:
                axios.post('http://192.168.200.71/json/state', {
                    // on: 't',
                    ps: 1
                })
            break;
        }
    })
    .catch(err => {
        console.log(err);
    })