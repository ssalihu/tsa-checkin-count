const cheerio = require('cheerio');
const moment = require('moment');

function extractListingsFromHTML (html) {

  const $ = cheerio.load(html);
  const vacancyRows = $('tbody tr');

  const vacancies = [];
  var key = "counts";
  var map = {};
  map[key] = [];
  vacancyRows.each((i, el) => {

    // Extract information from each row of the jobs table
    // let closing = $(el).children('.views-field-field-vacancy-deadline').first().text().trim();
    let date = $(el).children().first().text().trim();
    let current = $(el).children().first().next().text().trim();
    let previous = $(el).children().next().next().text().trim();
    //closing = moment(closing.slice(0, closing.indexOf('-') - 1), 'DD/MM/YYYY').toISOString();
    d =  new Date((date)).getTime();
    if(d) {
       vacancies.push({date, current, previous});
    }
  });
  map[key] = vacancies;
  return map;
}

module.exports = {
  extractListingsFromHTML
};
