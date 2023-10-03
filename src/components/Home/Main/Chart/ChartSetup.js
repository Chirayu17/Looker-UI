require("chart.js/auto");
const ChartJs = require("chart.js");
const dateFns = require("date-fns");

// these are required because webpacking is a bit broken for the date-fns adapter
global.Chart = ChartJs;
global.dateFns = dateFns;

require("chartjs-adapter-date-fns");
