import puppeteer, { Page } from "puppeteer";
import { Time, Region } from "./variables";

const ID = "";
const PASSWORD = "";

const START: Region = "동대구"; // 서울, 수서, 동탄, 평택지제, 천안아산, 오송, 대전, 김천구미, 서대구, 동대구, 신경주, 울산통도사, 부산, 공주, 익산, 정읍, 광주송정, 나주, 목포
const END: Region = "수서"; // 서울, 수서, 동탄, 평택지제, 천안아산, 오송, 대전, 김천구미, 서대구, 동대구, 신경주, 울산통도사, 부산, 공주, 익산, 정읍, 광주송정, 나주, 목포
const DATE = "2023.01.02";
const TIME: Time = "00"; // 00, 02, 04, 06, 08, 10, 12, 14, 16, 18, 20, 22

(async function () {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();

  // ----------------------------------------------
  // 로그인
  await wait(1000, '로그인')
  await page.goto("https://www.letskorail.com/korail/com/login.do");
  await page.type("#txtMember", ID);
  await page.type("#txtPwd", PASSWORD);

  await page.click(
    "#loginDisplay1 > ul > li.btn_login > a"
  );

  await page.waitForNavigation();

  // ----------------------------------------------
  // 메인 페이지

  await wait(3000, '입력을 기다림')
  await page.waitForNavigation();

  console.log('hello2')

  await page.waitForNavigation(); // 날짜 입력 후 기다림

  await wait(2000, '입력을 기다림')

  while (
    await page.$$eval("#tableResult > tbody > tr:nth-child(1) > td:nth-child(6) > a:nth-child(1)", async (el) => {

      function wait(sec: number, label = '') {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            if (label) console.log('wait', label)
            resolve()
          }, sec)
        })
      }

      if (el.length > 0) {
        el[0].click();
        return false;
      }

      return true;
    })
  ) {
    await page.reload();
  }

  // ----------------------------------------------
  // 예매 페이지
  // while (
  //   await page.$$eval("#tableResult > tbody > tr:nth-child(1) > td:nth-child(6) > a:nth-child(1)", (el) => {
  //     console.log(el)
  //     // const reservations = [...el].filter((v) => v.textContent === "예약하기");
  //     //
  //     // if (reservations.length > 0) {
  //     //   reservations[0].click();
  //     //   return false;
  //     // }
  //
  //     return true;
  //   })
  // ) {
  //   await page.reload();
  // }
})();

function wait(sec: number, label = '') {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      if (label) console.log('wait', label)
      resolve()
    }, sec)
  })
}