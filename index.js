var fs = require('fs');

var cheerio = require('cheerio');

var html = fs.readFileSync('test.html');
var $ = cheerio.load(html);
var $strongs = $('strong');

var $open = $strongs.filter(function (i, elem) {
  return elem.children[0].data === 'Open';
});

var $closed = $strongs.filter(function (i, elem) {
  return elem.children[0].data === 'Closed';
});

var opens = $open.map(function (i, elem) {
  var name = $(
    elem.parent // font
    .parent     // td
    .parent     // tr
    .parent     // table
    .parent     // td
    .parent).prev('tr').find('td > b')[0].children[0].data;

  return {
    name: name
  };
});

opens.each(function (i, open) {
  console.log(open);
})
//console.log(opens);
