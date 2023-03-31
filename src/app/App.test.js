import puppeteer from "puppeteer";
import fs from 'fs';

const testPage = async (page, pageUrl, testName) => {
  await page.goto('http://localhost:3000');
  let totalFirstPaintTime = 0;
  let totalRenderingTime = 0;
  let totalMemoryUsage = 0;
  let totalLoadTime = 0;
  // let totalResultWindow = 0;
  let totalAddedResult = 0;
  let totalAdded10Result = 0;
  let totalDeleteResult = 0;
  let totalEditResult = 0;



  for (let i = 0; i < 10; i++) {

    await page.goto(pageUrl);
    const loadTime = await page.evaluate(() => performance.now());
    await page.waitForSelector('#todo-input-container');
    // await page.waitForSelector('.konvajs-content');
    const loadTimeResult = `Время загрузки страницы: ${loadTime} ms`;
    totalLoadTime += loadTime

    const firstPaintTime = await page.evaluate(() => {
      const performanceTiming = performance.timing;
      return performanceTiming.responseStart - performanceTiming.navigationStart;
    });
    const performanceTimingResult = `Время первой отрисовки: ${firstPaintTime} ms`;
    totalFirstPaintTime += firstPaintTime

    const renderingTime = await page.evaluate(() => {
      const performanceTiming = performance.timing;
      return performanceTiming.loadEventEnd - performanceTiming.responseStart;
    });
    const renderingTimeResult = `Время рендеринга: ${renderingTime} ms`
    totalRenderingTime += renderingTime

    const memoryUsage = await page.evaluate(() => {
      return window.performance.memory.usedJSHeapSize / (1024 * 1024);
    });
    const memoryUsageResult = `Потребление памяти: ${memoryUsage} MB`
    totalMemoryUsage += memoryUsage

    // const startWindow = Date.now();
    // await page.click("canvas");
    // await page.select('select', 'left')
    // await page.select('select', 'right')
    // await page.click("input");
    // await page.$eval('input', field => field.value = 50)
    // await page.click(".button-1");
    // await page.click("canvas");
    // await page.click(".button-2");
    // await page.click("canvas");
    // await page.select('select', 'tilt,left')
    // await page.click("input");
    // await page.$eval('input', field => field.value = 25)
    // await page.click(".button-2");
    // await page.click("canvas");
    // await page.select('select', 'tilt,left')
    // const endWindow = Date.now();
    // let res = endWindow - startWindow
    // const resultWindow = `Взаимодействие с окном: ${res} мс`
    // totalResultWindow += res



    const startAdd = Date.now();
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.waitForSelector('.todo-list-all .todo-list:nth-child(1)');
    const endAdd = Date.now();
    const addedResult = `Время добавления нового элемента: ${endAdd - startAdd} мс`
    totalAddedResult += endAdd - startAdd

    const startAdd10 = Date.now();
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.waitForSelector('.todo-list-all .todo-list:nth-child(11)');
    const endAdd10 = Date.now();
    const added10Result = `Время добавления 10 элементов: ${endAdd10 - startAdd10} мс`;
    totalAdded10Result += endAdd10 - startAdd10

    const taskCountBefore = (await page.$$('.todo-list-all .todo-list')).length;
    const deleteButton = await page.$('.todo-list-all .todo-list:nth-child(1) .delete');
    const startDelete = Date.now();
    await deleteButton.click();
    const taskCountAfter = (await page.$$('.todo-list-all .todo-list')).length;
    const endDelete = Date.now();
    let deleteResult = ''
    if (taskCountBefore - taskCountAfter !== 1) {
      deleteResult = 'Ошибка: задача не была удалена';
    } else {
      deleteResult = `Время удаления элемента: ${endDelete - startDelete} мс`;
    }
    totalDeleteResult += endDelete - startDelete

    const editButton = await page.$('.todo-list-all .todo-list:nth-child(1) .edit');
    const startEdit = Date.now();
    await editButton.click();
    await page.waitForSelector('.todo-list-all .todo-list:nth-child(1) #input-edit', { visible: true });
    await page.click(".todo-list-all .todo-list:nth-child(1) #input-edit");
    await page.type(".todo-list-all .todo-list:nth-child(1) #input-edit", "(Edited)");
    await page.click(".todo-list-all .todo-list:nth-child(1) .ok");
    const text = await page.$eval(".todo-list-all .todo-list:nth-child(1) #content", (e) => e.textContent)
    const endEdit = Date.now();
    let editResult = '';


    if (text !== 'new todo(Edited)') {
      editResult = 'Ошибка: задача не была удалена';
    } else {
      editResult = `Время изменения элемента: ${endEdit - startEdit} мс`;
    }
    totalEditResult += endEdit - startEdit

    const testResults = {
      url: pageUrl,
      name: testName,
      loadTimeResult,
      performanceTimingResult,
      renderingTimeResult,
      memoryUsageResult,
      // resultWindow
      addedResult,
      added10Result,
      deleteResult,
      editResult
    };
    fs.appendFileSync('testResults.json', JSON.stringify(testResults) + ',\n');
  }


  const averageFirstPaintTime = totalFirstPaintTime / 10;
  const averageRenderingTime = totalRenderingTime / 10;
  const averageTotalMemoryUsage = totalMemoryUsage / 10;
  const averageTotalLoadTime = totalLoadTime / 10;
  const averageAddedResult = totalAddedResult / 10;
  const averageAdded10Result = totalAdded10Result / 10;
  const averageDeleteResult = totalDeleteResult / 10;
  const averageEditResult = totalEditResult / 10;
  // const averageTotalResultWindow = totalResultWindow / 10;

  console.log(testName)
  console.log(`Среднее время первой отрисовки: ${averageFirstPaintTime} ms`);
  console.log(`Среднее время рендеринга: ${averageRenderingTime} ms`);
  console.log(`Среднее время потребление памяти: ${averageTotalMemoryUsage} ms`);
  console.log(`Среднее время загрузки страницы: ${averageTotalLoadTime} ms`);
  // console.log(`Среднее время взаимодействия с окном: ${averageTotalResultWindow} ms`);
  console.log(`Время добавления нового элемента: ${averageAddedResult} ms`);
  console.log(`Время добавления 10 элементов: ${averageAdded10Result} ms`);
  console.log(`Время удаления элемента: ${averageDeleteResult} ms`);
  console.log(`Время изменения элемента: ${averageEditResult} ms`);

};

