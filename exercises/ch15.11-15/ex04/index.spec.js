import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
  await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
  await page
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

test.describe("simple todo app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.11-15/ex04");
  });

  test("no default todos", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("add new todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("add multiple todos", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("delete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await deleteToDo(page, 0);

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");

    // リロードしてもデータが保持されているか確認
    await page.reload();
    expect(await countToDos(page)).toBe(1);
    const todoReload = queryToDo(page, 0);
    const labelReload = todoReload.getByText("質問表に質問を記載する");
    await expect(labelReload).toBeVisible();
    await expect(labelReload).toHaveCSS("text-decoration-line", "none");
  });

  test("complete todo", async ({ page, context }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await checkToDo(page, 1);

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");

    // リロードしてもデータが保持されているか確認
    await page.reload();
    expect(await countToDos(page)).toBe(2);

    const todo1Reload = queryToDo(page, 0);
    const label1Reload = todo1Reload.getByText("練習問題を完了する");
    await expect(label1Reload).toBeVisible();
    await expect(label1Reload).toHaveCSS("text-decoration-line", "none");

    const todo2Reload = queryToDo(page, 1);
    const label2Reload = todo2Reload.getByText("質問表に質問を記載する");
    await expect(label2Reload).toBeVisible();
    await expect(label2Reload).toHaveCSS(
      "text-decoration-line",
      "line-through"
    );

    // タブを閉じて開き直してもデータが保持されているか確認
    await page.close(); // 現在のタブを閉じる
    const newPage = await context.newPage(); // 新しいタブを開く
    await newPage.goto("/ch15.11-15/ex04");
    expect(await countToDos(newPage)).toBe(2);

    const todo1NewPage = queryToDo(newPage, 0);
    const label1NewPage = todo1NewPage.getByText("練習問題を完了する");
    await expect(label1NewPage).toBeVisible();
    await expect(label1NewPage).toHaveCSS("text-decoration-line", "none");

    const todo2NewPage = queryToDo(newPage, 1);
    const label2NewPage = todo2NewPage.getByText("質問表に質問を記載する");
    await expect(label2NewPage).toBeVisible();
    await expect(label2NewPage).toHaveCSS(
      "text-decoration-line",
      "line-through"
    );

    // タブをもう一つ開き、そちらで操作してもデータが同期されているか確認
    const newTab = await context.newPage();
    await newTab.goto("/ch15.11-15/ex04");

    expect(await countToDos(newTab)).toBe(2);
    const todo1NewTab = queryToDo(newPage, 0);
    const label1NewTab = todo1NewTab.getByText("練習問題を完了する");
    await expect(label1NewTab).toBeVisible();
    await expect(label1NewTab).toHaveCSS("text-decoration-line", "none");

    const todo2NewTab = queryToDo(newPage, 1);
    const label2NewTab = todo2NewTab.getByText("質問表に質問を記載する");
    await expect(label2NewTab).toBeVisible();
    await expect(label2NewTab).toHaveCSS(
      "text-decoration-line",
      "line-through"
    );

    await checkToDo(newTab, 0); // newTab で練習問題を完了するを完了にする
    await context.pages()[0].bringToFront(); // もう一つのタブに戻る
    await expect(label1NewPage).toBeVisible(); // newPage での表示も更新されているか確認
    await expect(label1NewPage).toHaveCSS(
      "text-decoration-line",
      "line-through"
    );
  });
});
