import puppeteer from "puppeteer";
import fs from 'fs';

const testPage = async (page, pageUrl, testName) => {
  await page.goto('http://localhost:3000');
  
  await page.goto(pageUrl);
  const loadTime = await page.evaluate(() => performance.now());
  await page.waitForSelector('#todo-input-container');
  const loadTimeResult = `Время загрузки страницы: ${loadTime} ms`;
    
  const firstPaintTime = await page.evaluate(() => {
    const performanceTiming = performance.timing;
    return performanceTiming.responseStart - performanceTiming.navigationStart;
  });
  const performanceTimingResult = `Время первой отрисовки: ${firstPaintTime} ms`;
    
  const renderingTime = await page.evaluate(() => {
  const performanceTiming = performance.timing;
    return performanceTiming.loadEventEnd - performanceTiming.responseStart;
  });
  const renderingTimeResult = `Время рендеринга: ${renderingTime} ms`
  
  const memoryUsage = await page.evaluate(() => {
    return window.performance.memory.usedJSHeapSize / (1024 * 1024);
  });
  const memoryUsageResult = `Потребление памяти: ${memoryUsage} MB`
  
  const startAdd = Date.now();
  await page.click(".todo-input");
  await page.type(".todo-input", "new todo");
  await page.click(".button-52");
  await page.waitForSelector('.todo-list-all .todo-list:nth-child(1)');
  const endAdd = Date.now();
  const addedResult = `Время добавления нового элемента: ${endAdd - startAdd} мс`

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

  const testResults = {
    url: pageUrl,
    name: testName,
    loadTimeResult,
    performanceTimingResult,
    renderingTimeResult,
    memoryUsageResult,
    addedResult,
    added10Result,
    deleteResult,
    editResult
  };
  fs.appendFileSync('testResults.json', JSON.stringify(testResults) + ',\n');
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
  });
  
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
  });
  
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
  });
  
    afterAll(() => browser.close());
});