let content = fs.readFileSync('testResults.json', 'utf-8');
if (content.length === 0) {
  fs.appendFileSync('testResults.json', '[\n');
} else {
  content = content.slice(0, -2);
  fs.writeFileSync('testResults.json', content + ',\n', 'utf-8');
}


describe("ContextTodoApp.tsx", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("Тест todo context", async () => {
    await testPage(page, 'http://localhost:3000/contexttodo', 'Тест todo context')
    expect(true).toBe(true);
  }, 60_000);

    afterAll(() => browser.close());
});

describe("MobxTodoApp.tsx", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("Тест todo mobx", async () => {
    await testPage(page, 'http://localhost:3000/mobxtodo', 'Тест todo mobx')
    expect(true).toBe(true);
  }, 60_000);

    afterAll(() => browser.close());
});

describe("ReduxTodoApp.tsx", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("Тест todo redux", async () => {
    await testPage(page, 'http://localhost:3000/reduxtodo', 'Тест todo redux')
    let content = fs.readFileSync('testResults.json', 'utf-8');
    content = content.slice(0, -2);
    fs.writeFileSync('testResults.json', content + '\n]', 'utf-8');
    expect(true).toBe(true);
  }, 60_000);

    afterAll(() => browser.close());
});

// describe("ReduxPixelApp.tsx", () => {
//   let browser;
//   let page;
//
//   beforeAll(async () => {
//     browser = await puppeteer.launch();
//     page = await browser.newPage();
//   });
//
//   it("Тест window redux", async () => {
//     await testPage(page, 'http://localhost:3000/reduxpixel', 'Тест window redux')
//     let content = fs.readFileSync('testResults.json', 'utf-8');
//     content = content.slice(0, -2);
//     fs.writeFileSync('testResults.json', content + '\n]', 'utf-8');
//     expect(true).toBe(true);
//   }, 20_000);
//
//   afterAll(() => browser.close());
// });
//
// describe("ContextPixelApp.tsx", () => {
//   let browser;
//   let page;
//
//   beforeAll(async () => {
//     browser = await puppeteer.launch();
//     page = await browser.newPage();
//   });
//
//   it("Тест window context", async () => {
//     await testPage(page, 'http://localhost:3000/contextpixel', 'Тест window context')
//     let content = fs.readFileSync('testResults.json', 'utf-8');
//     content = content.slice(0, -2);
//     fs.writeFileSync('testResults.json', content + '\n]', 'utf-8');
//     expect(true).toBe(true);
//   }, 20_000);
//
//   afterAll(() => browser.close());
// });
//
// describe("MobxPixelApp.tsx", () => {
//   let browser;
//   let page;
//
//   beforeAll(async () => {
//     browser = await puppeteer.launch();
//     page = await browser.newPage();
//   });
//
//   it("Тест window mobx", async () => {
//     await testPage(page, 'http://localhost:3000/mobxpixel', 'Тест window mobx')
//     let content = fs.readFileSync('testResults.json', 'utf-8');
//     content = content.slice(0, -2);
//     fs.writeFileSync('testResults.json', content + '\n]', 'utf-8');
//     expect(true).toBe(true);
//   }, 20_000);
//
//   afterAll(() => browser.close());
// });