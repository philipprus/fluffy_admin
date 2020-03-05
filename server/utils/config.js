const dotenv = require('dotenv');

function init() {
    dotenv.config();
}
const KnownConfigKey = {
    JwtSecret: 'SECRET',
    ServerPort: 'PORT',
    DbServer: 'DATABASE',
};
function get(key, fallback = '') {
    return process.env[key] || fallback; 
}

 const testimonials = {
    paypal: "Paypal",
    vertical: "Vertical",
    pickup: "Pick up",
    horizontal: "Horizontal",
    israelpost: "Israel Post",
    new: "New",
    "not paid": "Not paid",
    sending: "Sending",
    inprocess: "In Process",
    not_confirmed: "Not confirmed",
    ready_to_dispatch: "Ready to dispatch",
    in_delivery: "In Delivery",
    complete: "Complete",
}

module.exports = { get, init, KnownConfigKey, testimonials };


