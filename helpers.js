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
    let count_2020 = $(el).children().first().next().next().text().trim();
    let count_2019 = $(el).children().next().next().next().text().trim();
    //closing = moment(closing.slice(0, closing.indexOf('-') - 1), 'DD/MM/YYYY').toISOString();
    d =  new Date((date)).getTime();
    if(d) {
       vacancies.push({date, current, count_2020, count_2019});
    }
  });
  map[key] = vacancies;
  return map;
}

module.exports = {
  extractListingsFromHTML
};
