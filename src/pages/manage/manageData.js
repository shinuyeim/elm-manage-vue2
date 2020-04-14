import * as moment from 'moment';

let tableData = [];
const firstNames = ["张", "李", "王", "刘"];
const secondNames = ["浩", "梓", "雨", "俊"];
const finallyNames = ["杰", "桐", "轩", "宇"];
// const dates = ["2018-07-25", "2019-09-01", "2020-02-02", "2018-09-04"];

const dateNow = new Date();

const addresses = ["北京", "上海", "广州", "深圳"];
const powers = ["超级管理员", "管理员"];

for (let i = 0; i < 200; i++) {
  const name = firstNames[(Math.floor(Math.random() * 4))] + secondNames[(Math.floor(Math.random() * 4))] + finallyNames[(Math.floor(Math.random() * 4))];
  const date = moment(dateNow).subtract((Math.floor(Math.random() * 900)+10),'days');
  const address = addresses[(Math.floor(Math.random() * 4))];
  let power = {};
  if (i === 0) {
    power = powers[0];
  } else {
    power = powers[1];
  }

  const tableItem = {
    id: i + 1,
    name,
    date:date.format('YYYY-MM-DD'),
    address: address,
    power: power
  };
  tableData.push(tableItem);
}

export default tableData;