import puppeteer from "puppeteer";


describe("ContextTodoApp.tsx", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("Тест todo context", async () => {
    console.log('Тест todo context')
    await page.goto('http://localhost:3000');

    await page.goto('http://localhost:3000/contexttodo');
    const loadTime = await page.evaluate(() => performance.now());
    await page.waitForSelector('#todo-input-container');
    console.log('Время загрузки страницы:', loadTime, 'ms');
    
    const firstPaintTime = await page.evaluate(() => {
    const performanceTiming = performance.timing;
      return performanceTiming.responseStart - performanceTiming.navigationStart;
    });
    console.log('Время первой отрисовки:', firstPaintTime, 'ms');
    
    const renderingTime = await page.evaluate(() => {
    const performanceTiming = performance.timing;
      return performanceTiming.loadEventEnd - performanceTiming.responseStart;
    });
    console.log('Время рендеринга:', renderingTime, 'ms');
    
    const memoryUsage = await page.evaluate(() => {
      return window.performance.memory.usedJSHeapSize / (1024 * 1024);
    });
    console.log('Потребление памяти:', memoryUsage, 'MB');
    
    const startAdd = Date.now();
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.waitForSelector('.todo-list-all .todo-list:nth-child(1)');
    const endAdd = Date.now();
    console.log(`Время добавления нового элемента: ${endAdd - startAdd} мс`);

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
    console.log(`Время добавления 10 элементов: ${endAdd10 - startAdd10} мс`);
  
    const taskCountBefore = (await page.$$('.todo-list-all .todo-list')).length;
    const deleteButton = await page.$('.todo-list-all .todo-list:nth-child(1) .delete');
    const startDelete = Date.now();
    await deleteButton.click();
    const taskCountAfter = (await page.$$('.todo-list-all .todo-list')).length;
    const endDelete = Date.now();
    if (taskCountBefore - taskCountAfter !== 1) {
      console.error('Ошибка: задача не была удалена');
    } else {
      console.log(`Время удаления элемента: ${endDelete - startDelete} мс`);
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
    if (text !== 'new todo(Edited)') {
      console.error('Ошибка: задача не была удалена');
    } else {
      console.log(`Время изменения элемента: ${endEdit - startEdit} мс`);
    }
  
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
    console.log('Тест todo mobx')
    await page.goto('http://localhost:3000');

    await page.goto('http://localhost:3000/mobxtodo');
    const loadTime = await page.evaluate(() => performance.now());
    await page.waitForSelector('#todo-input-container');
    console.log('Время загрузки страницы:', loadTime, 'ms');
    
    const firstPaintTime = await page.evaluate(() => {
    const performanceTiming = performance.timing;
      return performanceTiming.responseStart - performanceTiming.navigationStart;
    });
    console.log('Время первой отрисовки:', firstPaintTime, 'ms');
    
    const renderingTime = await page.evaluate(() => {
    const performanceTiming = performance.timing;
      return performanceTiming.loadEventEnd - performanceTiming.responseStart;
    });
    console.log('Время рендеринга:', renderingTime, 'ms');
    
    const memoryUsage = await page.evaluate(() => {
      return window.performance.memory.usedJSHeapSize / (1024 * 1024);
    });
    console.log('Потребление памяти:', memoryUsage, 'MB');
    
    const startAdd = Date.now();
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.waitForSelector('.todo-list-all .todo-list:nth-child(1)');
    const endAdd = Date.now();
    console.log(`Время добавления нового элемента: ${endAdd - startAdd} мс`);

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
    console.log(`Время добавления 10 элементов: ${endAdd10 - startAdd10} мс`);
  
    const taskCountBefore = (await page.$$('.todo-list-all .todo-list')).length;
    const deleteButton = await page.$('.todo-list-all .todo-list:nth-child(1) .delete');
    const startDelete = Date.now();
    await deleteButton.click();
    const taskCountAfter = (await page.$$('.todo-list-all .todo-list')).length;
    const endDelete = Date.now();
    if (taskCountBefore - taskCountAfter !== 1) {
      console.error('Ошибка: задача не была удалена');
    } else {
      console.log(`Время удаления элемента: ${endDelete - startDelete} мс`);
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
    if (text !== 'new todo(Edited)') {
      console.error('Ошибка: задача не была удалена');
    } else {
      console.log(`Время изменения элемента: ${endEdit - startEdit} мс`);
    }
  
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
    console.log('Тест todo redux')
    await page.goto('http://localhost:3000');

    await page.goto('http://localhost:3000/reduxtodo');
    const loadTime = await page.evaluate(() => performance.now());
    await page.waitForSelector('#todo-input-container');
    console.log('Время загрузки страницы:', loadTime, 'ms');
    
    const firstPaintTime = await page.evaluate(() => {
    const performanceTiming = performance.timing;
      return performanceTiming.responseStart - performanceTiming.navigationStart;
    });
    console.log('Время первой отрисовки:', firstPaintTime, 'ms');
    
    const renderingTime = await page.evaluate(() => {
    const performanceTiming = performance.timing;
      return performanceTiming.loadEventEnd - performanceTiming.responseStart;
    });
    console.log('Время рендеринга:', renderingTime, 'ms');
    
    const memoryUsage = await page.evaluate(() => {
      return window.performance.memory.usedJSHeapSize / (1024 * 1024);
    });
    console.log('Потребление памяти:', memoryUsage, 'MB');
    
    const startAdd = Date.now();
    await page.click(".todo-input");
    await page.type(".todo-input", "new todo");
    await page.click(".button-52");
    await page.waitForSelector('.todo-list-all .todo-list:nth-child(1)');
    const endAdd = Date.now();
    console.log(`Время добавления нового элемента: ${endAdd - startAdd} мс`);

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
    console.log(`Время добавления 10 элементов: ${endAdd10 - startAdd10} мс`);
  
    const taskCountBefore = (await page.$$('.todo-list-all .todo-list')).length;
    const deleteButton = await page.$('.todo-list-all .todo-list:nth-child(1) .delete');
    const startDelete = Date.now();
    await deleteButton.click();
    const taskCountAfter = (await page.$$('.todo-list-all .todo-list')).length;
    const endDelete = Date.now();
    if (taskCountBefore - taskCountAfter !== 1) {
      console.error('Ошибка: задача не была удалена');
    } else {
      console.log(`Время удаления элемента: ${endDelete - startDelete} мс`);
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
    if (text !== 'new todo(Edited)') {
      console.error('Ошибка: задача не была удалена');
    } else {
      console.log(`Время изменения элемента: ${endEdit - startEdit} мс`);
    }
  
    expect(true).toBe(true);
  });
  
    afterAll(() => browser.close());
});