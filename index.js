const axios = require('axios');
const wled = 'http://192.168.200.71/json/state'

axios.get('http://mainsail.local/printer/objects/query?print_stats=state&extruder=temperature&heater_bed=temperature')
    .then(result =>{
        var heater_bed = result.data.result.status.heater_bed.temperature;
        var extruder = result.data.result.status.extruder.temperature
        var state = result.data.result.status.print_stats.state;
        if(extruder < 50 && heater_bed < 35){
            state = "cold";
        }
        if(state == "printing" && extruder < 200 && heater_bed < 50){
            state = "heating";
        }
        console.log(state)
        switch(state){
            case "printing":
                axios.post(wled, {
                    ps: 7
                })
            break;

            case "standby":
                axios.post(wled, {
                    ps: 2
                })
            break;

            case "cancelled":
                axios.post(wled, {
                    ps: 5
                })
            break;

            case "completet":
                axios.post(wled, {
                    ps: 4
                })
            break;

            case "error":
                axios.post(wled, {
                    ps: 6
                })
            break;

            case "paused":
                axios.post(wled, {
                    ps: 3
                })
            break;

            case "cold":
                axios.post(wled, {
                    ps: 8
                })
            break;

            case "heating":
                axios.post(wled, {
                    ps: 9
                })
            break;

            default:
                axios.post(wled, {
                    ps: 1
                })
            break;
        }
    })
    .catch(err => {
        console.log(err);
    })