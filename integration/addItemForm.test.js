describe("addItemForm", () => {
  it("base example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:9009/iframe.html?id=components-app--first-app-example&args=&viewMode=story"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});
